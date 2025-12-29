import React from "react";
import {
  CircleGauge,
  PackageSearch,
  ClipboardList,
  Target,
  WalletCards,
  FileText,
  Banknote,
  ReceiptText,
  ChevronRight,
} from "lucide-react";
import { useLocation, NavLink as RouterNavLink } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  to: string;
}

const primaryItems: { title: string; to: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { title: "Dashboard", to: "/", icon: CircleGauge },
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
  const [financeOpen, setFinanceOpen] = React.useState(true);

  const isFinanceSectionActive = React.useMemo(
    () => location.pathname === financeOverview.to || location.pathname.startsWith("/finance/"),
    [location.pathname],
  );

  return (
    <Sidebar collapsible="icon" className="bg-sidebar text-sidebar-foreground">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/55">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map(({ title, to, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild isActive={location.pathname === to} className="rounded-lg">
                    <RouterNavLink
                      to={to}
                      end={to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 text-sm text-sidebar-foreground/80",
                          isActive && "bg-sidebar-accent text-sidebar-primary font-medium",
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
                  className="rounded-lg"
                  data-state={financeOpen ? "open" : "closed"}
                >
                  <button
                    type="button"
                    onClick={() => setFinanceOpen((prev) => !prev)}
                    className="flex w-full items-center gap-3 text-sm text-sidebar-foreground/80"
                  >
                    <WalletCards className="h-4 w-4" />
                    <span className="flex-1 truncate text-left">{financeOverview.title}</span>
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 text-sidebar-foreground/60 transition-transform duration-200",
                        financeOpen && "rotate-90",
                      )}
                    />
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuSub>
                {financeChildren.map((child) => (
                  <SidebarMenuSubItem key={child.to}>
                    <SidebarMenuSubButton
                      asChild
                      size="sm"
                      isActive={location.pathname === child.to}
                      className="rounded-md text-xs text-sidebar-foreground/70"
                    >
                      <RouterNavLink to={child.to}>
                        <span className="truncate">{child.title}</span>
                      </RouterNavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
