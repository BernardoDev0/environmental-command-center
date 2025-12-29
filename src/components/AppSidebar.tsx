import React, { useMemo, useState } from "react";
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
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
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

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const [openSection, setOpenSection] = useState<"pessoas" | "operacoes" | null>(null);

  const currentPath = location.pathname;

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

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="border-border/40 bg-sidebar/95 shadow-lg shadow-black/40"
    >
      <SidebarHeader className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/90 shadow-md shadow-primary/40">
          <div className="h-5 w-5 rounded-lg border border-primary-foreground/40 bg-background/80" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">Plataforma Ambiental</span>
            <span className="text-xs text-sidebar-foreground/60">Painel de Operações</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === "/"}>
                  <NavLink to="/" end className="flex items-center gap-2" activeClassName="font-semibold">
                    <LayoutGrid className="h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Pessoas */}
              <SidebarMenuItem>
                <div className="flex items-center justify-between gap-1">
                  <SidebarMenuButton asChild isActive={isCollaboratorsRoute} className="flex-1">
                    <NavLink to="/colaboradores" className="flex items-center gap-2" activeClassName="font-semibold">
                      <Users className="h-4 w-4" />
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
                          "h-3 w-3 transform transition-transform",
                          openSection === "pessoas" ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </button>
                  )}
                </div>
                {!collapsed && openSection === "pessoas" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild isActive={currentPath === "/colaboradores"}>
                      <NavLink to="/colaboradores" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />
                        <span>Lista de Colaboradores</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton
                      asChild
                      isActive={currentPath.startsWith("/colaboradores/")}
                      className="mt-1"
                    >
                      <NavLink to="/colaboradores/1" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />
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
                  <SidebarMenuButton asChild isActive={isProjectsRoute} className="flex-1">
                    <NavLink to="/projetos" className="flex items-center gap-2" activeClassName="font-semibold">
                      <ClipboardList className="h-4 w-4" />
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
                          "h-3 w-3 transform transition-transform",
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
                <SidebarMenuButton asChild isActive={isInventoryRoute}>
                  <NavLink to="/inventory" className="flex items-center gap-2" activeClassName="font-semibold">
                    <Package className="h-4 w-4" />
                    {!collapsed && <span>Estoque &amp; Equipamentos</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Financeiro & Contratos */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isFinanceRoute}>
                  <NavLink to="/finance" className="flex items-center gap-2" activeClassName="font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    {!collapsed && <span>Financeiro &amp; Contratos</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Compliance & ESG */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isComplianceRoute}>
                  <NavLink to="/goals" className="flex items-center gap-2" activeClassName="font-semibold">
                    <ShieldCheck className="h-4 w-4" />
                    {!collapsed && <span>Compliance &amp; ESG</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Administração */}
              <SidebarMenuItem>
                <SidebarMenuButton type="button" className="justify-start">
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Administração</span>}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

