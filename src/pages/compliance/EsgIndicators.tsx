const EsgIndicators = () => {
  return (
    <main className="space-y-8" aria-labelledby="esg-indicators-title">
      <header className="space-y-2">
        <h1 id="esg-indicators-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Indicadores ESG
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Consolide métricas ambientais, sociais e de governança para apoiar decisões estratégicas e relatórios
          corporativos.
        </p>
      </header>

      <section className="space-y-4" aria-label="Indicadores ambientais">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ambiental</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Resíduos gerados (t/ano)</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Tendência: neutra</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/70 bg-emerald-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-emerald-200">Resíduos reciclados (%)</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-50">0%</p>
            <p className="mt-2 text-[11px] text-emerald-100">Tendência: neutra</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Emissões (placeholder)</p>
            <p className="mt-1 text-2xl font-semibold">—</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Indicador reservado para inventário de emissões.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-label="Indicadores sociais">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Social</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Colaboradores ativos</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Baseado no cadastro de colaboradores do sistema.</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Treinamentos realizados</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Inclui treinamentos de segurança, meio ambiente e ética.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-label="Indicadores de governança">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Governança</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Auditorias realizadas</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Contabiliza auditorias internas e externas concluídas.</p>
          </div>
          <div className="rounded-2xl border border-amber-500/70 bg-amber-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-amber-200">Não conformidades abertas</p>
            <p className="mt-1 text-2xl font-semibold text-amber-50">0</p>
            <p className="mt-2 text-[11px] text-amber-100">Tendência: neutra (placeholders estáticos por enquanto).</p>
          </div>
        </div>
      </section>

      <section className="space-y-2" aria-label="Orientações de uso">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Orientações</h2>
        <p className="max-w-3xl text-xs text-muted-foreground">
          Os indicadores acima são estruturais e servem como base para relatórios ESG. A configuração detalhada de
          fontes de dados, metas e séries históricas será integrada posteriormente, mantendo rastreabilidade e
          consistência com auditorias externas.
        </p>
      </section>
    </main>
  );
};

export default EsgIndicators;
