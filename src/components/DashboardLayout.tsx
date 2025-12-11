// "use client"

// import type React from "react"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { LayoutDashboard, Users, FileText, Settings, LogOut, Menu, X, Shield, Bell, Wallet2, ArrowDownToLine } from "lucide-react"
// import BASE_URL from "@/lib/BaseUrl"

// interface DashboardLayoutProps {
//   children: React.ReactNode
//   userRole: "admin" | "employee" | "client" | "agent"
//   userName?: string
// }

// interface AdminProfile {
//   _id: string
//   name: string
//   email: string
//   role: string
//   createdAt: string
// }

// const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [profile, setProfile] = useState<AdminProfile | null>(null)
//   const location = useLocation()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (userRole === "employee") {
//           const employeeData = localStorage.getItem("employeeInfo")
//           if (employeeData) {
//             const parsedData = JSON.parse(employeeData)
//             setProfile({
//               _id: parsedData._id,
//               name: parsedData.name,
//               email: parsedData.email,
//               role: parsedData.designation || parsedData.role,
//               createdAt: "",
//             })
//           }
//           return
//         }
//         // </CHANGE>

//         const token = localStorage.getItem("adminToken")
//         if (!token) return

//         const { data } = await axios.get(`${BASE_URL}/admin/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         console.log("📌 Admin profile response:", data)

//         setProfile(data)
//       } catch (error) {
//         console.error("❌ Failed to fetch admin profile:", error)
//       }
//     }

//     fetchProfile()
//   }, [])

//   const handleLogout = () => {
//     if (userRole === "employee") {
//       localStorage.removeItem("employeeInfo")
//       navigate("/employee/login")
//     } else {
//       localStorage.removeItem("adminToken")
//       navigate("/admin/login")
//     }
//     // </CHANGE>
//   }

//  const navigationItems = {
//   admin: [
//     { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//     { name: "Employees", href: "/admin/employees", icon: Users },
//     { name: "Agents", href: "/admin/agents", icon: Users },
//     { name: "Clients", href: "/admin/clients", icon: Users },
//     { name: "Applications", href: "/admin/applications", icon: FileText },
//     { name: "Reports", href: "/admin/reports", icon: LayoutDashboard },
//     { name: "Settings", href: "/admin/settings", icon: Settings },

//   ],
//   employee: [
//     { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
//     { name: "My Clients", href: "/employee/clients", icon: Users },
//     { name: "My Agents", href: "/agents", icon: Users },
//     { name: "Applications", href: "/employee/applications", icon: FileText },
//     { name: "New Application", href: "/employee/new-application", icon: FileText },
//     { name: "Profile", href: "/employee/profile", icon: Settings },
//   ],
//   client: [
//     { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
//     { name: "My Applications", href: "/client/applications", icon: FileText },
//     { name: "New Application", href: "/client/new-application", icon: FileText },
//     { name: "Profile", href: "/client/profile", icon: Settings },
//   ],
//   agent: [
//     { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
//     { name: "My Clients", href: "/agent/clients", icon: Users },
//     { name: "Applications", href: "/agent/applications", icon: FileText },
//     { name: "Commissions", href: "/agent/commissions", icon: Wallet2 },
//     { name: "Withdrawals", href: "/agent/withdraw", icon: ArrowDownToLine },
//     { name: "Profile", href: "/agent/profile", icon: Settings },
//   ],
// }


//   const roleConfig = {
//     admin: { title: "Admin Portal", color: "text-destructive" },
//     employee: { title: "Employee Portal", color: "text-accent" },
//     client: { title: "Client Portal", color: "text-success" },
//         agent: { title: "Agent Portal", color: "text-destructive" },

//   }

//   const navItems = navigationItems[userRole]
//   const config = roleConfig[userRole]

//   const isActive = (href: string) => location.pathname === href

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
//       {/* Header */}
//       <header className="bg-card/80 backdrop-blur-sm border-b shadow-lg rounded-b-2xl mx-2 sm:mx-4 mt-2">
//         <div className="flex items-center justify-between px-3 sm:px-6 py-4">
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="lg:hidden rounded-xl hover:bg-muted/50"
//             >
//               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>

//             <div className="flex items-center space-x-2 sm:space-x-3">
//               <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ${config.color}`}>
//                 <Shield className="h-4 w-4 sm:h-6 sm:w-6" />
//               </div>
//               <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
//                 {config.title}
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <Button variant="ghost" size="sm" className="rounded-xl hover:bg-muted/50">
//               <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
//             </Button>
//             <div className="xs:block text-sm bg-muted/30 rounded-xl px-2 sm:px-4 py-2 relative z-50">
//               <p className="font-medium text-xs sm:text-sm">{profile?.name || "Loading..."}</p>
//               <p className="text-muted-foreground capitalize text-xs">{profile?.role || userRole}</p>
//               <p className="text-muted-foreground text-xs">{profile?.email}</p>
//             </div>

