const ProjectDocuments = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Documentos</h2>
        <p className="text-sm text-muted-foreground">
          Centralize relatórios, anexos técnicos, atas de reunião e demais documentos do projeto.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Nenhum documento foi adicionado ainda. Esta área poderá ser usada para armazenar contratos, relatórios
          ambientais, memorandos e outros arquivos de suporte.
        </p>
      </div>
    </section>
  );
};

export default ProjectDocuments;
