import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/TopBar";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar />
          <main className="flex-1 bg-background">
            <Outlet key={location.pathname} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
