import { Outlet, useParams } from "react-router-dom";

const ProjectLayout = () => {
  const { id } = useParams();

  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Projeto</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe visão geral, objetivos, requisitos e documentos do projeto selecionado.
          </p>
          <p className="text-xs text-muted-foreground/80">ID do projeto: {id}</p>
        </header>
        <Outlet />
      </section>
    </main>
  );
};

export default ProjectLayout;
