import { History } from "lucide-react";

const CollaboratorHistory = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Histórico</h2>
        <p className="text-sm text-muted-foreground">
          Consulte o histórico de movimentações, mudanças de função e eventos relevantes do colaborador.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <History className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum registro histórico disponível até o momento.</p>
            <p className="text-sm text-muted-foreground">
              Em versões futuras, esta área exibirá admissões, promoções, transferências, afastamentos e demais
              movimentações relevantes da jornada do colaborador na organização.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorHistory;
