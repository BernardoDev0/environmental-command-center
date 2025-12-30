import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Target, CheckCircle2, Circle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type ObjectiveStatus = "PLANEJADO" | "EM_ANDAMENTO" | "CONCLUIDO" | "ATRASADO";
export type ObjectivePriority = "BAIXA" | "MEDIA" | "ALTA";
export type TaskStatus = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "BLOQUEADA";

type TaskComment = {
  id: string;
  comment: string;
  createdAt: string;
  authorName?: string;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string | null;
  comments?: TaskComment[];
};

type Objective = {
  id: string;
  title: string;
  description: string | null;
  priority: ObjectivePriority;
  status: ObjectiveStatus;
  startDate: string | null;
  dueDate: string | null;
  tasks: Task[];
  isOverdue?: boolean;
};

const statusLabels: Record<ObjectiveStatus, string> = {
  PLANEJADO: "Planejado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  ATRASADO: "Atrasado",
};

const statusBadgeVariant: Record<ObjectiveStatus, string> = {
  PLANEJADO: "outline",
  EM_ANDAMENTO: "default",
  CONCLUIDO: "secondary",
  ATRASADO: "destructive",
};

const priorityLabels: Record<ObjectivePriority, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
};

const taskStatusLabels: Record<TaskStatus, string> = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída",
  BLOQUEADA: "Bloqueada",
};

