import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/TopBar";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider className="min-h-screen w-full bg-background px-4 py-6">
      <div className="flex min-h-full w-full gap-4">
        <AppSidebar />
        <div className="flex min-h-full flex-1 flex-col">
          <TopBar />
          <main className="flex-1 rounded-2xl bg-card/40 p-6 shadow-sm">
            <Outlet key={location.pathname} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
