const ProjectOverview = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Visão Geral do Projeto</h2>
        <p className="text-sm text-muted-foreground">
          Panorama consolidado do projeto, incluindo status, cronograma macro e responsáveis principais.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Em breve, esta área trará linhas do tempo, próximos marcos, riscos principais e responsáveis por cada etapa
          crítica do projeto.
        </p>
      </div>
    </section>
  );
};

export default ProjectOverview;
