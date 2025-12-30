import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const TopBar = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Dashboard",
      "/dashboard/admin": "Dashboard Administrativo",
      "/dashboard/colaborador": "Meu Dashboard",
      "/inventory": "Inventário & Equipamentos",
      "/projects": "Operações – Projetos",
      "/goals": "Objetivos & Tarefas",
      "/finance": "Financeiro & Contratos",
    };
    document.title = `${titles[location.pathname] || "Aplicação"} – Plataforma Ambiental`;
  }, [location.pathname]);

  return (
    <header className="flex h-18 items-center gap-4 border-b border-border/70 bg-background/75 px-6 pb-3 pt-4 backdrop-blur">
      <SidebarTrigger aria-label="Alternar barra lateral" />
      <div className="flex flex-1 items-center justify-between gap-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {location.pathname === "/dashboard/admin"
            ? "Dashboard Administrativo"
            : location.pathname === "/dashboard/colaborador"
              ? "Meu Dashboard"
              : location.pathname === "/inventory"
                ? "Inventário & Equipamentos"
                : location.pathname === "/projects"
                  ? "Operações – Projetos"
                  : location.pathname === "/goals"
                    ? "Objetivos & Tarefas"
                    : location.pathname === "/finance"
                      ? "Financeiro & Contratos"
                      : "Plataforma Ambiental"}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative w-72 max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-9 w-full rounded-full border border-input bg-background/80 pl-9 pr-4 text-sm text-foreground shadow-sm shadow-black/25 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Buscar em toda a plataforma"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
