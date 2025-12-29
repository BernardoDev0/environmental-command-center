const Goals = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Metas e Objetivos</h1>
          <p className="text-sm text-muted-foreground">Defina objetivos estratégicos e atribua-os às equipes com prazos e anexos.</p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          Nenhuma meta foi definida ainda. Quando forem criadas, elas aparecerão aqui com status e responsáveis.
        </div>
      </section>
    </main>
  );
};

export default Goals;
