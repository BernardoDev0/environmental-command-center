import { Palette, ShieldCheck, SlidersHorizontal } from "lucide-react";

const SystemSettings = () => {
  return (
    <main className="space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Configurações do sistema</h1>
        <p className="text-sm text-muted-foreground">
          Centralize ajustes de aparência, segurança e identidade da plataforma de forma padronizada e auditável.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Palette className="h-4 w-4" /> Aparência
        </h2>
        <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-6 text-sm text-foreground shadow-lg shadow-black/30">
          <p className="text-xs text-muted-foreground">Tema padrão</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs text-foreground shadow-sm shadow-black/30"
            >
              <span className="h-3 w-3 rounded-full bg-primary" />
              Dark blue (padrão)
            </button>
            <p className="text-xs text-muted-foreground">
              O tema padrão segue a identidade visual corporativa baseada em fundo azul escuro e alto contraste.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <ShieldCheck className="h-4 w-4" /> Segurança
        </h2>
        <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-6 text-sm text-foreground shadow-lg shadow-black/30">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Sessão expira em</p>
              <p className="text-xs text-muted-foreground">
                Definição conceitual de tempo máximo de sessão. Valor efetivo será controlado pelo backend.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3 w-3" />
              <span>Placeholder configurável</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Recomenda-se que sessões administrativas tenham tempo reduzido e autenticação reforçada, garantindo menor
            risco em estações compartilhadas.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" /> Sistema
        </h2>
        <div className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-6 text-sm text-foreground shadow-lg shadow-black/30">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Nome da empresa</p>
            <div className="flex min-h-[40px] items-center rounded-lg border border-border/70 bg-background/70 px-3 text-sm text-muted-foreground">
              Configuração conceitual — a integração futura permitirá persistir este valor e exibi-lo em toda a
              interface.
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Logo</p>
            <div className="flex min-h-[56px] items-center justify-between rounded-lg border border-dashed border-border/70 bg-background/40 px-3 text-xs text-muted-foreground">
              <span>Área reservada para upload e pré-visualização da marca da empresa.</span>
              <button
                type="button"
                className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-foreground shadow-sm shadow-black/30"
              >
                Selecionar arquivo
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SystemSettings;
