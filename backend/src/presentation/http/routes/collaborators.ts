import { Router } from "express";
import { z } from "zod";
import { CollaboratorStatus, PrismaClient, Role } from "@prisma/client";
import { requireAuth, AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

const collaboratorSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(200),
  email: z.string().trim().email("E-mail inválido").max(255),
  role: z.string().trim().min(1, "Função é obrigatória").max(120),
  status: z.nativeEnum(CollaboratorStatus).optional(),
});

// Create collaborator (ADMIN only)
router.post("/", requireAuth([Role.ADMIN]), async (req: AuthRequest, res) => {
  try {
    const parsed = collaboratorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const { name, email, role, status } = parsed.data;

    const existing = await prisma.collaborator.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Já existe um colaborador com este e-mail" });
    }

    const collaborator = await prisma.collaborator.create({
      data: {
        name,
        email,
        role,
        status: status ?? CollaboratorStatus.ACTIVE,
      },
    });

    return res.status(201).json(collaborator);
  } catch (error) {
    console.error("Create collaborator error", error);
    return res.status(500).json({ message: "Erro interno ao criar colaborador" });
  }
});

// Update collaborator (ADMIN or OPERATIONS_MANAGER)
router.put("/:id", requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const parsed = collaboratorSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const existing = await prisma.collaborator.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Colaborador não encontrado" });
    }

    if (parsed.data.email && parsed.data.email !== existing.email) {
      const emailTaken = await prisma.collaborator.findUnique({ where: { email: parsed.data.email } });
      if (emailTaken) {
        return res.status(400).json({ message: "Já existe um colaborador com este e-mail" });
      }
    }

    const collaborator = await prisma.collaborator.update({
      where: { id },
      data: parsed.data,
    });

    return res.json(collaborator);
  } catch (error) {
    console.error("Update collaborator error", error);
    return res.status(500).json({ message: "Erro interno ao atualizar colaborador" });
  }
});

// List collaborators (ADMIN / OPERATIONS_MANAGER)
router.get("/", requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]), async (_req: AuthRequest, res) => {
  try {
    const collaborators = await prisma.collaborator.findMany({ orderBy: { createdAt: "desc" } });
    return res.json(collaborators);
  } catch (error) {
    console.error("List collaborators error", error);
    return res.status(500).json({ message: "Erro interno ao listar colaboradores" });
  }
});

// View collaborator profile (self or privileged roles)
router.get("/:id", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const collaborator = await prisma.collaborator.findUnique({ where: { id } });
    if (!collaborator) {
      return res.status(404).json({ message: "Colaborador não encontrado" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ADMIN / OPERATIONS_MANAGER can ver qualquer colaborador
    if (req.user.role === Role.ADMIN || req.user.role === Role.OPERATIONS_MANAGER) {
      return res.json(collaborator);
    }

    // USER só pode ver perfil associado ao seu próprio e-mail
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.email !== collaborator.email) {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }

    return res.json(collaborator);
  } catch (error) {
    console.error("Get collaborator error", error);
    return res.status(500).json({ message: "Erro interno ao consultar colaborador" });
  }
});

export default router;
