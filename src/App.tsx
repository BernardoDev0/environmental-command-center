import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import LegalCompliance from "./pages/compliance/LegalCompliance";
import EnvironmentalLicenses from "./pages/compliance/EnvironmentalLicenses";
import EsgIndicators from "./pages/compliance/EsgIndicators";
import AuditsAndNonConformities from "./pages/compliance/AuditsAndNonConformities";
import ComplianceReports from "./pages/compliance/ComplianceReports";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CollaboratorDashboard from "./pages/dashboard/CollaboratorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Redireciona automaticamente para o dashboard correto com base no papel */}
              <Route index element={<RoleBasedRedirect />} />

              {/* Dashboards dedicados por papel */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/colaborador/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["USER", "ADMIN", "OPERATIONS_MANAGER"]}>
                    <CollaboratorDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Outras rotas protegidas */}
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER", "USER"]}>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER", "USER"]}>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER"]}>
                    <Goals />
                  </ProtectedRoute>
                }
              />
              {/* Compliance & ESG */}
              <Route
                path="/compliance/conformidade-legal"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_MANAGER', 'USER']}>
                    <LegalCompliance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compliance/licencas-ambientais"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_MANAGER', 'USER']}>
                    <EnvironmentalLicenses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compliance/indicadores-esg"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_MANAGER', 'USER']}>
                    <EsgIndicators />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compliance/auditorias-nao-conformidades"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_MANAGER', 'USER']}>
                    <AuditsAndNonConformities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compliance/relatorios"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'OPERATIONS_MANAGER', 'USER']}>
                    <ComplianceReports />
                  </ProtectedRoute>
                }
              />
              {/* Pessoas */}
              <Route
                path="/colaboradores"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER"]}>
                    <Collaborators />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/colaboradores/:id"
                element={
                  <ProtectedRoute>
                    <CollaboratorLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CollaboratorOverview />} />
                <Route path="equipamentos" element={<CollaboratorEquipments />} />
                <Route path="objetivos" element={<CollaboratorGoals />} />
                <Route path="historico" element={<CollaboratorHistory />} />
              </Route>
              {/* Operações / Projetos */}
              <Route
                path="/projetos"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER", "USER"]}>
                    <ProjectsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projetos/:id"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "OPERATIONS_MANAGER", "USER"]}>
                    <ProjectLayout />
                  </ProtectedRoute>
                }
              >
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
