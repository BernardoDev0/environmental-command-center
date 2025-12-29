import React from "react";
import {
  LayoutDashboard,
  PackageSearch,
  ClipboardList,
  Target,
  WalletCards,
  ChevronRight,
} from "lucide-react";
import { useLocation, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  to: string;
}

const primaryItems: { title: string; to: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Inventory & Equipment", to: "/inventory", icon: PackageSearch },
  { title: "Projects & Operations", to: "/projects", icon: ClipboardList },
  { title: "Goals & Objectives", to: "/goals", icon: Target },
];

const financeOverview: NavItem = { title: "Finance & Contracts", to: "/finance" };

const financeChildren: NavItem[] = [
  { title: "Suppliers", to: "/finance/suppliers" },
  { title: "Contracts", to: "/finance/contracts" },
  { title: "Expenses", to: "/finance/expenses" },
  { title: "Invoices", to: "/finance/invoices" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const [financeOpen, setFinanceOpen] = React.useState(true);

  const isFinanceSectionActive = React.useMemo(
    () => location.pathname === financeOverview.to || location.pathname.startsWith("/finance/"),
    [location.pathname],
  );

  const handleFinanceClick = () => {
    setFinanceOpen((prev) => !prev);
    navigate(financeOverview.to);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: state === "expanded" ? 260 : 72 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden h-full shrink-0 md:block"
    >
      <Sidebar
        collapsible="icon"
        variant="floating"
        className="h-full rounded-2xl border border-sidebar-border bg-sidebar/95 px-3 py-4 text-sidebar-foreground shadow-xl"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-sidebar-foreground/60">
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {primaryItems.map(({ title, to, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild isActive={location.pathname === to} className="rounded-xl px-2 py-1.5">
                      <RouterNavLink
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 text-[13px] font-medium text-sidebar-foreground/80 transition-colors",
                            "hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
                            isActive &&
                              "bg-sidebar-accent text-sidebar-primary shadow-[0_0_0_1px_hsl(var(--sidebar-border))]",
                          )
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span className="truncate">{title}</span>
                      </RouterNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Finance section with nested items */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isFinanceSectionActive}
                    className="rounded-xl px-2 py-1.5"
                    data-state={financeOpen ? "open" : "closed"}
                  >
                    <button
                      type="button"
                      onClick={handleFinanceClick}
                      className="flex w-full items-center gap-3 text-[13px] font-medium text-sidebar-foreground/80"
                    >
                      <WalletCards className="h-4 w-4" />
                      <span className="flex-1 truncate text-left">{financeOverview.title}</span>
                      <motion.span
                        animate={{ rotate: financeOpen ? 90 : 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/60" />
                      </motion.span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {financeOpen && (
                  <SidebarMenuSub>
                    {financeChildren.map((child) => (
                      <SidebarMenuSubItem key={child.to}>
                        <SidebarMenuSubButton
                          asChild
                          size="sm"
                          isActive={location.pathname === child.to}
                          className="rounded-lg text-[12px] font-normal text-sidebar-foreground/70"
                        >
                          <RouterNavLink to={child.to}>
                            <span className="truncate">{child.title}</span>
                          </RouterNavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </motion.aside>
  );
}

