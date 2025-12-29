const Finance = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Finance &amp; Contracts</h1>
          <p className="text-sm text-muted-foreground">Manage suppliers, contracts, expenses, and invoices with multi-currency support.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Suppliers</h2>
            No suppliers have been added yet.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Contracts</h2>
            No contracts have been created yet.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Expenses</h2>
            No expenses have been recorded yet.
          </div>
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-sm text-muted-foreground">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Invoices</h2>
            No invoices have been uploaded yet.
          </div>
        </div>
      </section>
    </main>
  );
};

export default Finance;
