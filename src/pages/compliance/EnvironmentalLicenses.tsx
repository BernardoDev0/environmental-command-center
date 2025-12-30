import { FileWarning } from "lucide-react";

const EnvironmentalLicenses = () => {
  return (
    <main className="space-y-8" aria-labelledby="environmental-licenses-title">
      <header className="space-y-2">
        <h1
          id="environmental-licenses-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Licenças ambientais
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Controle centralizado de licenças ambientais, datas de validade e riscos de vencimento para cada projeto.
        </p>
      </header>

      <section className="space-y-4" aria-label="Resumo de licenças">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Licenças ativas</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-amber-400/70 bg-amber-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-amber-300">Próximas do vencimento</p>
            <p className="mt-1 text-2xl font-semibold text-amber-50">0</p>
          </div>
          <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-destructive">Licenças vencidas</p>
            <p className="mt-1 text-2xl font-semibold text-destructive">0</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-label="Lista de licenças">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Licenças</h2>
            <p className="text-xs text-muted-foreground">
              Acompanhe LP, LI, LO e demais licenças associadas a projetos específicos.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-foreground hover:bg-background/90"
            >
              Registrar licença
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-8 text-center text-sm text-muted-foreground">
          <FileWarning className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Nenhuma licença cadastrada</p>
            <p className="text-sm text-muted-foreground">
              Cadastre licenças ambientais com datas de emissão e vencimento para evitar risco de operação irregular.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3" aria-label="Documentos de licença">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Documentos</h2>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/60 p-6 text-center text-xs text-muted-foreground">
          <p className="text-sm font-medium text-foreground">Upload de documentos (UI apenas)</p>
          <p>
            Esta área será utilizada para anexar cópias digitais das licenças. Nenhum arquivo é enviado neste momento;
            trata-se apenas da estrutura visual.
          </p>
          <button
            type="button"
            className="mt-1 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90"
          >
            Selecionar arquivo
          </button>
        </div>
      </section>
    </main>
  );
};

export default EnvironmentalLicenses;
