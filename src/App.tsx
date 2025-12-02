// import { useState, useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Loader from "@/components/Loader"; // 👈 Import Loader

// // Pages
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

// // Admin pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminEmployees from "./pages/admin/AdminEmployees";
// import AdminClients from "./pages/admin/AdminClients";
// import AdminApplications from "./pages/admin/AdminApplications";
// import AdminReports from "./pages/admin/AdminReports";
// import AdminSettings from "./pages/admin/AdminSettings";

// // Employee pages
// import EmployeeLogin from "./pages/employee/EmployeeLogin";
// import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
// import EmployeeClients from "./pages/employee/EmployeeClients";
// import EmployeeApplications from "./pages/employee/EmployeeApplications";
// import EmployeeNewApplication from "./pages/employee/EmployeeNewApplication";
// import EmployeeProfile from "./pages/employee/EmployeeProfile";

// // Client pages
// import ClientLogin from "./pages/client/ClientLogin";
// import ClientRegister from "./pages/client/ClientRegister";
// import ClientDashboard from "./pages/client/ClientDashboard";
// import ClientApplications from "./pages/client/ClientApplications";
// import ClientNewApplication from "./pages/client/ClientNewApplication";

// // Public pages
// import StatusCheck from "./pages/StatusCheck";
// import AdminRoute from "./lib/AdminRoute";
// import EmployeeRoute from "./lib/EmployeeRoute";
// import AgentDashboard from "./pages/Agents/AgentDashboard";
// import AgentLogin from "./pages/Agents/AgentLogin";
// import AdminAgents from "./pages/admin/AdminAgents";
// import Agentclients from "./pages/Agents/Agentclients";
// import AgentApplication from "./pages/Agents/AgentApplication";
// import AgentRoute from "./lib/AgentRoute";

// const queryClient = new QueryClient();

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/agent/dashboard" element={
//               <AgentRoute>
//                <AgentDashboard/>
//               </AgentRoute>
//               } />
//             <Route path="/agent/login"  element={<AgentLogin/>}/>
//             <Route path="/agent/clients"  element={
//                   <AgentRoute>
//                         <Agentclients/>
//                   </AgentRoute>
//                }/>
//             <Route path="/agent/applications"  element={
//                 <AgentRoute>
//                 <AgentApplication/>
//                 </AgentRoute>
              
              
//               }/>
//             {/* Admin Routes */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route
//               path="/admin/dashboard"
//               element={
//                 <AdminRoute>
//                   <AdminDashboard />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/employees"
//               element={
//                 <AdminRoute>
//                   <AdminEmployees />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/clients"
//               element={
//                 <AdminRoute>
//                   <AdminClients />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/agents"
//               element={
//                 <AdminRoute>
//                   <AdminAgents />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/applications"
//               element={
//                 <AdminRoute>
//                   <AdminApplications />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/reports"
//               element={
//                 <AdminRoute>
//                   <AdminReports />
//                 </AdminRoute>
//               }
//             />
//             <Route
//               path="/admin/settings"
//               element={
//                 <AdminRoute>
//                   <AdminSettings />
//                 </AdminRoute>
//               }
//             />

//             {/* Employee Routes */}
//             <Route path="/employee/login" element={<EmployeeLogin />} />
//             <Route
//               path="/employee/dashboard"
//               element={
//                 <EmployeeRoute>
//                   <EmployeeDashboard />
//                 </EmployeeRoute>
//               }
//             />

//             <Route
//               path="/employee/clients"
//               element={
//                 <EmployeeRoute>
//                   <EmployeeClients />
//                 </EmployeeRoute>
//               }
//             />

//             <Route
//               path="/employee/applications"
//               element={
//                 <EmployeeRoute>
//                   <EmployeeApplications />
//                 </EmployeeRoute>
//               }
//             />

//             <Route
//               path="/employee/new-application"
//               element={
//                 <EmployeeRoute>
//                   <EmployeeNewApplication />
//                 </EmployeeRoute>
//               }
//             />

//             <Route
//               path="/employee/profile"
//               element={
//                 <EmployeeRoute>
//                   <EmployeeProfile />
//                 </EmployeeRoute>
//               }
//             />

