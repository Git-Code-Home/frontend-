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

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import useSWR from "swr"
import BASE_URL from "@/lib/BaseUrl"
import { useNavigate } from "react-router-dom"
import api from "@/lib/api"

const fetcher = async (url: string) => {
  // debug: log URL so you can confirm exactly what is being requested
  console.log("[dashboard] fetcher request url:", url)

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  console.log("[dashboard] token present:", !!token)

  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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

  // Check if adminToken exists, redirect to login if not
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      console.warn("[dashboard] No adminToken found, redirecting to login")
      navigate("/admin/login")
    }
  }, [navigate])

  // Determine API root at runtime. If the compiled BASE_URL still points to
  // localhost while the app runs on a deployed host, override to the known
  // production backend. This is a last-resort fallback until you set the
  // Vercel environment variable and rebuild.
  let apiRoot = BASE_URL?.replace(/\/$/, "") || ""
  if (typeof window !== "undefined") {
    const host = window.location.hostname
    if (host && !/localhost|127\.0\.0\.1/.test(host) && /localhost|127\.0\.0\.1/.test(apiRoot)) {
      console.warn("[AdminDashboard] overriding apiRoot from localhost to production backend for runtime diagnostics")
      apiRoot = "https://sherry-backend.vercel.app"
    }
  }

  const dashboardUrl = `${apiRoot}/api/admin/clients`
  const { data, error } = useSWR(dashboardUrl, fetcher)

  // Diagnostics to help debug deployment/network issues. This runs only in the browser
  // and surfaces resolved BASE_URL and quick fetch/axios attempts so you can see
  // whether the frontend can reach the backend and what errors appear.
  const [diagnostics, setDiagnostics] = useState<{ baseUrl: string; fetchResult?: string; axiosResult?: string } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const run = async () => {
      const base = BASE_URL?.replace(/\/$/, "") || "(not set)"
      const results: any = { baseUrl: base }
      try {
        console.log("[diagnostics] attempting api.get to", dashboardUrl)
        // use the imported api instance (configured axios)
        const r = await api.get(dashboardUrl)
        results.axiosResult = `status:${r.status}`
        results.fetchResult = `status:${r.status} ok:${r.status >= 200 && r.status < 300}`
      } catch (err: any) {
        results.fetchResult = `fetch-error:${err && (err.message || String(err))}`
        results.axiosResult = `axios-error:${err && (err.message || String(err))}`
      }

      setDiagnostics(results)
    }
    run()
  }, [dashboardUrl])

  const clients = Array.isArray(data?.clients) ? data.clients : []
  const applications = Array.isArray(data?.applications) ? data.applications : []

  // Normalize status (some docs may have `status`, others `applicationStatus`)
  const normStatus = (app: any) => {
    const raw = (app?.applicationStatus || app?.status || "processing").toString().toLowerCase()
    switch (raw) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "pending":
        return "Pending"
      default:
        return "Processing"
    }
  }

  // Format document type labels for better readability
  const formatDocLabel = (docType: string) => {
    const labels: Record<string, string> = {
      passport: "Passport",
      photo: "Photo",
      idCard: "ID Card",
      birthCertificate: "Birth Certificate",
      bForm: "B-Form",
      passportFirstPage: "Passport First Page",
      passportCoverPage: "Passport Cover Page",
      paymentReceipt: "Payment Receipt"
    }
    return labels[docType] || docType.charAt(0).toUpperCase() + docType.slice(1)
  }

  const statusCounts = applications.reduce((acc: Record<string, number>, a: any) => {
    const s = normStatus(a)
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  // Expiring visas = applications with an expiryDate within next 30 days
  const expiringWithinDays = (days = 30) => {
    const now = Date.now()
    const ms = days * 24 * 60 * 60 * 1000
    return applications.filter((a: any) => {
      const exp = a?.expiryDate ? new Date(a.expiryDate).getTime() : NaN
      return Number.isFinite(exp) && exp - now <= ms && exp - now >= 0
    }).length
  }

  // Total revenue (AED) = sum of paid invoices
  const totalRevenue = applications.reduce((sum: number, a: any) => {
    const paid = a?.invoice?.paid
    const amt = Number(a?.invoice?.amount) || 0
    return sum + (paid ? amt : 0)
  }, 0)

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
      value: String(expiringWithinDays(30)),
      icon: Clock,
      change: "+0%",
      color: "text-warning",
    },
    { title: "Revenue (AED)", value: totalRevenue.toLocaleString(), icon: DollarSign, change: "—", color: "text-success" },
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
    { status: "Pending", count: statusCounts["Pending"] || 0, color: "bg-muted", icon: AlertTriangle },
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
          {error ? (
            <p className="text-destructive mt-2 text-sm">Failed to load data: {String((error as any)?.message || error)}</p>
          ) : null}
          {diagnostics ? (
            <div className="mt-3 text-sm bg-muted/10 p-3 rounded">
              <div className="font-medium">Connection diagnostics</div>
              <div className="mt-1">BASE_URL: <span className="font-mono">{diagnostics.baseUrl}</span></div>
              <div>Fetch: <span className="font-mono">{diagnostics.fetchResult}</span></div>
              <div>Axios: <span className="font-mono">{diagnostics.axiosResult}</span></div>
            </div>
          ) : null}
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

        {/* Client Documents Section */}
        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm mt-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Client Documents</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">All documents uploaded by employees for client applications</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {applications.map((app: any) => {
                // Filter valid documents (non-null, non-empty)
                const validDocs = app.documents ? 
                  Object.entries(app.documents).filter(([_, url]: [string, any]) => url && url.toString().trim() !== '') 
                  : [];
                
                if (validDocs.length === 0) return null;

                return (
                  <div key={app._id} className="border-b border-muted/30 pb-6 mb-6 last:border-b-0">
                    <div className="mb-3">
                      <div className="font-semibold text-base">
                        {app.client?.name || "Unknown Client"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Application ID: {app._id?.toString().slice(-6).toUpperCase()} • 
                        Visa Type: {app.visaType || "N/A"} • 
                        Status: {normStatus(app)}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {validDocs.map(([docType, docUrl]: [string, any]) => (
                        <div key={docType} className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 border border-muted/30 hover:shadow-lg transition-all">
                          <div className="flex items-center mb-3">
                            <FileText className="h-4 w-4 text-primary mr-2" />
                            <span className="font-medium">{formatDocLabel(docType)}</span>
                          </div>
                          <div className="flex gap-3">
                            <button
                              className="text-primary hover:text-primary/80 underline text-sm font-medium"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  const response = await fetch(docUrl.toString(), { 
                                    mode: 'cors',
                                    headers: {
                                      'Accept': '*/*'
                                    }
                                  });
                                  if (!response.ok) throw new Error('Failed to fetch file');
                                  const blob = await response.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  // Try to infer file extension from URL or response
                                  const urlStr = docUrl.toString();
                                  const ext = urlStr.split('.').pop()?.split('?')[0] || 'file';
                                  const clientName = (app.client?.name || 'client').replace(/\s+/g, '_');
                                  a.download = `${clientName}_${docType}.${ext}`;
                                  document.body.appendChild(a);
                                  a.click();
                                  setTimeout(() => {
                                    window.URL.revokeObjectURL(url);
                                    a.remove();
                                  }, 100);
                                } catch (err) {
                                  console.error('Download error:', err);
                                  alert('Download failed. The file might be protected or unavailable. Try opening in a new tab instead.');
                                }
                              }}
                            >
                              Download
                            </button>
                            <a
                              href={docUrl.toString()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground underline text-sm"
                            >
                              View
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {applications.filter((app: any) => {
                const validDocs = app.documents ? 
                  Object.entries(app.documents).filter(([_, url]: [string, any]) => url && url.toString().trim() !== '') 
                  : [];
                return validDocs.length > 0;
              }).length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No client documents uploaded yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Documents uploaded by employees will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
