const Inventory = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Inventário &amp; Equipamentos</h1>
          <p className="text-sm text-muted-foreground">Acompanhe equipamentos, níveis de estoque e alocações na organização.</p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          Nenhum equipamento foi adicionado ainda. Assim que forem criados, você verá estoque, alocações e condição aqui.
        </div>
      </section>
    </main>
  );
};

export default Inventory;
