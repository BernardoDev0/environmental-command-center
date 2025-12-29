# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Backend e banco de dados (local)

Este projeto utiliza um backend Node.js/Express com Prisma e PostgreSQL rodando via Docker, apenas em ambiente local.

### Subir o PostgreSQL local

Use o arquivo `docker-compose.yml` na raiz do projeto:

```sh
# Sobe o PostgreSQL em background
docker compose up -d
```

Certifique-se de que a variável `DATABASE_URL` esteja configurada para apontar para essa instância.

### Rodar migrações / sincronizar schema Prisma

```sh
# Gera o cliente Prisma e aplica o schema no banco local
npx prisma db push --schema=backend/prisma/schema.prisma
```

### Rodar o backend

```sh
cd backend
npm install
npm run dev
```

O backend estará disponível em `http://localhost:4000`.

### Criar o primeiro usuário ADMIN

Para criar o primeiro usuário ADMIN sem seeds de exemplo, use o script dedicado:

1. Edite o arquivo `backend/scripts/create-admin.js` e ajuste `email`, `name` e `password` conforme desejado.
2. Execute o script:

```sh
node backend/scripts/create-admin.js
```

Isso criará um usuário com papel `ADMIN` na tabela `User`.

