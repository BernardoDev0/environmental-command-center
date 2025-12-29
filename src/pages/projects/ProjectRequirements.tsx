import { ClipboardList } from "lucide-react";

const ProjectRequirements = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Requisitos</h2>
        <p className="text-sm text-muted-foreground">
          Liste requisitos técnicos, regulatórios, operacionais e de conformidade necessários para este projeto.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum requisito cadastrado.</p>
            <p className="text-sm text-muted-foreground">
              Em versões futuras, esta área poderá concentrar requisitos funcionais, dependências de sistemas,
              aprovações internas e premissas obrigatórias para execução segura do projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectRequirements;
