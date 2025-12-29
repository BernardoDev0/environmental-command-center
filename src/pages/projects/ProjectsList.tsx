const ProjectsList = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
          <p className="text-sm text-muted-foreground">
            Visualize e gerencie todos os projetos em andamento e planejados.
          </p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          Nenhum projeto foi criado ainda. Quando houver projetos, você poderá acessar a visão detalhada de cada um.
        </div>
      </section>
    </main>
  );
};

export default ProjectsList;
