const ProjectRequirements = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Requisitos</h2>
        <p className="text-sm text-muted-foreground">
          Liste requisitos técnicos, regulatórios, operacionais e de conformidade necessários para este projeto.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Em versões futuras, esta área poderá concentrar requisitos funcionais, dependências de sistemas, aprovações
          internas e premissas obrigatórias para execução do projeto.
        </p>
      </div>
    </section>
  );
};

export default ProjectRequirements;