//             {/* Client Routes */}
//             <Route path="/client/login" element={<ClientLogin />} />
//             <Route path="/client/register" element={<ClientRegister />} />
//             <Route path="/client/dashboard" element={<ClientDashboard />} />
//             <Route
//               path="/client/applications"
//               element={<ClientApplications />}
//             />
//             <Route
//               path="/client/new-application"
//               element={<ClientNewApplication />}
//             />

//             {/* Public Routes */}
//             <Route path="/status" element={<StatusCheck />} />

//             {/* Catch-All Route */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;




// 




import { useState, useEffect } from "react";
import api from "./lib/api";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "@/components/Loader";

// Pages
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
import Commission from "./pages/admin/Commission";

// Employee pages
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeClients from "./pages/employee/EmployeeClients";
import EmployeeApplications from "./pages/employee/EmployeeApplications";
import EmployeeNewApplication from "./pages/employee/EmployeeNewApplication";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeAgents from "./pages/employee/EmployeeAgents";

// Client pages
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientApplications from "./pages/client/ClientApplications";
import ClientNewApplication from "./pages/client/ClientNewApplication";
import ClientProfile from "./pages/client/ClientProfile";
import ClientApplicationDetail from "./pages/client/ClientApplicationDetail";

// Public pages
import StatusCheck from "./pages/StatusCheck";
import AdminRoute from "./lib/AdminRoute";
import EmployeeRoute from "./lib/EmployeeRoute";
import AgentDashboard from "./pages/Agents/AgentDashboard";
import AgentLogin from "./pages/Agents/AgentLogin";
import AdminAgents from "./pages/admin/AdminAgents";
import Agentclients from "./pages/Agents/Agentclients";
import AgentApplication from "./pages/Agents/AgentApplication";
import AgentRoute from "./lib/AgentRoute";
import AgentCommissions from "./pages/Agents/AgentCommissions";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agent/dashboard" element={
              <AgentRoute>
                <AgentDashboard/>
              </AgentRoute>
            } />
            <Route path="/agent/login"  element={<AgentLogin/>}/>
            <Route path="/agent/clients"  element={
              <AgentRoute>
                <Agentclients/>
              </AgentRoute>
            }/>
            <Route path="/agent/applications"  element={
              <AgentRoute>
                <AgentApplication/>
              </AgentRoute>
            }/>
            <Route path="/agent/commissions" element={
              <AgentRoute>
                <AgentCommissions />
              </AgentRoute>
            } />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <AdminRoute>
                  <AdminEmployees />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <AdminRoute>
                  <AdminClients />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/agents"
              element={
                <AdminRoute>
                  <AdminAgents />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <AdminRoute>
                  <AdminApplications />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <AdminRoute>
                  <AdminReports />
                </AdminRoute>
              }
            />
            {/* legacy AdminCommissions route removed; use /admin/commission */}
            <Route
              path="/admin/commission"
              element={
                <AdminRoute>
                  <Commission />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              }
            />

            {/* Employee Routes */}
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route
              path="/employee/dashboard"
              element={
                <EmployeeRoute>
                  <EmployeeDashboard />
                </EmployeeRoute>
              }
            />
            <Route
              path="/employee/clients"
              element={
                <EmployeeRoute>
                  <EmployeeClients />
                </EmployeeRoute>
              }
            />
            <Route
              path="/employee/applications"
              element={
                <EmployeeRoute>
                  <EmployeeApplications />
                </EmployeeRoute>
              }
            />
            <Route
              path="/employee/new-application"
              element={
                <EmployeeRoute>
                  <EmployeeNewApplication />
                </EmployeeRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <EmployeeRoute>
                  <EmployeeProfile />
                </EmployeeRoute>
              }
            />
            <Route
              path="/employee/agents"
              element={
                <EmployeeRoute>
                  <EmployeeAgents />
                </EmployeeRoute>
              }
            />

            {/* Direct route for /agents to show EmployeeAgents page */}
            <Route path="/agents" element={<EmployeeAgents />} />

            {/* Client Routes */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/register" element={<ClientRegister />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/applications/:id" element={<ClientApplicationDetail />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route
              path="/client/applications"
              element={<ClientApplications />}
            />
            <Route
              path="/client/new-application"
              element={<ClientNewApplication />}
            />

            {/* Public Routes */}
            <Route path="/status" element={<StatusCheck />} />

            {/* Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;