const CollaboratorOverview = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Visão geral</h2>
        <p className="text-sm text-muted-foreground">
          Resumo executivo do colaborador, incluindo dados principais, função atual e status na organização.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          No futuro, esta área exibirá informações consolidadas do colaborador, como dados pessoais, cargo, área,
          gestor responsável e situação contratual.
        </p>
      </div>
    </section>
  );
};

export default CollaboratorOverview;
