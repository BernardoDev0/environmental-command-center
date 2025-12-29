import { Target } from "lucide-react";

const ProjectGoals = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Objetivos do Projeto</h2>
        <p className="text-sm text-muted-foreground">
          Defina os resultados estratégicos esperados, metas e indicadores de sucesso para este projeto.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <Target className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum objetivo de projeto registrado.</p>
            <p className="text-sm text-muted-foreground">
              Use este espaço para cadastrar metas, KPIs e entregas críticas associadas ao projeto, permitindo um
              acompanhamento claro dos resultados esperados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGoals;
