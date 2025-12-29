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

  const isProjectsRoute = currentPath === "/projects";
  const isInventoryRoute = currentPath === "/inventory";
  const isFinanceRoute = currentPath === "/finance";
  const isComplianceRoute = currentPath === "/goals";

  const initialSection = useMemo<"pessoas" | "operacoes" | null>(() => {
    if (isProjectsRoute) return "operacoes";
    if (isInventoryRoute) return "pessoas";
    return null;
  }, [isProjectsRoute, isInventoryRoute]);

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
                <SidebarMenuButton
                  type="button"
                  onClick={() => setOpenSection((prev) => (prev === "pessoas" ? null : "pessoas"))}
                  isActive={isInventoryRoute}
                  className="justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {!collapsed && <span>Pessoas</span>}
                  </span>
                  {!collapsed && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transform transition-transform",
                        openSection === "pessoas" ? "rotate-180" : "rotate-0",
                      )}
                    />
                  )}
                </SidebarMenuButton>
                {!collapsed && openSection === "pessoas" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild isActive={isInventoryRoute}>
                      <NavLink to="/inventory" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />
                        <span>Colaboradores</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <ul className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border/60 pl-3 text-xs text-sidebar-foreground/80">
                      <li>Lista de Colaboradores</li>
                      <li>
                        Perfil do Colaborador
                        <ul className="ml-3 mt-0.5 space-y-0.5 text-[11px] text-sidebar-foreground/70">
                          <li>Equipamentos em Posse</li>
                          <li>Objetivos e Tarefas</li>
                          <li>Histórico</li>
                        </ul>
                      </li>
                    </ul>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Operações */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  type="button"
                  onClick={() => setOpenSection((prev) => (prev === "operacoes" ? null : "operacoes"))}
                  isActive={isProjectsRoute}
                  className="justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    {!collapsed && <span>Operações</span>}
                  </span>
                  {!collapsed && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transform transition-transform",
                        openSection === "operacoes" ? "rotate-180" : "rotate-0",
                      )}
                    />
                  )}
                </SidebarMenuButton>
                {!collapsed && openSection === "operacoes" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubButton asChild isActive={isProjectsRoute}>
                      <NavLink to="/projects" className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        <span>Projetos</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                    <ul className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border/60 pl-3 text-xs text-sidebar-foreground/80">
                      <li>Visão Geral do Projeto</li>
                      <li>Objetivos do Projeto</li>
                      <li>Requisitos</li>
                      <li>Documentos</li>
                    </ul>
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

