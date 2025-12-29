import { LayoutDashboard } from "lucide-react";

const ProjectOverview = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Visão Geral do Projeto</h2>
        <p className="text-sm text-muted-foreground">
          Panorama consolidado do projeto, incluindo status, cronograma macro e responsáveis principais.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum dado consolidado de projeto disponível.</p>
            <p className="text-sm text-muted-foreground">
              Em breve, esta área trará linhas do tempo, próximos marcos, riscos principais e responsáveis por cada etapa
              crítica do projeto, facilitando o acompanhamento executivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
