const ProjectGoals = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Objetivos do Projeto</h2>
        <p className="text-sm text-muted-foreground">
          Defina os resultados estratégicos esperados, metas e indicadores de sucesso para este projeto.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Nenhum objetivo foi cadastrado ainda. Use este espaço, futuramente, para registrar metas, KPIs e entregas
          críticas associadas ao projeto.
        </p>
      </div>
    </section>
  );
};

export default ProjectGoals;
