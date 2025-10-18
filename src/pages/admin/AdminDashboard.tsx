// "use client"

// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, FileText, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
// import useSWR from "swr"
// import BASE_URL from "@/lib/BaseUrl"
// import { useNavigate } from "react-router-dom"

// const fetcher = async (url: string) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   })
//   if (!res.ok) {
//     const text = await res.text().catch(() => "")
//     throw new Error(text || "Failed to load dashboard data")
//   }
//   return res.json()
// }

// const AdminDashboard = () => {
//     const navigate = useNavigate()

//   const { data, error } = useSWR(`${BASE_URL || ""}/admin/public/data`, fetcher)

//   const clients = Array.isArray(data?.clients) ? data.clients : []
//   const applications = Array.isArray(data?.applications) ? data.applications : []

//   const statusCounts = applications.reduce((acc: Record<string, number>, a: any) => {
//     const s = (a?.status || "Processing") as string
//     acc[s] = (acc[s] || 0) + 1
//     return acc
//   }, {})

//   const stats = [
//     {
//       title: "Total Clients",
//       value: clients.length.toLocaleString(),
//       icon: Users,
//       change: "+0%",
//       color: "text-accent",
//     },
//     {
//       title: "Active Applications",
//       value: applications.length.toString(),
//       icon: FileText,
//       change: "+0%",
//       color: "text-primary",
//     },
//     {
//       title: "Expiring Visas",
//       value: String(statusCounts["Expired"] || 0),
//       icon: Clock,
//       change: "+0%",
//       color: "text-warning",
//     },
//     { title: "Revenue (AED)", value: "—", icon: DollarSign, change: "—", color: "text-success" },
//   ]
//  const handleAddemployee = () => {
//       navigate('/admin/employees')
//  }
//  const handleGenrateReport = () => {
//       navigate('/admin/reports')
//  }
//  const handleGenrateApplications = () => {
//       navigate('/admin/applications')
//  }
 
//   const applicationStats = [
//     { status: "Processing", count: statusCounts["Processing"] || 0, color: "bg-warning", icon: Clock },
//     { status: "Approved", count: statusCounts["Approved"] || 0, color: "bg-success", icon: CheckCircle },
//     { status: "Rejected", count: statusCounts["Rejected"] || 0, color: "bg-destructive", icon: XCircle },
//     { status: "Expired", count: statusCounts["Expired"] || 0, color: "bg-muted", icon: AlertTriangle },
//   ]

//   const recentApplications = [...applications]
//     .sort((a: any, b: any) => new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime())
//     .slice(0, 4)
//     .map((app: any) => ({
//       id: (app?._id || "").toString().slice(-6).toUpperCase() || "—",
//       client: app?.client?.name || "Unknown",
//       type: app?.type || "Application",
//       status: app?.status || "Processing",
//       date: app?.createdAt ? new Date(app.createdAt).toISOString().slice(0, 10) : "—",
//     }))

