import React from "react";
import {
  LayoutGrid,
  Package,
  ClipboardList,
  Target,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: LayoutGrid, label: "Dashboard", to: "/" },
  { icon: Package, label: "Inventory & Equipment", to: "/inventory" },
  { icon: ClipboardList, label: "Projects & Operations", to: "/projects", hasDropdown: true },
  { icon: Target, label: "Goals & Objectives", to: "/goals" },
  { icon: TrendingUp, label: "Finance & Contracts", to: "/finance", hasDropdown: true },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-background rounded-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-background" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive: navActive }) =>
                cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  navActive || isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70",
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </RouterNavLink>
          );
        })}
      </nav>
    </aside>
  );
}

