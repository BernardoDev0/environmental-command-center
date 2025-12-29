const Inventory = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory &amp; Equipment</h1>
          <p className="text-sm text-muted-foreground">Track equipment, stock levels, and assignments across the organization.</p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          No equipment has been added yet. Once equipment is created, you&apos;ll see stock, assignments, and condition here.
        </div>
      </section>
    </main>
  );
};

export default Inventory;
