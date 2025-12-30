import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";
import { AlertTriangle, Clock, UserCircle2 } from "lucide-react";

const AdminObjectivesList = () => {
  const { user } = useAuth();

  const isAdminOrOps = user?.role === "ADMIN" || user?.role === "OPERATIONS_MANAGER";

  const summary = useMemo(
    () => ({
      planned: 0,
      inProgress: 0,
      done: 0,
      late: 0,
    }),
    [],
  );

  return (
    <main className="space-y-8" aria-labelledby="admin-objectives-title">
      <header className="space-y-2">
        <h1 id="admin-objectives-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Objetivos &amp; tarefas — visão global
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Estruture objetivos por colaborador, acompanhe prazos e centralize a responsabilização pelas entregas.
        </p>
      </header>

      {/* Resumo por status */}
      <section className="space-y-3" aria-label="Resumo de objetivos por status">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Visão geral</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Planejados</p>
            <p className="mt-1 text-2xl font-semibold">{summary.planned}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Em andamento</p>
            <p className="mt-1 text-2xl font-semibold">{summary.inProgress}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/60 bg-emerald-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-emerald-200">Concluídos</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-50">{summary.done}</p>
          </div>
          <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-destructive">Atrasados</p>
            <p className="mt-1 text-2xl font-semibold text-destructive">{summary.late}</p>
          </div>
        </div>
      </section>

      {/* Filtros + CTA */}
      <section className="space-y-3" aria-label="Filtros de objetivos">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Objetivos por colaborador</h2>
            <p className="text-xs text-muted-foreground">
              Filtre por colaborador, status, projeto e atraso para identificar pontos de atenção.
            </p>
          </div>
          {isAdminOrOps && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-foreground hover:bg-background/90">
                Criar objetivo
              </button>
              <button className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-foreground hover:bg-background/90">
                Atribuir objetivo
              </button>
            </div>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-4 text-xs">
          <div className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-left text-muted-foreground">
            <p>Filtrar por colaborador</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-left text-muted-foreground">
            <p>Filtrar por status</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-left text-muted-foreground">
            <p>Filtrar por projeto</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-left text-muted-foreground">
            <p>Filtrar por atraso</p>
          </div>
        </div>
      </section>

      {/* Lista global (placeholder auditável) */}
      <section className="space-y-3" aria-label="Lista global de objetivos">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Objetivos cadastrados</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-8 text-center text-sm text-muted-foreground">
          <AlertTriangle className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Nenhum objetivo cadastrado ainda</p>
            <p className="text-sm text-muted-foreground">
              Utilize esta visão para registrar objetivos com responsável, prazo e vínculo com projetos. Cada objetivo
              deve ter um colaborador claramente responsável e um prazo definido.
            </p>
          </div>
        </div>
      </section>

      {/* Próximos do prazo */}
      <section className="space-y-3" aria-label="Objetivos próximos do prazo">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Risco de atraso</h2>
        <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-4 w-4 text-amber-300" />
            <span>Objetivos próximos do prazo aparecerão aqui para priorização.</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <UserCircle2 className="h-4 w-4 text-muted-foreground" />
            <span>
              Atribua sempre um único responsável por objetivo para garantir clareza de responsabilização.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminObjectivesList;
