import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, Layers3 } from "lucide-react";

const RolesAndFunctions = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <main className="space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Cargos &amp; funções</h1>
        <p className="text-sm text-muted-foreground">
          Estruture os cargos técnicos e administrativos da empresa e deixe claro quais responsabilidades cada função
          assume no dia a dia.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Cargos</h2>
            <p className="text-xs text-muted-foreground">
              Representam posições formais na organização, como Engenheiro Ambiental, Técnico de Campo ou Coordenador de
              Projetos.
            </p>
          </div>
          <button
            type="button"
            disabled={!isAdmin}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs text-foreground shadow-sm shadow-black/30 transition-colors hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Briefcase className="h-4 w-4" />
            Criar cargo
          </button>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-lg shadow-black/30">
          <p className="mb-3 text-sm font-medium text-foreground">Nenhum cargo cadastrado ainda</p>
          <p className="text-xs text-muted-foreground">
            Ao cadastrar cargos aqui, você poderá vinculá-los diretamente aos usuários na tela de
            <span className="font-semibold"> Usuários &amp; permissões</span>, garantindo alinhamento entre posição
            formal e acesso ao sistema.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Funções</h2>
            <p className="text-xs text-muted-foreground">
              Descrevem responsabilidades práticas, como &quot;Responsável por licenças ambientais&quot; ou &quot;Líder de
              campo&quot;.
            </p>
          </div>
          <button
            type="button"
            disabled={!isAdmin}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs text-foreground shadow-sm shadow-black/30 transition-colors hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Layers3 className="h-4 w-4" />
            Criar função
          </button>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-lg shadow-black/30">
          <p className="mb-3 text-sm font-medium text-foreground">Nenhuma função configurada</p>
          <p className="text-xs text-muted-foreground">
            Funções permitem registrar claramente quem responde por áreas sensíveis, como compliance ambiental,
            inventário de equipamentos ou gestão de contratos. Cada função deve ter uma descrição objetiva das
            responsabilidades associadas.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RolesAndFunctions;
