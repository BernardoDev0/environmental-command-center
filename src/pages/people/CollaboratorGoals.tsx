import { Target } from "lucide-react";

const CollaboratorGoals = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Objetivos e Tarefas</h2>
        <p className="text-sm text-muted-foreground">
          Defina, acompanhe e revise objetivos individuais, metas e tarefas atribuídas ao colaborador.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <Target className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum objetivo ou tarefa cadastrados.</p>
            <p className="text-sm text-muted-foreground">
              Esta área será utilizada para registrar OKRs pessoais, metas quantitativas e planos de desenvolvimento,
              mantendo a evolução do colaborador alinhada às prioridades estratégicas da empresa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorGoals;