//             <Button
//               onClick={handleLogout}
//               variant="ghost"
//               size="sm"
//               className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
//             >
//               <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 relative">
//         {/* Sidebar */}
//         <aside
//           className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-card/95 backdrop-blur-sm border-r transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 pt-20 lg:pt-0`}
//         >
//           <div className="p-4 sm:p-6 lg:mt-6">
//             <nav className="space-y-2 sm:space-y-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all duration-200 group ${isActive(item.href) ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg transform scale-[1.02]" : "text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:shadow-md hover:transform hover:scale-[1.01]"}`}
//                 >
//                   <div
//                     className={`p-1.5 sm:p-2 rounded-xl transition-colors ${isActive(item.href) ? "bg-white/20" : "bg-muted/30 group-hover:bg-muted/50"}`}
//                   >
//                     <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
//                   </div>
//                   <span className="font-medium text-sm sm:text-base">{item.name}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 w-full lg:w-auto">
//           <div className="p-3 sm:p-6">
//             <div className="bg-card/30 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-xl border-0">{children}</div>
//           </div>
//         </main>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   )
// }

// export default DashboardLayout





"use client"

import type React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, FileText, Settings, LogOut, Menu, X, Shield, Bell, Wallet2, ArrowDownToLine } from "lucide-react"
import BASE_URL from "@/lib/BaseUrl"
import api from "@/lib/api"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "admin" | "employee" | "client" | "agent"
  userName?: string
}

interface AdminProfile {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userRole === "employee") {
          const employeeData = localStorage.getItem("employeeInfo")
          if (employeeData) {
            const parsedData = JSON.parse(employeeData)
            setProfile({
              _id: parsedData._id,
              name: parsedData.name,
              email: parsedData.email,
              role: parsedData.designation || parsedData.role,
              createdAt: "",
            })
          }
          return
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
        if (!token) return

        // Use axios baseURL and call the admin profile endpoint as a relative path.
        // axios.defaults.baseURL is set in App.tsx to the backend root.
        const { data } = await api.get(`/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(data)
      } catch (error) {
        console.error("❌ Failed to fetch admin profile:", error)
      }
    }

    fetchProfile()
  }, [userRole])

  const handleLogout = () => {
    if (userRole === "employee") {
      localStorage.removeItem("employeeInfo")
      navigate("/employee/login")
    } else {
      localStorage.removeItem("adminToken")
      navigate("/admin/login")
    }
  }

 const navigationItems = {
    admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/admin/employees", icon: Users },
    { name: "Agents", href: "/admin/agents", icon: Users },
    { name: "Commission", href: "/admin/commission", icon: Wallet2 },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Client Applications", href: "/admin/client-applications", icon: FileText },
    { name: "Applications", href: "/admin/applications", icon: FileText },
    { name: "Reports", href: "/admin/reports", icon: LayoutDashboard },
    { name: "Settings", href: "/admin/settings", icon: Settings },

  ],
  employee: [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Clients", href: "/employee/clients", icon: Users },
    { name: "My Agents", href: "/agents", icon: Users },
    { name: "Applications", href: "/employee/applications", icon: FileText },
    { name: "New Application", href: "/employee/new-application", icon: FileText },
    { name: "Profile", href: "/employee/profile", icon: Settings },
  ],
  client: [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "My Applications", href: "/client/applications", icon: FileText },
    { name: "New Application", href: "/client/new-application", icon: FileText },
    { name: "Profile", href: "/client/profile", icon: Settings },
  ],
  agent: [
    { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
    { name: "My Clients", href: "/agent/clients", icon: Users },
    { name: "Applications", href: "/agent/applications", icon: FileText },
    { name: "Commissions", href: "/agent/commissions", icon: Wallet2 },
    { name: "Profile", href: "/agent/profile", icon: Settings },
  ],
}


  const roleConfig = {
    admin: { title: "Admin Portal", color: "text-destructive" },
    employee: { title: "Employee Portal", color: "text-accent" },
    client: { title: "Client Portal", color: "text-success" },
        agent: { title: "Agent Portal", color: "text-destructive" },

  }

  const navItems = navigationItems[userRole]
  const config = roleConfig[userRole]

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-lg rounded-b-2xl mx-2 sm:mx-4 mt-2">
        <div className="flex items-center justify-between px-3 sm:px-6 py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden rounded-xl hover:bg-muted/50"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ${config.color}`}>
                <Shield className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {config.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-muted/50">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="xs:block text-sm bg-muted/30 rounded-xl px-2 sm:px-4 py-2 relative z-50">
              <p className="font-medium text-xs sm:text-sm">{profile?.name || "Loading..."}</p>
              <p className="text-muted-foreground capitalize text-xs">{profile?.role || userRole}</p>
              <p className="text-muted-foreground text-xs">{profile?.email}</p>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="rounded-xl hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-card/95 backdrop-blur-sm border-r transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 pt-20 lg:pt-0`}
        >
          <div className="p-4 sm:p-6 lg:mt-6">
            <nav className="space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl transition-all duration-200 group ${isActive(item.href) ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg transform scale-[1.02]" : "text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:shadow-md hover:transform hover:scale-[1.01]"}`}
                >
                  <div
                    className={`p-1.5 sm:p-2 rounded-xl transition-colors ${isActive(item.href) ? "bg-white/20" : "bg-muted/30 group-hover:bg-muted/50"}`}
                  >
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 w-full lg:w-auto">
          <div className="p-3 sm:p-6">
            <div className="bg-card/30 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-xl border-0">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout