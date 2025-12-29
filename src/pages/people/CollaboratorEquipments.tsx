import { PackageSearch } from "lucide-react";

const CollaboratorEquipments = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Equipamentos em Posse</h2>
        <p className="text-sm text-muted-foreground">
          Acompanhe todos os bens e equipamentos atualmente vinculados ao colaborador.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <PackageSearch className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum equipamento associado a este colaborador.</p>
            <p className="text-sm text-muted-foreground">
              Utilize esta área, nas próximas fases, para registrar notebooks, celulares, EPIs e demais ativos sob
              responsabilidade do colaborador, garantindo rastreabilidade e conformidade patrimonial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorEquipments;
