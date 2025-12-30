import React, { useMemo, useState, useEffect } from "react";
import {
  LayoutGrid,
  Users,
  UserRound,
  ClipboardList,
  Package,
  TrendingUp,
  ShieldCheck,
  Settings,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const [openSection, setOpenSection] = useState<"pessoas" | "operacoes" | null>(null);
  const [isDark, setIsDark] = useState(true as boolean);

  const currentPath = location.pathname;

  const { user } = useAuth();
  const isAdminOrOps = user?.role === "ADMIN" || user?.role === "OPERATIONS_MANAGER";

  const dashboardPath = !user
    ? "/"
    : user.role === "USER"
      ? "/colaborador/dashboard"
      : "/admin/dashboard";
  const isDashboardRoute = currentPath === "/colaborador/dashboard" || currentPath === "/admin/dashboard";

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = stored ? stored === "dark" : root.classList.contains("dark");
    if (prefersDark) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const isCollaboratorsRoute = currentPath.startsWith("/colaboradores");
  const isProjectsRoute = currentPath.startsWith("/projetos");
  const isInventoryRoute = currentPath === "/inventory";
  const isFinanceRoute = currentPath === "/finance";
  const isComplianceRoute = currentPath === "/goals";

  const initialSection = useMemo<"pessoas" | "operacoes" | null>(() => {
    if (isProjectsRoute) return "operacoes";
    if (isCollaboratorsRoute) return "pessoas";
    return null;
  }, [isProjectsRoute, isCollaboratorsRoute]);

  React.useEffect(() => {
    setOpenSection((prev) => prev ?? initialSection);
  }, [initialSection]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="border border-sidebar-border/60 bg-sidebar/95 shadow-lg shadow-black/40"
    >
      <SidebarHeader className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/90 shadow-md shadow-primary/40">
          <div className="h-5 w-5 rounded-lg border border-primary-foreground/40 bg-background/80" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-sidebar-foreground">Plataforma Ambiental</span>
            <span className="text-xs text-sidebar-foreground/70">Painel de Operações</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isDashboardRoute} tooltip="Dashboard">
                  <NavLink
                    to={dashboardPath}
                    end
                    className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                    activeClassName="font-semibold"
                  >
                    <LayoutGrid className="h-5 w-5" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Pessoas */}
              <SidebarMenuItem>
                <div className="flex items-center justify-between gap-1">
                  <SidebarMenuButton asChild isActive={isCollaboratorsRoute} className="flex-1" tooltip="Pessoas">
                    <NavLink
                      to="/colaboradores"
                      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                      activeClassName="font-semibold"
                    >
                      <Users className="h-5 w-5" />
                      {!collapsed && <span>Pessoas</span>}
                    </NavLink>
                  </SidebarMenuButton>
                  {!collapsed && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenSection((prev) => (prev === "pessoas" ? null : "pessoas"));
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      aria-label={openSection === "pessoas" ? "Recolher Pessoas" : "Expandir Pessoas"}
                    >
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transform text-sidebar-foreground/70 transition-transform duration-300 ease-out",
                          openSection === "pessoas" ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </button>
                  )}
                </div>
                {!collapsed && openSection === "pessoas" && (
                  <SidebarMenuSub>
                    {isAdminOrOps && (
                      <SidebarMenuSubButton asChild isActive={currentPath === "/colaboradores"}>
                        <NavLink to="/colaboradores" className="flex items-center gap-2">
                          <span>Lista de Colaboradores</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    )}
                    <SidebarMenuSubButton
                      asChild
                      isActive={currentPath.startsWith("/colaboradores/")}
                      className="mt-1"
                    >
                      <NavLink to="/colaboradores/1" className="flex items-center gap-2">
                        <span>Perfil do Colaborador</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/equipamentos")} size="sm">
                        <NavLink to="/colaboradores/1/equipamentos" className="flex items-center gap-2">
                          <span>Equipamentos em Posse</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/objetivos")} size="sm">
                        <NavLink to="/colaboradores/1/objetivos" className="flex items-center gap-2">
                          <span>Objetivos e Tarefas</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/historico")} size="sm">
                        <NavLink to="/colaboradores/1/historico" className="flex items-center gap-2">
                          <span>Histórico</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Operações */}
              <SidebarMenuItem>
                <div className="flex items-center justify-between gap-1">
                  <SidebarMenuButton asChild isActive={isProjectsRoute} className="flex-1" tooltip="Operações">
                    <NavLink
                      to="/projetos"
                      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                      activeClassName="font-semibold"
                    >
                      <ClipboardList className="h-5 w-5" />
                      {!collapsed && <span>Operações</span>}
                    </NavLink>
                  </SidebarMenuButton>
                  {!collapsed && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenSection((prev) => (prev === "operacoes" ? null : "operacoes"));
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      aria-label={openSection === "operacoes" ? "Recolher Operações" : "Expandir Operações"}
                    >
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transform text-sidebar-foreground/70 transition-transform duration-300 ease-out",
                          openSection === "operacoes" ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </button>
                  )}
                </div>
                {!collapsed && openSection === "operacoes" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild isActive={currentPath === "/projetos"}>
                      <NavLink to="/projetos" className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        <span>Projetos</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton
                      asChild
                      isActive={currentPath.startsWith("/projetos/")}
                      className="mt-1"
                    >
                      <NavLink to="/projetos/1" className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        <span>Visão Geral do Projeto</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/objetivos")} size="sm">
                        <NavLink to="/projetos/1/objetivos" className="flex items-center gap-2">
                          <span>Objetivos do Projeto</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/requisitos")} size="sm">
                        <NavLink to="/projetos/1/requisitos" className="flex items-center gap-2">
                          <span>Requisitos</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild isActive={currentPath.endsWith("/documentos")} size="sm">
                        <NavLink to="/projetos/1/documentos" className="flex items-center gap-2">
                          <span>Documentos</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Estoque & Equipamentos */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isInventoryRoute} tooltip="Estoque &amp; Equipamentos">
                  <NavLink
                    to="/inventory"
                    className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                    activeClassName="font-semibold"
                  >
                    <Package className="h-5 w-5" />
                    {!collapsed && <span>Estoque &amp; Equipamentos</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Financeiro & Contratos */}
              {isAdminOrOps && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isFinanceRoute} tooltip="Financeiro &amp; Contratos">
                    <NavLink
                      to="/finance"
                      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                      activeClassName="font-semibold"
                    >
                      <TrendingUp className="h-5 w-5" />
                      {!collapsed && <span>Financeiro &amp; Contratos</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* Compliance & ESG */}
              {isAdminOrOps && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isComplianceRoute} tooltip="Compliance &amp; ESG">
                    <NavLink
                      to="/goals"
                      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                      activeClassName="font-semibold"
                    >
                      <ShieldCheck className="h-5 w-5" />
                      {!collapsed && <span>Compliance &amp; ESG</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* Administração */}
              {isAdminOrOps && (
                <SidebarMenuItem>
                  <SidebarMenuButton type="button" className="justify-start" tooltip="Administração">
                    <span className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {!collapsed && <span>Administração</span>}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center gap-3 border-t border-sidebar-border/60 px-3 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                aria-label={isDark ? "Modo claro" : "Modo escuro"}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{isDark ? "Modo claro" : "Modo escuro"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
                aria-label="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Sair</TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

