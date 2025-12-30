import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/TopBar";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider className="min-h-screen w-full bg-background px-5 py-6">
      <div className="flex min-h-full w-full gap-5">
        <AppSidebar />
        <div className="flex min-h-full flex-1 flex-col">
          <TopBar />
          <main className="flex-1 rounded-3xl bg-card/95 p-7 shadow-[0_22px_60px_rgba(0,0,0,0.65)] animate-enter">
            <Outlet key={location.pathname} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
