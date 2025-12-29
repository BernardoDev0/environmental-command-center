import { FileText } from "lucide-react";

const ProjectDocuments = () => {
  return (
    <section className="mt-6 space-y-6">
      <header className="space-y-1.5">
        <h2 className="text-xl font-semibold leading-tight tracking-tight">Documentos</h2>
        <p className="text-sm text-muted-foreground">
          Centralize relatórios, anexos técnicos, atas de reunião e demais documentos do projeto.
        </p>
      </header>
      <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-lg shadow-black/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Nenhum documento adicionado ao projeto.</p>
            <p className="text-sm text-muted-foreground">
              Esta área poderá ser usada para armazenar contratos, relatórios ambientais, memorandos e outros arquivos de
              suporte, garantindo um repositório único e organizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDocuments;
