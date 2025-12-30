import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Loader2, Target } from "lucide-react";

interface DashboardSummary {
  activeObjectives: number;
  pendingTasks: number;
  lateTasks: number;
}

const Index = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
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
        // Placeholder simples até termos um endpoint dedicado
        setSummary({ activeObjectives: 0, pendingTasks: 0, lateTasks: 0 });
      } catch (err: any) {
        setError(err.message || "Falha ao carregar resumo");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [user]);

  const isAdminOrOps = user?.role === "ADMIN" || user?.role === "OPERATIONS_MANAGER";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">
            {isAdminOrOps ? "Visão geral executiva" : "Painel do colaborador"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdminOrOps
              ? "Acompanhe os principais indicadores da operação e o engajamento dos colaboradores."
              : "Visualize rapidamente seus objetivos ativos e o status das suas tarefas."}
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando resumo...
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && summary && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
              <p className="text-xs text-muted-foreground">Objetivos ativos</p>
              <p className="mt-1 text-2xl font-semibold">{summary.activeObjectives}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
              <p className="text-xs text-muted-foreground">Tarefas pendentes</p>
              <p className="mt-1 text-2xl font-semibold">{summary.pendingTasks}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
              <p className="text-xs text-muted-foreground">Tarefas em atraso</p>
              <p className="mt-1 text-2xl font-semibold">{summary.lateTasks}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
