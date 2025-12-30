import { Router } from "express";
import { z } from "zod";
import {
  EquipmentCondition,
  EquipmentStatus,
  OccurrenceType,
  PrismaClient,
  Role,
} from "@prisma/client";
import { requireAuth, AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

const equipmentSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(200),
  category: z.string().trim().min(1, "Categoria é obrigatória").max(120),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  status: z.nativeEnum(EquipmentStatus).optional(),
  totalQuantity: z.number().int().nonnegative(),
});

const assignSchema = z.object({
  equipmentId: z.string().cuid(),
  quantity: z.number().int().positive(),
  condition: z.nativeEnum(EquipmentCondition),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
});

const occurrenceSchema = z.object({
  type: z.nativeEnum(OccurrenceType),
  description: z.string().trim().min(1, "Descrição é obrigatória").max(2000),
});

async function resolveCurrentUserAndCollaborator(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { user: null, collaborator: null };

  const collaborator = await prisma.collaborator.findUnique({ where: { email: user.email } });
  return { user, collaborator };
}

// POST /equipment
router.post("/equipment", requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]), async (req: AuthRequest, res) => {
  try {
    const parsed = equipmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: parsed.data.name,
        category: parsed.data.category,
        description: parsed.data.description || null,
        status: parsed.data.status ?? EquipmentStatus.ATIVO,
        totalQuantity: parsed.data.totalQuantity,
      },
    });

    return res.status(201).json(equipment);
  } catch (error) {
    console.error("Create equipment error", error);
    return res.status(500).json({ message: "Erro interno ao criar equipamento" });
  }
});

// GET /equipment
router.get("/equipment", requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]), async (_req: AuthRequest, res) => {
  try {
    const equipment = await prisma.equipment.findMany({ orderBy: { name: "asc" } });
    return res.json(equipment);
  } catch (error) {
    console.error("List equipment error", error);
    return res.status(500).json({ message: "Erro interno ao listar equipamentos" });
  }
});

// POST /employees/:id/equipment
router.post(
  "/employees/:id/equipment",
  requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]),
  async (req: AuthRequest, res) => {
    try {
      const { id: employeeId } = req.params;

      const collaborator = await prisma.collaborator.findUnique({ where: { id: employeeId } });
      if (!collaborator) {
        return res.status(404).json({ message: "Colaborador não encontrado" });
      }

      const parsed = assignSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
      }

      const { equipmentId, quantity, condition, comment } = parsed.data;

      const equipment = await prisma.equipment.findUnique({ where: { id: equipmentId } });
      if (!equipment) {
        return res.status(404).json({ message: "Equipamento não encontrado" });
      }

      // Regra: comentário obrigatório se quantidade > 1 ou condição AVARIADO
      if ((quantity > 1 || condition === EquipmentCondition.AVARIADO) && !comment?.trim()) {
        return res
          .status(400)
          .json({ message: "Comentário é obrigatório quando há mais de uma unidade ou equipamento avariado" });
      }

      // Verifica disponibilidade em estoque (considerando apenas posse sem retorno)
      const totalInUseAgg = await prisma.equipmentPossession.aggregate({
        where: { equipmentId, returnedAt: null },
        _sum: { quantity: true },
      });

      const inUse = totalInUseAgg._sum.quantity ?? 0;
      if (inUse + quantity > equipment.totalQuantity) {
        return res.status(400).json({ message: "Quantidade indisponível em estoque para este equipamento" });
      }

      const possession = await prisma.equipmentPossession.create({
        data: {
          employeeId,
          equipmentId,
          quantity,
          condition,
          comment: comment?.trim() || null,
        },
      });

      return res.status(201).json(possession);
    } catch (error) {
      console.error("Assign equipment error", error);
      return res.status(500).json({ message: "Erro interno ao atribuir equipamento" });
    }
  },
);

// GET /employees/:id/equipment
router.get("/employees/:id/equipment", requireAuth(), async (req: AuthRequest, res) => {
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

    if (!isAdminOrOps) {
      if (!currentCollab || currentCollab.id !== employeeId) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }
    }

    const possessions = await prisma.equipmentPossession.findMany({
      where: { employeeId, returnedAt: null },
      orderBy: { assignedAt: "desc" },
      include: {
        equipment: true,
        occurrences: true,
      },
    });

    return res.json(possessions);
  } catch (error) {
    console.error("List possessions error", error);
    return res.status(500).json({ message: "Erro interno ao listar equipamentos em posse" });
  }
});

// POST /equipment-possession/:id/return
router.post(
  "/equipment-possession/:id/return",
  requireAuth([Role.ADMIN, Role.OPERATIONS_MANAGER]),
  async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;

      const possession = await prisma.equipmentPossession.findUnique({ where: { id } });
      if (!possession) {
        return res.status(404).json({ message: "Registro de posse não encontrado" });
      }

      if (possession.returnedAt) {
        return res.status(400).json({ message: "Este equipamento já foi devolvido" });
      }

      const updated = await prisma.equipmentPossession.update({
        where: { id },
        data: { returnedAt: new Date() },
      });

      return res.json(updated);
    } catch (error) {
      console.error("Return equipment error", error);
      return res.status(500).json({ message: "Erro interno ao registrar devolução" });
    }
  },
);

// POST /equipment-possession/:id/occurrence
router.post("/equipment-possession/:id/occurrence", requireAuth(), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const possession = await prisma.equipmentPossession.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!possession) {
      return res.status(404).json({ message: "Registro de posse não encontrado" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { user, collaborator } = await resolveCurrentUserAndCollaborator(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const isAdminOrOps = user.role === Role.ADMIN || user.role === Role.OPERATIONS_MANAGER;
    const isOwnerCollaborator = collaborator && collaborator.id === possession.employeeId;

    const parsed = occurrenceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados inválidos", errors: parsed.error.flatten() });
    }

    // USER só pode reportar AVARIA e apenas para a própria posse
    if (!isAdminOrOps) {
      if (!isOwnerCollaborator || parsed.data.type !== OccurrenceType.AVARIA) {
        return res.status(403).json({ message: "Acesso não autorizado" });
      }
    }

    const occurrence = await prisma.equipmentOccurrence.create({
      data: {
        possessionId: possession.id,
        type: parsed.data.type,
        description: parsed.data.description,
      },
    });

    // Se for avaria, atualiza condição da posse para AVARIADO
    if (parsed.data.type === OccurrenceType.AVARIA) {
      await prisma.equipmentPossession.update({
        where: { id: possession.id },
        data: { condition: EquipmentCondition.AVARIADO },
      });
    }

    return res.status(201).json(occurrence);
  } catch (error) {
    console.error("Register occurrence error", error);
    return res.status(500).json({ message: "Erro interno ao registrar ocorrência" });
  }
});

export default router;
