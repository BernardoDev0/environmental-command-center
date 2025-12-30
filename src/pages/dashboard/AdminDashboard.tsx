import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Loader2, Target } from "lucide-react";

interface AdminDashboardSummary {
  totalCollaborators: number;
  activeProjects: number;
  inProgressObjectives: number;
  lateObjectives: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
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
        // Placeholder até termos um endpoint dedicado de dashboard admin
        setSummary({
          totalCollaborators: 0,
          activeProjects: 0,
          inProgressObjectives: 0,
          lateObjectives: 0,
        });
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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Visão geral executiva</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe os principais indicadores da operação, riscos e atrasos críticos em tempo real.
        </p>
      </header>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando indicadores do painel executivo...
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && summary && (
        <div className="space-y-6">
          {/* Visão Geral */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Visão geral</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-muted-foreground">Total de colaboradores</p>
                <p className="mt-1 text-2xl font-semibold">{summary.totalCollaborators}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-muted-foreground">Projetos ativos</p>
                <p className="mt-1 text-2xl font-semibold">{summary.activeProjects}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-muted-foreground">Objetivos em andamento</p>
                <p className="mt-1 text-2xl font-semibold">{summary.inProgressObjectives}</p>
              </div>
              <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 shadow-lg shadow-black/30">
                <p className="text-xs text-destructive">Objetivos atrasados</p>
                <p className="mt-1 text-2xl font-semibold text-destructive">{summary.lateObjectives}</p>
              </div>
            </div>
          </section>

          {/* Pessoas - visão rápida */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Pessoas</h2>
              <span className="text-xs text-muted-foreground">Lista resumida de colaboradores com foco em risco.</span>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
              <Target className="mr-2 h-4 w-4" /> Integre aqui uma visão rápida de colaboradores, objetivos ativos e atrasos.
            </div>
          </section>

          {/* Objetivos & Tarefas */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Objetivos &amp; Tarefas
              </h2>
              <div className="flex gap-2 text-xs">
                <button className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-foreground hover:bg-background/80">
                  Criar objetivo
                </button>
                <button className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-foreground hover:bg-background/80">
                  Atribuir objetivo
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
              Distribuição de objetivos por status (planejado, em andamento, concluído, atrasado) será exibida aqui.
            </div>
          </section>

          {/* Projetos e ações rápidas */}
          <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Projetos</h2>
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
                Visão de projetos ativos, progresso e alertas de requisitos pendentes.
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ações rápidas</h2>
              <div className="space-y-2 rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-foreground">
                <button className="flex w-full items-center justify-between rounded-lg bg-background/40 px-3 py-2 hover:bg-background/70">
                  <span>Criar colaborador</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg bg-background/40 px-3 py-2 hover:bg-background/70">
                  <span>Criar projeto</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg bg-background/40 px-3 py-2 hover:bg-background/70">
                  <span>Criar objetivo</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
