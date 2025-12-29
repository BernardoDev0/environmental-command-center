import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search } from "lucide-react";

export const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Dashboard",
      "/inventory": "Estoque & Equipamentos",
      "/projects": "Operações – Projetos",
      "/goals": "Compliance & ESG",
      "/finance": "Financeiro & Contratos",
    };
    document.title = `${titles[location.pathname] || "Aplicação"} – Plataforma Ambiental`;
  }, [location.pathname]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger aria-label="Alternar barra lateral" />
      <div className="flex flex-1 items-center justify-between gap-4">
        <h1 className="text-lg font-semibold tracking-tight">
          {location.pathname === "/"
            ? "Dashboard"
            : location.pathname === "/inventory"
              ? "Estoque & Equipamentos"
              : location.pathname === "/projects"
                ? "Operações – Projetos"
                : location.pathname === "/goals"
                  ? "Compliance & ESG"
                  : location.pathname === "/finance"
                    ? "Financeiro & Contratos"
                    : "Plataforma"}
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64 max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9" placeholder="Buscar" />
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            <Moon className="h-4 w-4 dark:hidden" />
            <Sun className="hidden h-4 w-4 dark:block" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};