//   return (
//     <DashboardLayout userRole="admin" userName="Admin User">
//       <div className="space-y-6 sm:space-y-8">
//         <div className="text-center lg:text-left">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
//             Dashboard Overview
//           </h1>
//           <p className="text-muted-foreground text-base sm:text-lg mt-2">Monitor system performance and key metrics</p>
//           {error ? <p className="text-destructive mt-2 text-sm">Failed to load data</p> : null}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {stats.map((stat) => (
//             <Card
//               key={stat.title}
//               className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]"
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//                 <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
//                 <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 ${stat.color}`}>
//                   <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</div>
//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
//                     <TrendingUp className="h-3 w-3" />
//                     <span>{stat.change}</span>
//                   </div>
//                   <span className="text-xs text-muted-foreground hidden sm:inline">from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-semibold">Application Status</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {applicationStats.map((stat) => (
//                 <div
//                   key={stat.status}
//                   className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-4 h-4 rounded-full ${stat.color} shadow-lg`} />
//                     <span className="font-medium">{stat.status}</span>
//                   </div>
//                   <div className="bg-background/50 px-3 py-1 rounded-full">
//                     <span className="font-bold">{stat.count}</span>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-semibold">Performance Metrics</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
//                 <span className="font-medium">Approval Rate</span>
//                 <span className="font-bold text-success text-lg">
//                   {(() => {
//                     const total =
//                       (statusCounts["Approved"] || 0) +
//                       (statusCounts["Rejected"] || 0) +
//                       (statusCounts["Processing"] || 0) +
//                       (statusCounts["Expired"] || 0)
//                     const rate = total > 0 ? ((statusCounts["Approved"] || 0) / total) * 100 : 0
//                     return `${rate.toFixed(1)}%`
//                   })()}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
//                 <span className="font-medium">Avg. Processing Time</span>
//                 <span className="font-bold text-lg">—</span>
//               </div>
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
//                 <span className="font-medium">Customer Satisfaction</span>
//                 <span className="font-bold text-success text-lg">—</span>
//               </div>
//               <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
//                 <span className="font-medium">Active Employees</span>
//                 <span className="font-bold text-lg">—</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-200 border border-primary/20 hover:shadow-lg hover:transform hover:scale-[1.02]" onClick={handleAddemployee}>
//                 <div className="font-semibold text-primary">Add New Employee</div>
//                 <div className="text-sm text-muted-foreground mt-1">Create employee account</div>
//               </button>
//               <button onClick={handleGenrateReport} className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/20 transition-all duration-200 border border-accent/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
//                 <div className="font-semibold text-accent">Generate Report</div>
//                 <div className="text-sm text-muted-foreground mt-1">Monthly analytics report</div>
//               </button>
//               <button onClick={handleGenrateApplications} className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-warning/5 to-warning/10 hover:from-warning/10 hover:to-warning/20 transition-all duration-200 border border-warning/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
//                 <div className="font-semibold text-warning">Review Expiring Visas</div>
//                 <div className="text-sm text-muted-foreground mt-1">Check renewal alerts</div>
//               </button>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg sm:text-xl font-semibold">Recent Applications</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentApplications.map((app) => (
//                 <div
//                   key={app.id}
//                   className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01] space-y-3 sm:space-y-0"
//                 >
//                   <div className="flex items-center space-x-3 sm:space-x-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
//                       <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-base sm:text-lg">{app.client}</div>
//                       <div className="text-sm text-muted-foreground">
//                         {app.id} • {app.type}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
//                     <span
//                       className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full ${
//                         app.status === "Approved"
//                           ? "bg-success/10 text-success border border-success/20"
//                           : app.status === "Rejected"
//                             ? "bg-destructive/10 text-destructive border border-destructive/20"
//                             : "bg-warning/10 text-warning border border-warning/20"
//                       }`}
//                     >
//                       {app.status}
//                     </span>
//                     <span className="text-xs sm:text-sm text-muted-foreground bg-muted/20 px-2 sm:px-3 py-1 rounded-full">
//                       {app.date}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//               {!recentApplications.length && (
//                 <div className="text-sm text-muted-foreground">No recent applications to display.</div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default AdminDashboard




"use client"

import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import useSWR from "swr"
import BASE_URL from "@/lib/BaseUrl"
import { useNavigate } from "react-router-dom"

