/*
 * Script simples para criar o primeiro usuário ADMIN.
 *
 * Como usar:
 * 1) Garanta que o PostgreSQL esteja rodando e que a variável DATABASE_URL aponte para o banco local.
 * 2) Rode as migrações/prisma db push:
 *    npx prisma db push --schema=backend/prisma/schema.prisma
 * 3) Edite os valores de email, name e password abaixo conforme desejado.
 * 4) Execute:
 *    node backend/scripts/create-admin.js
 */

const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@empresa.com.br"; // altere conforme necessário
  const name = "Administrador"; // altere conforme necessário
  const password = "senha-segura"; // altere ANTES de rodar em qualquer ambiente real

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Já existe um usuário com este e-mail. Nada foi feito.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  console.log("Usuário ADMIN criado com sucesso:");
  console.log({ id: user.id, email: user.email, role: user.role });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
