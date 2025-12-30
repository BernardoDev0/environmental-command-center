import { ShieldCheck } from "lucide-react";

const LegalCompliance = () => {
  return (
    <main className="space-y-8" aria-labelledby="legal-compliance-title">
      <header className="space-y-2">
        <h1
          id="legal-compliance-title"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Conformidade legal ambiental
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Registre e acompanhe obrigações legais, normas e requisitos ambientais aplicáveis à operação da empresa.
        </p>
      </header>

      <section className="space-y-4" aria-label="Resumo de conformidade">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-muted-foreground">Obrigações cadastradas</p>
            <p className="mt-1 text-2xl font-semibold">0</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/60 bg-emerald-500/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-emerald-300">Conformes</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-100">0</p>
          </div>
          <div className="rounded-2xl border border-destructive/70 bg-destructive/10 p-4 shadow-lg shadow-black/30">
            <p className="text-xs text-destructive">Não conformes / em risco</p>
            <p className="mt-1 text-2xl font-semibold text-destructive">0</p>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-label="Lista de obrigações legais">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Obrigações legais
            </h2>
            <p className="text-xs text-muted-foreground">
              Controle centralizado das normas ambientais aplicáveis (federais, estaduais e municipais).
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-muted-foreground">
              Apenas administradores podem registrar novas obrigações.
            </span>
            <button
              type="button"
              className="hidden rounded-full border border-border/70 bg-background/60 px-3 py-1 text-foreground hover:bg-background/90 md:inline-flex"
            >
              Registrar obrigação legal
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/70 p-8 text-center text-sm text-muted-foreground">
          <ShieldCheck className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Nenhuma obrigação legal cadastrada ainda</p>
            <p className="text-sm text-muted-foreground">
              Utilize esta área para registrar licenças, resoluções, condicionantes e demais obrigações ambientais
              que exigem comprovação em auditorias.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalCompliance;
