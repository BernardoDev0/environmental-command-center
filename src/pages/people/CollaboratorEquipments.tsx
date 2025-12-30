import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, PackageSearch, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EquipmentStatus = "ATIVO" | "MANUTENCAO" | "DESCARTADO";

type Equipment = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  status: EquipmentStatus;
  totalQuantity: number;
};

type EquipmentCondition = "OK" | "AVARIADO";

type EquipmentOccurrence = {
  id: string;
  type: "AVARIA" | "PERDA";
  description: string;
  createdAt: string;
};

type EquipmentPossession = {
  id: string;
  quantity: number;
  condition: EquipmentCondition;
  comment: string | null;
  assignedAt: string;
  equipment: Equipment;
  occurrences: EquipmentOccurrence[];
};

const conditionLabel: Record<EquipmentCondition, string> = {
  OK: "OK",
  AVARIADO: "Avariado",
};

const CollaboratorEquipments = () => {
  const { id: collaboratorId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const isAdminOrOps = user?.role === "ADMIN" || user?.role === "OPERATIONS_MANAGER";

  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | undefined>(undefined);
  const [assignQuantity, setAssignQuantity] = useState(1);
  const [assignCondition, setAssignCondition] = useState<EquipmentCondition>("OK");
  const [assignComment, setAssignComment] = useState("");
  const [assignError, setAssignError] = useState<string | null>(null);

  const {
    data: possessions,
    isLoading,
    isError,
  } = useQuery<EquipmentPossession[]>({
    queryKey: ["equipment", collaboratorId],
    enabled: !!collaboratorId && !!token,
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/employees/${collaboratorId}/equipment`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        throw new Error("Falha ao carregar equipamentos em posse");
      }
      return res.json();
    },
  });

  const { data: allEquipment } = useQuery<Equipment[]>({
    queryKey: ["equipment-list"],
    enabled: isAdminOrOps && !!token,
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/equipment", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        throw new Error("Falha ao carregar catálogo de equipamentos");
      }
      return res.json();
    },
  });

  const assignMutation = useMutation({
    mutationFn: async () => {
      if (!collaboratorId || !selectedEquipmentId) return;

      const body = {
        equipmentId: selectedEquipmentId,
        quantity: assignQuantity,
        condition: assignCondition,
        comment: assignComment,
      };

      const res = await fetch(`http://localhost:4000/api/employees/${collaboratorId}/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Não foi possível atribuir equipamento");
      }
      return res.json();
    },
    onSuccess: () => {
      setAssignOpen(false);
      setAssignError(null);
      queryClient.invalidateQueries({ queryKey: ["equipment", collaboratorId] });
    },
    onError: (err: any) => {
      setAssignError(err.message || "Falha ao atribuir equipamento");
    },
  });

  const returnMutation = useMutation({
    mutationFn: async (possessionId: string) => {
      const res = await fetch(`http://localhost:4000/api/equipment-possession/${possessionId}/return`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Não foi possível registrar devolução");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment", collaboratorId] });
    },
  });

  const occurrenceMutation = useMutation({
    mutationFn: async ({ possessionId, type, description }: { possessionId: string; type: string; description: string }) => {
      const res = await fetch(`http://localhost:4000/api/equipment-possession/${possessionId}/occurrence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ type, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Não foi possível registrar ocorrência");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment", collaboratorId] });
    },
  });

  const handleReportDamage = async (possession: EquipmentPossession) => {
    const description = window.prompt(
      "Descreva a avaria identificada neste equipamento (obrigatório):",
      "",
    );
    if (!description || !description.trim()) return;

    await occurrenceMutation.mutateAsync({ possessionId: possession.id, type: "AVARIA", description: description.trim() });
  };

  const handleRegisterOccurrence = async (possession: EquipmentPossession) => {
    const type = window.prompt('Tipo de ocorrência (AVARIA ou PERDA):', 'AVARIA');
    if (!type || (type !== "AVARIA" && type !== "PERDA")) return;
    const description = window.prompt("Descreva a ocorrência (obrigatório):", "");
    if (!description || !description.trim()) return;
    await occurrenceMutation.mutateAsync({
      possessionId: possession.id,
      type,
      description: description.trim(),
    });
  };

  const hasPossessions = possessions && possessions.length > 0;

  return (
    <section className="mt-6 space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold leading-tight tracking-tight">Equipamentos em Posse</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe os bens e equipamentos atualmente vinculados ao colaborador.
          </p>
        </div>
        {isAdminOrOps && (
          <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Atribuir equipamento</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Atribuir equipamento</DialogTitle>
                <DialogDescription>
                  Selecione o equipamento e defina a quantidade e condição para registrar a posse.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Equipamento</label>
                  <Select value={selectedEquipmentId} onValueChange={setSelectedEquipmentId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um equipamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {allEquipment?.map((eq) => (
                        <SelectItem key={eq.id} value={eq.id}>
                          {eq.name} ({eq.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Quantidade</label>
                    <Input
                      type="number"
                      min={1}
                      value={assignQuantity}
                      onChange={(e) => setAssignQuantity(Number(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Condição</label>
                    <Select value={assignCondition} onValueChange={(v) => setAssignCondition(v as EquipmentCondition)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OK">OK</SelectItem>
                        <SelectItem value="AVARIADO">Avariado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Comentário
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      (obrigatório se quantidade &gt; 1 ou condição "Avariado")
                    </span>
                  </label>
                  <Input
                    value={assignComment}
                    onChange={(e) => setAssignComment(e.target.value)}
                    placeholder="Justificativa para múltiplas unidades ou avaria"
                  />
                </div>
                {assignError && <p className="text-xs text-destructive">{assignError}</p>}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => assignMutation.mutate()}
                  disabled={!selectedEquipmentId || assignMutation.isPending}
                >
                  {assignMutation.isPending ? "Salvando..." : "Confirmar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </header>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Carregando equipamentos em posse...
        </div>
      )}

      {isError && !isLoading && (
        <div className="rounded-2xl border border-border/70 bg-card/80 p-8 text-sm text-muted-foreground shadow-lg shadow-black/30">
          Não foi possível carregar os equipamentos deste colaborador no momento.
        </div>
      )}

      {!isLoading && !isError && !hasPossessions && (
        <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
          <div className="flex flex-col items-center gap-3 text-center">
            <PackageSearch className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Nenhum equipamento em posse deste colaborador.</p>
              <p className="text-sm text-muted-foreground">
                Utilize esta área para registrar a entrega de EPIs, dispositivos e demais ativos físicos sob
                responsabilidade do colaborador.
              </p>
            </div>
          </div>
        </div>
      )}

      {hasPossessions && (
        <div className="space-y-4">
          {possessions!.map((possession) => {
            const hasAlert = possession.quantity > 1 || possession.condition === "AVARIADO";
            const hasDamage = possession.occurrences.some((o) => o.type === "AVARIA");

            return (
              <div
                key={possession.id}
                className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{possession.equipment.name}</h3>
                      <Badge variant="outline" className="text-[10px]">
                        {possession.equipment.category}
                      </Badge>
                      <Badge
                        variant={possession.condition === "AVARIADO" ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {conditionLabel[possession.condition]}
                      </Badge>
                      {hasAlert && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300">
                          <AlertTriangle className="h-3 w-3" />
                          Atenção
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Quantidade em posse: <span className="font-medium text-foreground">{possession.quantity}</span>
                    </p>
                    {possession.comment && (
                      <p className="text-[11px] text-muted-foreground">Justificativa: {possession.comment}</p>
                    )}
                    {hasDamage && (
                      <p className="text-[11px] text-amber-300">
                        Existem ocorrências de avaria registradas para este equipamento.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {user?.role === "USER" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReportDamage(possession)}
                        disabled={occurrenceMutation.isPending}
                      >
                        Reportar avaria
                      </Button>
                    )}
                    {isAdminOrOps && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => returnMutation.mutate(possession.id)}
                          disabled={returnMutation.isPending}
                        >
                          Devolver
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRegisterOccurrence(possession)}
                          disabled={occurrenceMutation.isPending}
                        >
                          Registrar ocorrência
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CollaboratorEquipments;
