import { Outlet, useParams } from "react-router-dom";

const CollaboratorLayout = () => {
  const { id } = useParams();

  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Perfil do Colaborador</h1>
          <p className="text-sm text-muted-foreground">
            Visualize detalhes, equipamentos em posse, objetivos e histórico do colaborador selecionado.
          </p>
          <p className="text-xs text-muted-foreground/80">ID do colaborador: {id}</p>
        </header>
        <Outlet />
      </section>
    </main>
  );
};

export default CollaboratorLayout;
