const ComplianceReports = () => {
  return (
    <main className="space-y-8" aria-labelledby="compliance-reports-title">
      <header className="space-y-2">
        <h1 id="compliance-reports-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Relatórios de Compliance &amp; ESG
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Gere relatórios executivos e regulatórios a partir das informações de conformidade legal, licenças,
          indicadores ESG e auditorias.
        </p>
      </header>

      <section className="space-y-4" aria-label="Relatórios disponíveis">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-foreground">Relatório ESG</h2>
              <p className="text-xs text-muted-foreground">
                Visão consolidada de indicadores ambientais, sociais e de governança para comitês e conselhos.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
            >
              Gerar relatório
            </button>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-foreground">Relatório de conformidade ambiental</h2>
              <p className="text-xs text-muted-foreground">
                Foco em obrigações legais, licenças e não conformidades relevantes para órgãos reguladores.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
            >
              Gerar relatório
            </button>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-foreground">Relatório por projeto</h2>
              <p className="text-xs text-muted-foreground">
                Detalhamento de indicadores, licenças, auditorias e não conformidades por projeto específico.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
            >
              Gerar relatório
            </button>
          </article>
        </div>
      </section>

      <section className="space-y-2" aria-label="Observação sobre geração de arquivos">
        <p className="max-w-3xl text-xs text-muted-foreground">
          Os relatórios acima representam a estrutura executiva do módulo. Nesta etapa, a geração de arquivos
          (PDF/Excel) ainda não está habilitada: o foco é garantir a organização das informações e a clareza para
          auditorias e apresentações.
        </p>
      </section>
    </main>
  );
};

export default ComplianceReports;
