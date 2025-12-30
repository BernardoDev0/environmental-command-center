import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface CollaboratorDashboardSummary {
  activeObjectives: number;
  pendingTasks: number;
  lateTasks: number;
}

const CollaboratorDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<CollaboratorDashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch("http://localhost:4000/api/health", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) {
          throw new Error("Falha ao carregar resumo");
        }
        // Placeholder até termos um endpoint dedicado de dashboard do colaborador
        setSummary({ activeObjectives: 0, pendingTasks: 0, lateTasks: 0 });
      } catch (err: any) {
        setError(err.message || "Falha ao carregar resumo");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [user]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Painel do colaborador</h1>
        <p className="text-sm text-muted-foreground">
          Foque na execução diária: objetivos, tarefas pendentes e eventuais atrasos sob sua responsabilidade.
        </p>
      </header>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando resumo do seu dia...
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && summary && (
        <div className="space-y-6">
          {/* Meu Dia */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Meu dia</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-muted-foreground">Objetivos ativos</p>
                <p className="mt-1 text-2xl font-semibold">{summary.activeObjectives}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-muted-foreground">Tarefas pendentes</p>
                <p className="mt-1 text-2xl font-semibold">{summary.pendingTasks}</p>
              </div>
              <div className="rounded-2xl border border-amber-500/70 bg-amber-500/10 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-amber-400">Tarefas em atraso</p>
                <p className="mt-1 text-2xl font-semibold text-amber-400">{summary.lateTasks}</p>
              </div>
            </div>
          </section>

          {/* Meus Objetivos */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Meus objetivos</h2>
              <span className="text-xs text-muted-foreground">Apenas objetivos atribuídos a você.</span>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
              Visão de objetivos com status e prazos finais será exibida aqui.
            </div>
          </section>

          {/* Minhas Tarefas */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Minhas tarefas</h2>
              <span className="text-xs text-muted-foreground">Checklist diário de execução.</span>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
              Lista de tarefas com atualização rápida de status e comentários será exibida aqui.
            </div>
          </section>

          {/* Alertas */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Alertas</h2>
            {summary.lateTasks > 0 ? (
              <div className="flex items-center justify-between rounded-2xl border border-amber-500/70 bg-amber-500/10 p-4 text-sm text-amber-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Você possui objetivos em atraso. Revise e justifique os motivos.</span>
                </div>
                <button className="inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground hover:bg-background">
                  <CheckCircle2 className="h-3 w-3" />
                  Justificar atraso
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum alerta crítico no momento.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default CollaboratorDashboard;
