const Inventory = () => {
  return (
    <main className="space-y-8" aria-labelledby="inventory-title">
      <header className="space-y-2">
        <h1 id="inventory-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Inventário &amp; equipamentos
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Controle centralizado de equipamentos: saldo em estoque, itens em uso e situação geral por categoria.
        </p>
      </header>

      {/* Resumo de estoque */}
      <section className="space-y-3" aria-label="Resumo de estoque">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Visão geral</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Equipamentos cadastrados</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Em estoque</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Em uso</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-destructive">Danificados / descartados</p>
            <p className="mt-1 text-2xl font-semibold text-destructive">0</p>
          </div>
        </div>
      </section>

      {/* Ações e lista de equipamentos */}
      <section className="space-y-3" aria-label="Lista de equipamentos">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Inventário de equipamentos
            </h2>
            <p className="text-xs text-muted-foreground">
              Nome, categoria, total, disponível, em uso e alertas de estoque baixo.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-foreground hover:bg-background/90">
              Cadastrar equipamento
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-lg shadow-black/30">
          <div className="grid grid-cols-5 gap-2 border-b border-border/70 bg-background/40 px-4 py-2 text-[11px] font-medium text-muted-foreground">
            <span>Nome</span>
            <span>Categoria</span>
            <span className="text-center">Total</span>
            <span className="text-center">Disponível</span>
            <span className="text-center">Em uso</span>
          </div>
          <div className="p-6 text-center text-sm text-muted-foreground">
            Nenhum equipamento cadastrado. Assim que forem adicionados, você verá aqui o saldo total, disponibilidade e
            itens em uso.
          </div>
        </div>
      </section>

      {/* Alertas de estoque baixo */}
      <section className="space-y-3" aria-label="Alertas de estoque baixo">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Alertas de estoque</h2>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-muted-foreground shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">
            Equipamentos com estoque crítico aparecerão aqui, priorizando EPIs e equipamentos de segurança.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Inventory;