const CollaboratorGoals = () => {
  const { id: collaboratorId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const {
    data: objectives,
    isLoading,
    isError,
  } = useQuery<Objective[]>({
    queryKey: ["objectives", collaboratorId],
    enabled: !!collaboratorId && !!token,
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/employees/${collaboratorId}/objectives`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        throw new Error("Falha ao carregar objetivos");
      }
      return res.json();
    },
  });

  const canUpdateTasks = !!user;

  const updateTaskStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
      const res = await fetch(`http://localhost:4000/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("Não foi possível atualizar a tarefa");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives", collaboratorId] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ taskId, comment }: { taskId: string; comment: string }) => {
      const res = await fetch(`http://localhost:4000/api/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) {
        throw new Error("Não foi possível adicionar o comentário");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives", collaboratorId] });
    },
  });

  const justifyDelayMutation = useMutation({
    mutationFn: async ({ objectiveId, justification }: { objectiveId: string; justification: string }) => {
      const res = await fetch(`http://localhost:4000/api/objectives/${objectiveId}/delay-justification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ justification }),
      });
      if (!res.ok) {
        throw new Error("Não foi possível registrar a justificativa de atraso");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives", collaboratorId] });
    },
  });

  const handleToggleTask = (task: Task) => {
    if (!canUpdateTasks || updateTaskStatusMutation.isPending) return;

    const nextStatus: TaskStatus = task.status === "CONCLUIDA" ? "PENDENTE" : "CONCLUIDA";
    updateTaskStatusMutation.mutate({ taskId: task.id, status: nextStatus });
  };

  const renderStatusBadge = (status: ObjectiveStatus) => {
    return <Badge variant={statusBadgeVariant[status] as any}>{statusLabels[status]}</Badge>;
  };

  if (isLoading) {
    return (
      <section className="mt-6 space-y-6">
        <header className="space-y-1.5">
          <h2 className="text-xl font-semibold leading-tight tracking-tight">Objetivos e Tarefas</h2>
          <p className="text-sm text-muted-foreground">
            Defina, acompanhe e revise objetivos individuais, metas e tarefas atribuídas ao colaborador.
          </p>
        </header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando objetivos do colaborador...
        </div>
      </section>
    );
  }

  if (isError || !objectives) {
    return (
      <section className="mt-6 space-y-6">
        <header className="space-y-1.5">
          <h2 className="text-xl font-semibold leading-tight tracking-tight">Objetivos e Tarefas</h2>
          <p className="text-sm text-muted-foreground">
            Defina, acompanhe e revise objetivos individuais, metas e tarefas atribuídas ao colaborador.
          </p>
        </header>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-8 text-sm text-muted-foreground shadow-lg shadow-black/30">
          Não foi possível carregar os objetivos deste colaborador no momento.
        </div>
      </section>
    );
  }

  const hasObjectives = objectives.length > 0;

  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Objetivos e Tarefas</h2>
        <p className="text-sm text-muted-foreground">
          Acompanhe os objetivos individuais do colaborador, bem como o andamento das tarefas associadas.
        </p>
      </header>

      {!hasObjectives ? (
        <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
          <div className="flex flex-col items-center gap-3 text-center">
            <Target className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Nenhum objetivo cadastrado para este colaborador.</p>
              <p className="text-sm text-muted-foreground">
                Utilize esta área para registrar metas, resultados esperados e tarefas de acompanhamento, garantindo
                alinhamento contínuo entre colaborador e gestão.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {objectives.map((objective) => {
            const activeTasks = objective.tasks.filter((t) => t.status !== "CONCLUIDA").length;
            const completedTasks = objective.tasks.filter((t) => t.status === "CONCLUIDA").length;

            return (
              <div
                key={objective.id}
                className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-lg shadow-black/30"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setExpandedId((prev) => (prev === objective.id ? null : objective.id))}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold leading-tight text-foreground">{objective.title}</h3>
                      {renderStatusBadge(objective.status)}
                      <Badge variant="outline" className="text-[10px]">
                        Prioridade: {priorityLabels[objective.priority]}
                      </Badge>
                    </div>
                    {objective.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{objective.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      {objective.dueDate && (
                        <span>
                          Prazo: {new Date(objective.dueDate).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                      <span>
                        Tarefas ativas: {activeTasks} • Concluídas: {completedTasks}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {expandedId === objective.id ? "Recolher" : "Detalhar"}
                  </span>
                </button>

                {expandedId === objective.id && (
                  <div className="mt-4 space-y-2 border-t border-border/60 pt-3">
                    {objective.tasks.length === 0 ? (
                      <p className="text-xs text-muted-foreground">Nenhuma tarefa cadastrada para este objetivo.</p>
                    ) : (
                      <ul className="space-y-2">
                        {objective.tasks.map((task) => {
                          const isDone = task.status === "CONCLUIDA";
                          return (
                            <li
                              key={task.id}
                              className="flex items-start justify-between gap-3 rounded-xl bg-background/40 px-3 py-2"
                            >
                              <div className="flex items-start gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleTask(task)}
                                  disabled={!canUpdateTasks || updateTaskMutation.isPending}
                                  className={cn(
                                    "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors",
                                    isDone && "border-primary bg-primary text-primary-foreground",
                                  )}
                                  aria-label={
                                    isDone ? "Marcar tarefa como pendente" : "Marcar tarefa como concluída"
                                  }
                                >
                                  {isDone ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                                </button>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <p
                                      className={cn(
                                        "text-xs font-medium text-foreground",
                                        isDone && "line-through text-muted-foreground",
                                      )}
                                    >
                                      {task.title}
                                    </p>
                                    <Badge variant="outline" className="text-[10px]">
                                      {taskStatusLabels[task.status]}
                                    </Badge>
                                  </div>
                                  {task.description && (
                                    <p className="text-[11px] text-muted-foreground">{task.description}</p>
                                  )}
                                  {task.dueDate && (
                                    <p className="text-[10px] text-muted-foreground">
                                      Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                                    </p>
                                  )}
                                  {task.comments && task.comments.length > 0 && (
                                    <p className="text-[10px] text-muted-foreground">
                                      Último comentário: {task.comments[task.comments.length - 1]?.comment}
                                    </p>
                                  )}
                                  <button
                                    type="button"
                                    className="mt-1 text-[10px] text-primary underline-offset-2 hover:underline"
                                    onClick={() => {
                                      const comment = window.prompt("Adicionar comentário à tarefa:");
                                      if (comment && comment.trim()) {
                                        addCommentMutation.mutate({ taskId: task.id, comment: comment.trim() });
                                      }
                                    }}
                                  >
                                    Adicionar comentário
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {updateTaskStatusMutation.isError && (
                      <p className="mt-2 flex items-center gap-1 text-[11px] text-destructive">
                        <AlertCircle className="h-3 w-3" /> Não foi possível atualizar a tarefa ou comentário. Tente novamente.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CollaboratorGoals;
