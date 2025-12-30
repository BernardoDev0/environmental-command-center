const EquipmentHistory = () => {
  return (
    <main className="space-y-8" aria-labelledby="equipment-history-title">
      <header className="space-y-2">
        <h1 id="equipment-history-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Histórico do equipamento
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Trilha completa de auditoria do equipamento: cadastro, atribuições, devoluções, danos, perdas e
          responsáveis ao longo do tempo.
        </p>
      </header>

      <section className="space-y-3" aria-label="Linha do tempo de eventos">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Linha do tempo</h2>
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-muted-foreground shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">
            Quando o histórico estiver conectado ao backend, cada evento (cadastro, atribuição, devolução, dano,
            perda) aparecerá aqui em ordem cronológica, sem possibilidade de edição.
          </p>
        </div>
      </section>
    </main>
  );
};

export default EquipmentHistory;
