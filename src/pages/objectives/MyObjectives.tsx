import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const MyObjectives = () => {
  const { user } = useAuth();

  return (
    <main className="space-y-8" aria-labelledby="my-objectives-title">
      <header className="space-y-2">
        <h1 id="my-objectives-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Meus objetivos
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Visualize os objetivos atribuídos a você, acompanhe o andamento das tarefas e registre justificativas de
          atraso quando necessário.
        </p>
      </header>

      {/* Meu resumo */}
      <section className="space-y-3" aria-label="Resumo dos meus objetivos">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Meu dia</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Objetivos ativos</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Tarefas pendentes</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-amber-500/70 bg-amber-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-amber-200">Tarefas em atraso</p>
            <p className="mt-1 text-2xl font-semibold text-amber-50">0</p>
          </div>
        </div>
      </section>

      {/* Lista de objetivos do colaborador */}
      <section className="space-y-3" aria-label="Meus objetivos detalhados">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Objetivos atribuídos</h2>
          <span className="text-xs text-muted-foreground">
            {user?.name ? `Responsável: ${user.name}` : "Apenas objetivos atribuídos ao seu usuário serão exibidos."}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-8 text-center text-sm text-muted-foreground">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Nenhum objetivo atribuído a você neste momento</p>
            <p className="text-sm text-muted-foreground">
              Assim que a gestão atribuir objetivos, eles aparecerão aqui com lista de tarefas, prazos e espaço para
              comentários e justificativas.
            </p>
          </div>
        </div>
      </section>

      {/* Orientações de responsabilidade */}
      <section className="space-y-3" aria-label="Responsabilidade pelos objetivos">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Responsabilidade</h2>
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Atualize o status das suas tarefas sempre que avançar ou concluir uma entrega.</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <AlertTriangle className="h-4 w-4 text-amber-300" />
            <span>
              Em caso de atraso previsto, registre uma justificativa clara para que a gestão possa replanejar.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyObjectives;
