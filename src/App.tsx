import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Inventory from "./pages/inventory/Inventory";
import Projects from "./pages/projects/Projects";
import Goals from "./pages/goals/Goals";
import Finance from "./pages/finance/Finance";
import Collaborators from "./pages/people/Collaborators";
import CollaboratorLayout from "./pages/people/CollaboratorLayout";
import CollaboratorOverview from "./pages/people/CollaboratorOverview";
import CollaboratorEquipments from "./pages/people/CollaboratorEquipments";
import CollaboratorGoals from "./pages/people/CollaboratorGoals";
import CollaboratorHistory from "./pages/people/CollaboratorHistory";
import ProjectsList from "./pages/projects/ProjectsList";
import ProjectLayout from "./pages/projects/ProjectLayout";
import ProjectOverview from "./pages/projects/ProjectOverview";
import ProjectGoals from "./pages/projects/ProjectGoals";
import ProjectRequirements from "./pages/projects/ProjectRequirements";
import ProjectDocuments from "./pages/projects/ProjectDocuments";
 
const queryClient = new QueryClient();
 
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route index element={<Index />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/finance" element={<Finance />} />
            {/* Pessoas */}
            <Route path="/colaboradores" element={<Collaborators />} />
            <Route path="/colaboradores/:id" element={<CollaboratorLayout />}>
              <Route index element={<CollaboratorOverview />} />
              <Route path="equipamentos" element={<CollaboratorEquipments />} />
              <Route path="objetivos" element={<CollaboratorGoals />} />
              <Route path="historico" element={<CollaboratorHistory />} />
            </Route>
            {/* Operações / Projetos */}
            <Route path="/projetos" element={<ProjectsList />} />
            <Route path="/projetos/:id" element={<ProjectLayout />}>
              <Route index element={<ProjectOverview />} />
              <Route path="objetivos" element={<ProjectGoals />} />
              <Route path="requisitos" element={<ProjectRequirements />} />
              <Route path="documentos" element={<ProjectDocuments />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
 
export default App;
