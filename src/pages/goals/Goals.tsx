const Goals = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Goals &amp; Objectives</h1>
          <p className="text-sm text-muted-foreground">Define strategic objectives and assign them across teams with due dates and files.</p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          No goals have been defined yet. Once objectives are created, they will appear here with status and ownership.
        </div>
      </section>
    </main>
  );
};

export default Goals;
