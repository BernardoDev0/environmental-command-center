const CollaboratorHistory = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Histórico</h2>
        <p className="text-sm text-muted-foreground">
          Consulte o histórico de movimentações, mudanças de função e eventos relevantes do colaborador.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Em versões futuras, esta área exibirá admissões, promoções, transferências, afastamentos e demais registros de
          jornada do colaborador.
        </p>
      </div>
    </section>
  );
};

export default CollaboratorHistory;
