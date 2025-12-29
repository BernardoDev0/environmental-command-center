import { UserRound } from "lucide-react";

const CollaboratorOverview = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Visão geral</h2>
        <p className="text-sm text-muted-foreground">
          Resumo executivo do colaborador, incluindo dados principais, função atual e status na organização.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <UserRound className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhuma informação detalhada cadastrada ainda.</p>
            <p className="text-sm text-muted-foreground">
              Esta área será utilizada para consolidar dados pessoais, cargo, área de atuação e vínculos do colaborador
              com a organização, oferecendo uma visão única e atualizada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorOverview;
