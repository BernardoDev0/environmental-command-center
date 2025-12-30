const EquipmentDetail = () => {
  return (
    <main className="space-y-8" aria-labelledby="equipment-detail-title">
      <header className="space-y-2">
        <h1 id="equipment-detail-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Detalhe do equipamento
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Visualize informações completas do equipamento, suas quantidades em estoque e os colaboradores atualmente
          responsáveis.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Resumo do equipamento">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">Código interno</p>
          <p className="mt-1 text-base font-semibold">—</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">Categoria</p>
          <p className="mt-1 text-base font-semibold">—</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">Estado geral</p>
          <p className="mt-1 text-base font-semibold">—</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2" aria-label="Posse e estoque">
        <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Estoque</h2>
          <p className="text-xs text-muted-foreground">
            Controle de quantidade total, disponível, em uso e danificada será apresentado aqui quando o estoque
            estiver integrado.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Responsáveis atuais</h2>
          <p className="text-xs text-muted-foreground">
            Colaboradores que possuem unidades deste equipamento atribuídas aparecerão aqui, com quantidade e data de
            recebimento.
          </p>
        </div>
      </section>
    </main>
  );
};

export default EquipmentDetail;
