import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminClients from "./pages/admin/AdminClients";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

// Employee pages
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeClients from "./pages/employee/EmployeeClients";
import EmployeeApplications from "./pages/employee/EmployeeApplications";
import EmployeeNewApplication from "./pages/employee/EmployeeNewApplication";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

// Client pages
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientApplications from "./pages/client/ClientApplications";
import ClientNewApplication from "./pages/client/ClientNewApplication";

// Public pages
import StatusCheck from "./pages/StatusCheck";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/clients" element={<EmployeeClients />} />
          <Route path="/employee/applications" element={<EmployeeApplications />} />
          <Route path="/employee/new-application" element={<EmployeeNewApplication />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          
          {/* Client Routes */}
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/applications" element={<ClientApplications />} />
          <Route path="/client/new-application" element={<ClientNewApplication />} />
          
          {/* Public Routes */}
          <Route path="/status" element={<StatusCheck />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
