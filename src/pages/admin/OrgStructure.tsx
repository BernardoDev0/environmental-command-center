import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, GitBranch } from "lucide-react";

const OrgStructure = () => {
  const { user } = useAuth();

  return (
    <main className="space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Estrutura organizacional</h1>
        <p className="text-sm text-muted-foreground">
          Visualize a cadeia de responsabilidade da empresa, da diretoria aos times de campo, com foco em quem responde
          por cada frente de trabalho.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Organograma</h2>
            <p className="text-xs text-muted-foreground">
              Este organograma é visual e serve como referência rápida para entender liderança, coordenações e
              reportes diretos.
            </p>
          </div>
          <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
            Perfil atual: <span className="font-medium text-foreground">{user?.name ?? "Usuário"}</span>
          </span>
        </div>

        <div className="space-y-2 rounded-2xl border border-border/70 bg-card/80 p-6 text-sm text-foreground shadow-lg shadow-black/30">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            VISÃO HIERÁRQUICA SIMPLIFICADA
          </div>

          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
              <span className="font-semibold">Diretoria</span>
              <span className="text-xs text-muted-foreground">Direção Geral</span>
            </div>
            <div className="ml-6 space-y-2 border-l border-border/60 pl-4">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                <span className="font-semibold">Gerência de Operações</span>
                <span className="text-xs text-muted-foreground">Projetos ambientais e equipes de campo</span>
              </div>
              <div className="ml-6 space-y-2 border-l border-border/60 pl-4">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  <span className="font-semibold">Coordenação de Campo</span>
                  <span className="text-xs text-muted-foreground">Supervisão direta de técnicos e EPIs</span>
                </div>
                <ul className="ml-6 list-disc space-y-1 text-xs text-muted-foreground">
                  <li>Times de técnicos de campo</li>
                  <li>Responsáveis por inventário de equipamentos</li>
                  <li>Referências para não conformidades em operação</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            A integração futura com os dados de usuários permitirá clicar em cada nó para abrir o perfil completo da
            pessoa, incluindo objetivos, equipamentos em posse e histórico de auditoria.
          </p>
        </div>
      </section>
    </main>
  );
};

export default OrgStructure;
