const AuditsAndNonConformities = () => {
  return (
    <main className="space-y-8" aria-labelledby="audits-nc-title">
      <header className="space-y-2">
        <h1 id="audits-nc-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Auditorias &amp; não conformidades
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Registre auditorias internas e externas, bem como não conformidades associadas, garantindo rastreabilidade
          e responsabilização.
        </p>
      </header>

      <section className="space-y-4" aria-label="Auditorias">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Auditorias</h2>
            <p className="text-xs text-muted-foreground">
              Planejamento e histórico de auditorias em projetos e unidades operacionais.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
          >
            Criar auditoria
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-8 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Nenhuma auditoria registrada</p>
          <p className="text-sm text-muted-foreground">
            Registre auditorias internas e externas indicando projeto, data, tipo e status para manter o histórico
            de verificação independente.
          </p>
        </div>
      </section>

      <section className="space-y-4" aria-label="Não conformidades">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Não conformidades</h2>
            <p className="text-xs text-muted-foreground">
              Acompanhe o ciclo completo: identificação, análise, responsável e prazo de correção.
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
          >
            Registrar não conformidade
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-6 text-sm text-muted-foreground">
          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/40 px-4 py-3">
            <div className="space-y-1 text-left">
              <p className="text-xs font-medium text-foreground">Nenhuma não conformidade aberta</p>
              <p className="text-[11px] text-muted-foreground">
                Assim que forem registradas não conformidades, elas aparecerão aqui com gravidade, responsável e prazo
                de correção.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuditsAndNonConformities;
