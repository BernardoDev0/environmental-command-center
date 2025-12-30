import { useAuth } from "@/contexts/AuthContext";
import { ShieldAlert, UserPlus, Users } from "lucide-react";

const UsersPermissions = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <main className="space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Usuários &amp; permissões</h1>
        <p className="text-sm text-muted-foreground">
          Defina quem pode acessar o sistema, quais responsabilidades cada pessoa possui e qual nível de permissão se
          aplica.
        </p>
      </header>

      {!isAdmin && (
        <section className="rounded-2xl border border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-amber-400" />
            <div>
              <p className="font-medium text-foreground">Modo leitura</p>
              <p className="text-xs text-muted-foreground">
                Apenas administradores podem criar usuários, alterar roles e ativar ou desativar acessos. Você está
                visualizando a estrutura atual para suporte operacional.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Controle de acesso</h2>
            <p className="text-xs text-muted-foreground">
              Cada alteração de permissão impacta diretamente a governança e a rastreabilidade das operações.
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              disabled={!isAdmin}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-foreground shadow-sm shadow-black/30 transition-colors hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus className="h-4 w-4" />
              Criar usuário
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-lg shadow-black/30">
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.2fr)] border-b border-border/60 bg-muted/10 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>Nome</span>
            <span>Email</span>
            <span>Cargo</span>
            <span>Função</span>
            <span>Role</span>
            <span className="text-right">Status</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center text-sm text-muted-foreground">
            <Users className="h-5 w-5" />
            <p>
              Ainda não há usuários cadastrados na interface de administração. Quando o backend estiver integrado, esta
              tela trará a lista completa de acessos ao sistema.
            </p>
            {isAdmin && (
              <p className="text-xs text-muted-foreground">
                Utilize o botão <span className="font-semibold">“Criar usuário”</span> para iniciar o controle de
                permissões de forma centralizada.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Alterações críticas</h2>
        <div className="space-y-2 rounded-2xl border border-border/70 bg-card/80 p-4 text-xs text-muted-foreground">
          <p>
            Alterar a <span className="font-semibold text-foreground">role</span> de um usuário (ADMIN, OPERATIONS_MANAGER
            ou COLABORADOR) muda imediatamente o que ele pode ver e executar na plataforma.
          </p>
          <p>
            Toda mudança de permissão deve ser acompanhada de justificativa formal e registrada em trilha de auditoria
            para fins de compliance.
          </p>
        </div>
      </section>
    </main>
  );
};

export default UsersPermissions;
