import { Router } from "express";
import { z } from "zod";
import { ObjectiveStatus, PrismaClient, Role, TaskStatus } from "@prisma/client";
import { requireAuth, AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

const createObjectiveSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(200),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  priority: z.enum(["BAIXA", "MEDIA", "ALTA"]).optional(),
  startDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional(),
  employeeId: z.string().cuid().optional(),
});

const updateObjectiveSchema = createObjectiveSchema.partial().extend({
  status: z.nativeEnum(ObjectiveStatus).optional(),
});

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(200),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  dueDate: z.string().datetime().optional(),
});

const updateTaskSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

// Helper to resolve current user and related collaborator (by email)
async function resolveCurrentUserAndCollaborator(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { user: null, collaborator: null };

  const collaborator = await prisma.collaborator.findUnique({ where: { email: user.email } });
  return { user, collaborator };
}

// POST /api/employees/:id/objectives
router.post("/employees/:id/objectives", requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]), async (req: AuthRequest, res) => {
  try {
    const { id: employeeId } = req.params;

    const collaborator = await prisma.collaborator.findUnique({ where: { id: employeeId } });
    if (!collaborator) {
      return res.status(404).json({ message: "Colaborador não encontrado" });
    }

    const parsed = createObjectiveSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const objective = await prisma.objective.create({
      data: {
        employeeId,
        title: parsed.data.title,
        description: parsed.data.description || null,
        status: ObjectiveStatus.PLANEJADO,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        createdByUserId: user.id,
      },
    });

    return res.status(201).json(objective);
  } catch (error) {
    console.error("Create objective error", error);
    return res.status(500).json({ message: "Erro interno ao criar objetivo" });
  }
});

// GET /api/employees/:id/objectives
router.get("/employees/:id/objectives", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id: employeeId } = req.params;

    const collaborator = await prisma.collaborator.findUnique({ where: { id: employeeId } });
    if (!collaborator) {
      return res.status(404).json({ message: "Colaborador não encontrado" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user, collaborator: currentCollab } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const isAdminOrOps = user.role === Role.ADMIN || user.role === Role.OPERATIONS_MANAGER;

    // USER só pode ver objetivos do próprio colaborador relacionado ao seu e-mail
    if (!isAdminOrOps) {
      if (!currentCollab || currentCollab.id !== employeeId) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }
    }

    const objectives = await prisma.objective.findMany({
      where: { employeeId },
      orderBy: { createdAt: "desc" },
      include: {
        tasks: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return res.json(objectives);
  } catch (error) {
    console.error("List objectives error", error);
    return res.status(500).json({ message: "Erro interno ao listar objetivos" });
  }
});

// PATCH /api/objectives/:id
router.patch("/objectives/:id", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const objective = await prisma.objective.findUnique({ where: { id }, include: { employee: true } });
    if (!objective) {
      return res.status(404).json({ message: "Objetivo não encontrado" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user, collaborator } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const isAdminOrOps = user.role === Role.ADMIN || user.role === Role.OPERATIONS_MANAGER;

    // Apenas ADMIN / OPERATIONS_MANAGER podem editar objetivos
    if (!isAdminOrOps) {
      // Usuário colaborador não pode editar o objetivo em si
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    const parsed = updateObjectiveSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const updated = await prisma.objective.update({
      where: { id },
      data: {
        ...("title" in parsed.data ? { title: parsed.data.title } : {}),
        ...("description" in parsed.data ? { description: parsed.data.description || null } : {}),
        ...("priority" in parsed.data && parsed.data.priority
          ? { priority: parsed.data.priority }
          : {}),
        ...("status" in parsed.data ? { status: parsed.data.status } : {}),
        ...("startDate" in parsed.data
          ? { startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null }
          : {}),
        ...("dueDate" in parsed.data ? { dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null } : {}),
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error("Update objective error", error);
    return res.status(500).json({ message: "Erro interno ao atualizar objetivo" });
  }
});

// POST /api/objectives/:id/tasks
router.post("/objectives/:id/tasks", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id: objectiveId } = req.params;

    const objective = await prisma.objective.findUnique({ where: { id: objectiveId }, include: { employee: true } });
    if (!objective) {
      return res.status(404).json({ message: "Objetivo não encontrado" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const isAdminOrOps = user.role === Role.ADMIN || user.role === Role.OPERATIONS_MANAGER;

    if (!isAdminOrOps) {
      // Usuário colaborador não pode criar tarefas
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const task = await prisma.task.create({
      data: {
        objectiveId,
        title: parsed.data.title,
        description: parsed.data.description || null,
        status: TaskStatus.PENDENTE,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Create task error", error);
    return res.status(500).json({ message: "Erro interno ao criar tarefa" });
  }
});

// PATCH /api/tasks/:id
router.patch("/tasks/:id", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        objective: {
          include: {
            employee: true,
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user, collaborator } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const previousStatus = task.status;

    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const isAdminOrOps = user.role === Role.ADMIN || user.role === Role.OPERATIONS_MANAGER;
    const isOwnerCollaborator = collaborator && collaborator.id === task.objective.employeeId;

    // Usuário colaborador só pode alterar o status da própria tarefa
    if (!isAdminOrOps) {
      if (!isOwnerCollaborator) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        status: parsed.data.status,
      },
    });

    if (previousStatus !== updated.status) {
      await prisma.taskStatusChange.create({
        data: {
          taskId: updated.id,
          previousStatus: previousStatus,
          newStatus: updated.status,
          changedByUserId: user.id,
        },
      });
    }

    return res.json(updated);
  } catch (error) {
    console.error("Update task error", error);
    return res.status(500).json({ message: "Erro interno ao atualizar tarefa" });
  }
});

export default router;