const fetcher = async (url: string) => {
  // debug: log URL so you can confirm exactly what is being requested
  console.log("[dashboard] fetcher request url:", url)

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  console.log("[dashboard] token present:", !!token)

  try {
    const res = await fetch(url, {
      method: "GET",
      // mode: "cors", // optional: uncomment if needed
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // If you use cookie-based auth for refresh tokens, enable credentials:
      // credentials: "include",
    })

    // network-level error
    if (!res) {
      throw new Error("No response from server")
    }

    // HTTP status check
    if (!res.ok) {
      // try to get text body (server error message)
      const text = await res.text().catch(() => "")
      const body = text || res.statusText || `HTTP ${res.status}`
      const msg = `Request failed ${res.status}: ${body}`
      console.error("[dashboard] fetcher error", msg)
      throw new Error(msg)
    }

    // parse json (safe)
    const json = await res.json().catch(() => {
      throw new Error("Failed to parse JSON from dashboard endpoint")
    })
    return json
  } catch (err: any) {
    // rethrow so SWR receives the error and your component shows the error
    console.error("[dashboard] fetcher caught", err && (err.stack || err.message || err))
    throw err
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate()

  // Build the URL explicitly so it's easy to inspect in logs.
  // If your backend uses a different path (e.g. /api/admin/public/data) update it here.
  const dashboardUrl = `${BASE_URL?.replace(/\/$/, "") || ""}/admin/public/data`
  const { data, error } = useSWR(dashboardUrl, fetcher)

  const clients = Array.isArray(data?.clients) ? data.clients : []
  const applications = Array.isArray(data?.applications) ? data.applications : []

  const statusCounts = applications.reduce((acc: Record<string, number>, a: any) => {
    const s = (a?.status || "Processing") as string
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const stats = [
    {
      title: "Total Clients",
      value: clients.length.toLocaleString(),
      icon: Users,
      change: "+0%",
      color: "text-accent",
    },
    {
      title: "Active Applications",
      value: applications.length.toString(),
      icon: FileText,
      change: "+0%",
      color: "text-primary",
    },
    {
      title: "Expiring Visas",
      value: String(statusCounts["Expired"] || 0),
      icon: Clock,
      change: "+0%",
      color: "text-warning",
    },
    { title: "Revenue (AED)", value: "—", icon: DollarSign, change: "—", color: "text-success" },
  ]
  const handleAddemployee = () => {
    navigate('/admin/employees')
  }
  const handleGenrateReport = () => {
    navigate('/admin/reports')
  }
  const handleGenrateApplications = () => {
    navigate('/admin/applications')
  }

  const applicationStats = [
    { status: "Processing", count: statusCounts["Processing"] || 0, color: "bg-warning", icon: Clock },
    { status: "Approved", count: statusCounts["Approved"] || 0, color: "bg-success", icon: CheckCircle },
    { status: "Rejected", count: statusCounts["Rejected"] || 0, color: "bg-destructive", icon: XCircle },
    { status: "Expired", count: statusCounts["Expired"] || 0, color: "bg-muted", icon: AlertTriangle },
  ]

  const recentApplications = [...applications]
    .sort((a: any, b: any) => new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime())
    .slice(0, 4)
    .map((app: any) => ({
      id: (app?._id || "").toString().slice(-6).toUpperCase() || "—",
      client: app?.client?.name || "Unknown",
      type: app?.type || "Application",
      status: app?.status || "Processing",
      date: app?.createdAt ? new Date(app.createdAt).toISOString().slice(0, 10) : "—",
    }))

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">Monitor system performance and key metrics</p>
          {error ? <p className="text-destructive mt-2 text-sm">Failed to load data</p> : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 ${stat.color}`}>
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationStats.map((stat) => (
                <div
                  key={stat.status}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${stat.color} shadow-lg`} />
                    <span className="font-medium">{stat.status}</span>
                  </div>
                  <div className="bg-background/50 px-3 py-1 rounded-full">
                    <span className="font-bold">{stat.count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
                <span className="font-medium">Approval Rate</span>
                <span className="font-bold text-success text-lg">
                  {(() => {
                    const total =
                      (statusCounts["Approved"] || 0) +
                      (statusCounts["Rejected"] || 0) +
                      (statusCounts["Processing"] || 0) +
                      (statusCounts["Expired"] || 0)
                    const rate = total > 0 ? ((statusCounts["Approved"] || 0) / total) * 100 : 0
                    return `${rate.toFixed(1)}%`
                  })()}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
                <span className="font-medium">Avg. Processing Time</span>
                <span className="font-bold text-lg">—</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="font-bold text-success text-lg">—</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
                <span className="font-medium">Active Employees</span>
                <span className="font-bold text-lg">—</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-200 border border-primary/20 hover:shadow-lg hover:transform hover:scale-[1.02]" onClick={handleAddemployee}>
                <div className="font-semibold text-primary">Add New Employee</div>
                <div className="text-sm text-muted-foreground mt-1">Create employee account</div>
              </button>
              <button onClick={handleGenrateReport} className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/20 transition-all duration-200 border border-accent/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="font-semibold text-accent">Generate Report</div>
                <div className="text-sm text-muted-foreground mt-1">Monthly analytics report</div>
              </button>
              <button onClick={handleGenrateApplications} className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-warning/5 to-warning/10 hover:from-warning/10 hover:to-warning/20 transition-all duration-200 border border-warning/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="font-semibold text-warning">Review Expiring Visas</div>
                <div className="text-sm text-muted-foreground mt-1">Check renewal alerts</div>
              </button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01] space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{app.client}</div>
                      <div className="text-sm text-muted-foreground">
                        {app.id} • {app.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                    <span
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full ${
                        app.status === "Approved"
                          ? "bg-success/10 text-success border border-success/20"
                          : app.status === "Rejected"
                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                            : "bg-warning/10 text-warning border border-warning/20"
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground bg-muted/20 px-2 sm:px-3 py-1 rounded-full">
                      {app.date}
                    </span>
                  </div>
                </div>
              ))}
              {!recentApplications.length && (
                <div className="text-sm text-muted-foreground">No recent applications to display.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
