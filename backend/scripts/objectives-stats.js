import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const totalObjectives = await prisma.objective.count();
  const totalTasks = await prisma.task.count();
  const pendingTasks = await prisma.task.count({ where: { status: "PENDENTE" } });
  const lateTasks = await prisma.task.count({ where: { status: "PENDENTE", dueDate: { lt: new Date() } } });

  console.log("Objetivos cadastrados:", totalObjectives);
  console.log("Tarefas cadastradas:", totalTasks);
  console.log("Tarefas pendentes:", pendingTasks);
  console.log("Tarefas em atraso (dueDate < hoje e status PENDENTE):", lateTasks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
