const Finance = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Finanças &amp; Contratos</h1>
          <p className="text-sm text-muted-foreground">Gerencie fornecedores, contratos, despesas e faturas com suporte a múltiplas moedas.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Fornecedores</h2>
            Nenhum fornecedor foi adicionado ainda.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Contratos</h2>
            Nenhum contrato foi criado ainda.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Despesas</h2>
            Nenhuma despesa foi registrada ainda.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Faturas</h2>
            Nenhuma fatura foi enviada ainda.
          </div>
        </div>
      </section>
    </main>
  );
};

export default Finance;
