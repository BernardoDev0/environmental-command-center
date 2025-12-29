const CollaboratorGoals = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Objetivos e Tarefas</h2>
        <p className="text-sm text-muted-foreground">
          Defina, acompanhe e revise objetivos individuais, metas e tarefas atribuídas ao colaborador.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Nenhum objetivo ou tarefa foi cadastrado ainda. Esta área será utilizada para registrar OKRs pessoais,
          entregas recorrentes e planos de desenvolvimento individuais.
        </p>
      </div>
    </section>
  );
};

export default CollaboratorGoals;
