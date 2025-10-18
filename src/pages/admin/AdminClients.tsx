



// "use client"

// import { useState, useEffect } from "react"
// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Search, Users, MapPin, Calendar, FileText, Phone, Mail, MoreHorizontal, Eye } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import BASE_URL from "@/lib/BaseUrl"

// interface Employee {
//   _id: string
//   name: string
//   email: string
// }

// interface Client {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   password?: string
//   reminders?: any[]
//   unqualified?: boolean
//   assignedTo?: Employee | string
//   createdAt: string
//   updatedAt: string
//   __v?: number
// }

// interface Application {
//   _id: string
//   client: Client
//   processedBy: Employee
//   visaType?: string
//   processingPriority?: string
//   applicationStatus?: string
//   invoice?: {
//     paid: boolean
//   }
//   documents?: {
//     idCard?: string
//     passport?: string
//     photo?: string
//   }
//   createdAt: string
//   updatedAt: string
//   __v?: number
// }

// interface ApiResponse {
//   clients: Client[]
//   applications: Application[]
// }

// const AdminClients = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [typeFilter, setTypeFilter] = useState("all")
//   const [clients, setClients] = useState<Client[]>([])
//   const [applications, setApplications] = useState<Application[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // modal & modal data state
//   const [detailsOpen, setDetailsOpen] = useState(false)
//   const [appsOpen, setAppsOpen] = useState(false)
//   const [reassignOpen, setReassignOpen] = useState(false)
//   const [activityOpen, setActivityOpen] = useState(false)

//   const [activeClientId, setActiveClientId] = useState<string | null>(null)
//   const [clientDetails, setClientDetails] = useState<Client | null>(null)
//   const [clientApplications, setClientApplications] = useState<Application[]>([])
//   const [clientActivity, setClientActivity] = useState<any[]>([])

//   // reassign state
//   const [employeesList, setEmployeesList] = useState<Employee[]>([])
//   const [agentsList, setAgentsList] = useState<Employee[]>([])
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
//   const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
//   const [reassignLoading, setReassignLoading] = useState(false)

//   const apiBase = BASE_URL.replace(/\/$/, "")

//   // common auth headers
//   const getAuthHeaders = () => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     }
//   }

//   // Fetch initial clients + applications
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const res = await fetch(`${apiBase}/api/admin/clients`, {
//           headers: getAuthHeaders(),
//         })

//         if (!res.ok) {
//           throw new Error(`Failed to fetch data: ${res.status}`)
//         }

//         const data: ApiResponse = await res.json()
//         setClients(Array.isArray(data.clients) ? data.clients : [])
//         setApplications(Array.isArray(data.applications) ? data.applications : [])
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         setError(err instanceof Error ? err.message : "An error occurred")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Helper functions (same logic as before)
//   const getAssignedEmployeeName = (client: Client): string => {
//     if (!client.assignedTo) return "Not assigned"

//     if (typeof client.assignedTo === "string") {
//       const application = applications.find((app) => app.processedBy?._id === client.assignedTo)
//       return application?.processedBy?.name || "Unknown Employee"
//     }

//     return (client.assignedTo as Employee).name
//   }

//   const getClientType = (client: Client): string => {
//     return client.unqualified ? "Unqualified" : "Qualified"
//   }

//   const getClientStatus = (client: Client): string => {
//     const clientApplications = applications.filter((app) => app.client._id === client._id)
//     if (clientApplications.length === 0) return "Pending"
//     const hasActiveApplications = clientApplications.some((app) =>
//       app.applicationStatus === "processing" || app.applicationStatus === "submitted",
//     )
//     return hasActiveApplications ? "Active" : "Inactive"
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Active":
//         return "bg-success text-success-foreground"
//       case "Pending":
//         return "bg-warning text-warning-foreground"
//       case "Inactive":
//         return "bg-muted text-muted-foreground"
//       default:
//         return "bg-muted text-muted-foreground"
//     }
//   }

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case "Qualified":
//         return "bg-accent text-accent-foreground"
//       case "Unqualified":
//         return "bg-destructive/10 text-destructive"
//       default:
//         return "bg-muted text-muted-foreground"
//     }
//   }

//   const totalApplications = applications.length
//   const getClientApplicationsCount = (clientId: string) => {
//     return applications.filter((app) => app.client?._id === clientId).length
//   }

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "Invalid Date"
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const filteredClients = clients.filter((client) => {
//     const clientType = getClientType(client)
//     const clientStatus = getClientStatus(client)

//     const matchesSearch =
//       client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       getAssignedEmployeeName(client).toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesStatus = statusFilter === "all" || clientStatus.toLowerCase() === statusFilter
//     const matchesType = typeFilter === "all" || clientType.toLowerCase() === typeFilter

//     return matchesSearch && matchesStatus && matchesType
//   })

//   // ----- Action handlers for the menu items -----

//   // View Details
//   const onViewDetails = async (clientId: string) => {
//     setActiveClientId(clientId)
//     setClientDetails(null)
//     setDetailsOpen(true)
//     try {
//       const res = await fetch(`${apiBase}/api/admin/clients/${clientId}`, { headers: getAuthHeaders() })
//       if (!res.ok) throw new Error(`Failed to load client (${res.status})`)
//       const body = await res.json()
//       setClientDetails(body)
//     } catch (err) {
//       console.error("Failed to load client details:", err)
//       setClientDetails(null)
//     }
//   }

//   // View Applications
//   const onViewApplications = async (clientId: string) => {
//     setActiveClientId(clientId)
//     setClientApplications([])
//     setAppsOpen(true)
//     try {
//       const res = await fetch(`${apiBase}/api/admin/clients/${clientId}/applications`, { headers: getAuthHeaders() })
//       if (!res.ok) throw new Error(`Failed to load applications (${res.status})`)
//       const body = await res.json()
//       const list = Array.isArray(body) ? body : body.applications || []
//       setClientApplications(list)
//     } catch (err) {
//       console.error("Failed to load client applications:", err)
//       setClientApplications([])
//     }
//   }

//   // Reassign (open and load employees/agents)
//   const onOpenReassign = async (clientId: string) => {
//     setActiveClientId(clientId)
//     setReassignOpen(true)
//     setEmployeesList([])
//     setAgentsList([])
//     try {
//       // Employees under admin routes
//       const [eRes, aRes] = await Promise.all([
//         fetch(`${apiBase}/api/admin/employees`, { headers: getAuthHeaders() }),
//         fetch(`${apiBase}/api/public/agents`, { headers: getAuthHeaders() }), // adjust if needed
//       ])
//       const eBody = await eRes.json().catch(() => [])
//       const aBody = await aRes.json().catch(() => [])
//       const eList = Array.isArray(eBody) ? eBody : eBody.employees || []
//       const aList = Array.isArray(aBody) ? aBody : aBody.agents || []
//       setEmployeesList(eList)
//       setAgentsList(aList)
//     } catch (err) {
//       console.error("Failed to load employees/agents:", err)
//       setEmployeesList([])
//       setAgentsList([])
//     }
//   }

//   const submitReassign = async () => {
//     if (!activeClientId) return
//     setReassignLoading(true)
//     try {
//       const body = {
//         employeeId: selectedEmployeeId,
//         agentId: selectedAgentId,
//       }
//       const res = await fetch(`${apiBase}/api/admin/clients/${activeClientId}/reassign`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(body),
//       })
//       const resp = await res.json().catch(() => null)
//       if (!res.ok) throw new Error(resp?.message || `Failed to reassign (${res.status})`)
//       // close modal and refresh clients list
//       setReassignOpen(false)
//       // re-fetch clients (simple approach)
//       // you can extract fetch logic into function to avoid duplication
//       const refreshRes = await fetch(`${apiBase}/api/admin/public/data`, { headers: getAuthHeaders() })
//       if (refreshRes.ok) {
//         const data = await refreshRes.json()
//         setClients(Array.isArray(data.clients) ? data.clients : [])
//         setApplications(Array.isArray(data.applications) ? data.applications : [])
//       }
//     } catch (err: any) {
//       console.error("Reassign failed:", err)
//       alert(err?.message || "Reassign failed")
//     } finally {
//       setReassignLoading(false)
//       setSelectedEmployeeId(null)
//       setSelectedAgentId(null)
//     }
//   }

//   // Activity history
//   const onViewActivity = async (clientId: string) => {
//     setActiveClientId(clientId)
//     setClientActivity([])
//     setActivityOpen(true)
//     try {
//       const res = await fetch(`${apiBase}/api/admin/clients/${clientId}/activity`, { headers: getAuthHeaders() })
//       if (!res.ok) throw new Error(`Failed to load activity (${res.status})`)
//       const body = await res.json()
//       setClientActivity(Array.isArray(body) ? body : body.activity || [])
//     } catch (err) {
//       console.error("Failed to load activity:", err)
//       setClientActivity([])
//     }
//   }

//   // ----- Rendering -----
//   if (loading) {
//     return (
//       <DashboardLayout userRole="admin" userName="Admin User">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg">Loading clients and applications...</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (error) {
//     return (
//       <DashboardLayout userRole="admin" userName="Admin User">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg text-destructive">Error: {error}</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout userRole="admin" userName="Admin User">
//       <div className="space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Client Management</h1>
//           <p className="text-sm sm:text-base text-muted-foreground">Manage all registered and unregistered clients</p>
//         </div>

//         {/* Search & filters (unchanged) */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="lg:col-span-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search clients..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
//               />
//             </div>
//           </div>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={typeFilter} onValueChange={setTypeFilter}>
//             <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
//               <SelectValue placeholder="Filter by type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="qualified">Qualified</SelectItem>
//               <SelectItem value="unqualified">Unqualified</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Total Clients</CardTitle>
//               <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
//                 <Users className="h-4 w-4 text-accent" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl sm:text-3xl font-bold">{clients.length}</div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Qualified</CardTitle>
//               <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
//                 <Users className="h-4 w-4 text-success" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl sm:text-3xl font-bold">{clients.filter((c) => !c.unqualified).length}</div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Active</CardTitle>
//               <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
//                 <Users className="h-4 w-4 text-primary" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl sm:text-3xl font-bold">{clients.filter((c) => getClientStatus(c) === "Active").length}</div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Total Applications</CardTitle>
//               <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
//                 <FileText className="h-4 w-4 text-warning" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl sm:text-3xl font-bold">{totalApplications}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Client List */}
//         <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-lg sm:text-xl font-semibold">Client Directory</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredClients.length === 0 ? (
//                 <div className="text-center py-8 text-muted-foreground">No clients found matching your criteria.</div>
//               ) : (
//                 filteredClients.map((client) => {
//                   const clientType = getClientType(client)
//                   const clientStatus = getClientStatus(client)
//                   const assignedEmployee = getAssignedEmployeeName(client)
//                   const applicationsCount = getClientApplicationsCount(client._id)

//                   return (
//                     <div
//                       key={client._id}
//                       className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01]"
//                     >
//                       <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-4 xl:space-y-0">
//                         <div className="flex items-center space-x-3 sm:space-x-4">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
//                             <span className="text-primary font-semibold text-sm sm:text-base">
//                               {client.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")}
//                             </span>
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
//                               <h3 className="font-semibold text-base sm:text-lg">{client.name}</h3>
//                               <div className="flex flex-wrap gap-2">
//                                 <Badge className={`${getStatusColor(clientStatus)} rounded-full px-3 py-1 w-fit`}>{clientStatus}</Badge>
//                                 <Badge className={`${getTypeColor(clientType)} rounded-full px-3 py-1 w-fit`}>{clientType}</Badge>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-muted-foreground">
//                               <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
//                                 <Mail className="mr-1 h-3 w-3" />
//                                 <span className="truncate">{client.email}</span>
//                               </div>
//                               <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
//                                 <Phone className="mr-1 h-3 w-3" />
//                                 {client.phone}
//                               </div>
//                               <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
//                                 <Calendar className="mr-1 h-3 w-3" />
//                                 Joined: {formatDate(client.createdAt)}
//                               </div>
//                               <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
//                                 <Users className="mr-1 h-3 w-3" />
//                                 <span className="truncate">Assigned to: {assignedEmployee}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center justify-between xl:justify-end space-x-4 xl:space-x-6">
//                           <div className="flex items-center space-x-3 sm:space-x-4">
//                             <div className="text-center bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
//                               <div className="text-base sm:text-lg font-bold text-primary">{applicationsCount}</div>
//                               <div className="text-xs text-muted-foreground">Applications</div>
//                             </div>
//                             <div className="text-center bg-muted/20 px-3 sm:px-4 py-2 rounded-2xl">
//                               <div className="text-sm font-medium">{formatDate(client.updatedAt)}</div>
//                               <div className="text-xs text-muted-foreground">Last Updated</div>
//                             </div>
//                           </div>

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-muted/20">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem onClick={() => onViewDetails(client._id)}>
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => onViewApplications(client._id)}>
//                                 <FileText className="mr-2 h-4 w-4" />
//                                 View Applications
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => onOpenReassign(client._id)}>
//                                 <Users className="mr-2 h-4 w-4" />
//                                 Reassign Employee
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => onViewActivity(client._id)}>
//                                 <Calendar className="mr-2 h-4 w-4" />
//                                 Activity History
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Modals */}

//         {/* Client Details Modal */}
//         <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//           <DialogContent className="sm:max-w-xl">
//             <DialogHeader>
//               <DialogTitle>Client Details</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-3">
//               {!clientDetails ? (
//                 <p>Loading details...</p>
//               ) : (
//                 <div className="grid grid-cols-1 gap-2">
//                   <div>
//                     <div className="text-sm text-muted-foreground">Name</div>
//                     <div className="font-medium">{clientDetails.name}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Email</div>
//                     <div className="font-medium">{clientDetails.email}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Phone</div>
//                     <div className="font-medium">{clientDetails.phone}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Assigned To</div>
//                     <div className="font-medium">{getAssignedEmployeeName(clientDetails)}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-muted-foreground">Joined</div>
//                     <div className="font-medium">{formatDate(clientDetails.createdAt)}</div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <DialogFooter>
//               <Button onClick={() => setDetailsOpen(false)}>Close</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Applications Modal */}
//         <Dialog open={appsOpen} onOpenChange={setAppsOpen}>
//           <DialogContent className="sm:max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Client Applications</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-2">
//               {clientApplications.length === 0 ? (
//                 <p>No applications found for this client.</p>
//               ) : (
//                 clientApplications.map((app) => (
//                   <div key={app._id} className="p-3 border rounded-md">
//                     <div className="flex justify-between">
//                       <div>
//                         <div className="font-medium">{app.visaType || "Application"}</div>
//                         <div className="text-sm text-muted-foreground">{app.applicationStatus || "—"}</div>
//                       </div>
//                       <div className="text-sm text-muted-foreground">{formatDate(app.createdAt)}</div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <DialogFooter>
//               <Button onClick={() => setAppsOpen(false)}>Close</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Reassign Modal */}
//         <Dialog open={reassignOpen} onOpenChange={setReassignOpen}>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Reassign Client</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-3">
//               <label className="text-sm text-muted-foreground">Assign to Employee</label>
//               <Select value={selectedEmployeeId || ""} onValueChange={(v) => setSelectedEmployeeId(v || null)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select employee" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {employeesList.length === 0 ? (
//                     <SelectItem value="">No employees</SelectItem>
//                   ) : (
//                     employeesList.map((emp) => (
//                       <SelectItem key={emp._id} value={emp._id}>
//                         {emp.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>

//               <label className="text-sm text-muted-foreground">Or assign to Agent</label>
//               <Select value={selectedAgentId || ""} onValueChange={(v) => setSelectedAgentId(v || null)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select agent" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {agentsList.length === 0 ? (
//                     <SelectItem value="">No agents</SelectItem>
//                   ) : (
//                     agentsList.map((a) => (
//                       <SelectItem key={a._id} value={a._id}>
//                         {a.name}
//                       </SelectItem>
//                     ))
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setReassignOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={submitReassign} disabled={reassignLoading}>
//                 {reassignLoading ? "Reassigning..." : "Reassign"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Activity Modal */}
//         <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
//           <DialogContent className="sm:max-w-lg">
//             <DialogHeader>
//               <DialogTitle>Activity History</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-2">
//               {clientActivity.length === 0 ? (
//                 <p>No activity recorded for this client.</p>
//               ) : (
//                 clientActivity.map((act, idx) => (
//                   <div key={idx} className="p-2 border-b">
//                     <div className="font-medium">{act.action || act.type || "Action"}</div>
//                     <div className="text-sm text-muted-foreground">{act.message || act.details}</div>
//                     <div className="text-xs text-muted">{act.createdAt ? new Date(act.createdAt).toLocaleString() : ""}</div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <DialogFooter>
//               <Button onClick={() => setActivityOpen(false)}>Close</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default AdminClients



"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Calendar, FileText, Phone, Mail, MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BASE_URL from "@/lib/BaseUrl"

interface Employee {
  _id: string
  name: string
  email: string
}

interface Client {
  _id: string
  name: string
  email: string
  phone: string
  password?: string
  reminders?: any[]
  unqualified?: boolean
  assignedTo?: Employee | string
  createdAt: string
  updatedAt: string
  __v?: number
}

interface Application {
  _id: string
  client: Client
  processedBy: Employee
  visaType?: string
  processingPriority?: string
  applicationStatus?: string
  invoice?: {
    paid: boolean
  }
  documents?: {
    idCard?: string
    passport?: string
    photo?: string
  }
  createdAt: string
  updatedAt: string
  __v?: number
}

interface ApiResponse {
  clients: Client[]
  applications: Application[]
}

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [clients, setClients] = useState<Client[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // modal & modal data state
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [appsOpen, setAppsOpen] = useState(false)
  const [reassignOpen, setReassignOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)

  const [activeClientId, setActiveClientId] = useState<string | null>(null)
  const [clientDetails, setClientDetails] = useState<Client | null>(null)
  const [clientApplications, setClientApplications] = useState<Application[]>([])
  const [clientActivity, setClientActivity] = useState<any[]>([])

  // reassign state
  const [employeesList, setEmployeesList] = useState<Employee[]>([])
  const [agentsList, setAgentsList] = useState<Employee[]>([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [reassignLoading, setReassignLoading] = useState(false)

  const apiBase = BASE_URL.replace(/\/$/, "")

  // common auth headers
  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  // Fetch initial clients + applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${apiBase}/api/admin/clients`, {
          headers: getAuthHeaders(),
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`)
        }

        const data: ApiResponse = await res.json()
        setClients(Array.isArray(data.clients) ? data.clients : [])
        setApplications(Array.isArray(data.applications) ? data.applications : [])
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Helper functions
  const getAssignedEmployeeName = (client: Client): string => {
    if (!client.assignedTo) return "Not assigned"
    if (typeof client.assignedTo === "string") {
      const application = applications.find((app) => app.processedBy?._id === client.assignedTo)
      return application?.processedBy?.name || "Unknown Employee"
    }
    return (client.assignedTo as Employee).name
  }

  const getClientType = (client: Client): string => {
    return client.unqualified ? "Unqualified" : "Qualified"
  }

  const getClientStatus = (client: Client): string => {
    const clientApplications = applications.filter((app) => app.client._id === client._id)
    if (clientApplications.length === 0) return "Pending"
    const hasActiveApplications = clientApplications.some((app) =>
      app.applicationStatus === "processing" || app.applicationStatus === "submitted",
    )
    return hasActiveApplications ? "Active" : "Inactive"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground"
      case "Pending":
        return "bg-warning text-warning-foreground"
      case "Inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Qualified":
        return "bg-accent text-accent-foreground"
      case "Unqualified":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const totalApplications = applications.length
  const getClientApplicationsCount = (clientId: string) => {
    return applications.filter((app) => app.client?._id === clientId).length
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredClients = clients.filter((client) => {
    const clientType = getClientType(client)
    const clientStatus = getClientStatus(client)

    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getAssignedEmployeeName(client).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || clientStatus.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || clientType.toLowerCase() === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // ----- Action handlers for the menu items -----

  // View Details
  const onViewDetails = async (clientId: string) => {
    setActiveClientId(clientId)
    setClientDetails(null)
    setDetailsOpen(true)
    try {
      const res = await fetch(`${apiBase}/api/admin/clients/${clientId}`, { headers: getAuthHeaders() })
      if (!res.ok) throw new Error(`Failed to load client (${res.status})`)
      const body = await res.json()
      setClientDetails(body)
    } catch (err) {
      console.error("Failed to load client details:", err)
      setClientDetails(null)
    }
  }

  // View Applications
  const onViewApplications = async (clientId: string) => {
    setActiveClientId(clientId)
    setClientApplications([])
    setAppsOpen(true)
    try {
      const res = await fetch(`${apiBase}/api/admin/clients/${clientId}/applications`, { headers: getAuthHeaders() })
      if (!res.ok) throw new Error(`Failed to load applications (${res.status})`)
      const body = await res.json()
      const list = Array.isArray(body) ? body : body.applications || []
      setClientApplications(list)
    } catch (err) {
      console.error("Failed to load client applications:", err)
      setClientApplications([])
    }
  }

  // Reassign (open and load employees/agents)
  const onOpenReassign = async (clientId: string) => {
    setActiveClientId(clientId)
    setEmployeesList([])
    setAgentsList([])
    setReassignOpen(true)
    try {
      const [eRes, aRes] = await Promise.all([
        fetch(`${apiBase}/api/admin/employees`, { headers: getAuthHeaders() }),
        fetch(`${apiBase}/api/public/agents`, { headers: getAuthHeaders() }),
      ])
      const eBody = await eRes.json().catch(() => [])
      const aBody = await aRes.json().catch(() => [])
      const eList = Array.isArray(eBody) ? eBody : eBody.employees || []
      const aList = Array.isArray(aBody) ? aBody : aBody.agents || []
      setEmployeesList(eList)
      setAgentsList(aList)
      if (eList.length === 0 && aList.length === 0) {
        alert("No employees or agents found. Please check your backend endpoints.")
        setReassignOpen(false)
      }
    } catch (err) {
      console.error("Failed to load employees/agents:", err)
      alert("Failed to load employees/agents. Please check your backend.")
      setReassignOpen(false)
    }
  }

  const submitReassign = async () => {
    if (!activeClientId) return
    setReassignLoading(true)
    try {
      const body = {
        employeeId: selectedEmployeeId,
        agentId: selectedAgentId,
      }
      const res = await fetch(`${apiBase}/api/admin/clients/${activeClientId}/reassign`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      })
      const resp = await res.json().catch(() => null)
      if (!res.ok) throw new Error(resp?.message || `Failed to reassign (${res.status})`)
      setReassignOpen(false)
      const refreshRes = await fetch(`${apiBase}/api/admin/public/data`, { headers: getAuthHeaders() })
      if (refreshRes.ok) {
        const data = await refreshRes.json()
        setClients(Array.isArray(data.clients) ? data.clients : [])
        setApplications(Array.isArray(data.applications) ? data.applications : [])
      }
    } catch (err: any) {
      console.error("Reassign failed:", err)
      alert(err?.message || "Reassign failed")
    } finally {
      setReassignLoading(false)
      setSelectedEmployeeId(null)
      setSelectedAgentId(null)
    }
  }

  // Activity history
  const onViewActivity = async (clientId: string) => {
    setActiveClientId(clientId)
    setClientActivity([])
    setActivityOpen(true)
    try {
      const res = await fetch(`${apiBase}/api/admin/clients/${clientId}/activity`, { headers: getAuthHeaders() })
      if (!res.ok) throw new Error(`Failed to load activity (${res.status})`)
      const body = await res.json()
      setClientActivity(Array.isArray(body) ? body : body.activity || [])
    } catch (err) {
      console.error("Failed to load activity:", err)
      setClientActivity([])
    }
  }

  // ----- Rendering -----
  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading clients and applications...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-destructive">Error: {error}</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Client Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage all registered and unregistered clients</p>
        </div>

        {/* Search & filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="unqualified">Unqualified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Total Clients</CardTitle>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <Users className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Qualified</CardTitle>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <Users className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{clients.filter((c) => !c.unqualified).length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Active</CardTitle>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{clients.filter((c) => getClientStatus(c) === "Active").length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Total Applications</CardTitle>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10">
                <FileText className="h-4 w-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No clients found matching your criteria.</div>
              ) : (
                filteredClients.map((client) => {
                  const clientType = getClientType(client)
                  const clientStatus = getClientStatus(client)
                  const assignedEmployee = getAssignedEmployeeName(client)
                  const applicationsCount = getClientApplicationsCount(client._id)

                  return (
                    <div
                      key={client._id}
                      className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01]"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-4 xl:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm sm:text-base">
                              {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                              <h3 className="font-semibold text-base sm:text-lg">{client.name}</h3>
                              <div className="flex flex-wrap gap-2">
                                <Badge className={`${getStatusColor(clientStatus)} rounded-full px-3 py-1 w-fit`}>{clientStatus}</Badge>
                                <Badge className={`${getTypeColor(clientType)} rounded-full px-3 py-1 w-fit`}>{clientType}</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Mail className="mr-1 h-3 w-3" />
                                <span className="truncate">{client.email}</span>
                              </div>
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Phone className="mr-1 h-3 w-3" />
                                {client.phone}
                              </div>
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Calendar className="mr-1 h-3 w-3" />
                                Joined: {formatDate(client.createdAt)}
                              </div>
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Users className="mr-1 h-3 w-3" />
                                <span className="truncate">Assigned to: {assignedEmployee}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between xl:justify-end space-x-4 xl:space-x-6">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="text-center bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
                              <div className="text-base sm:text-lg font-bold text-primary">{applicationsCount}</div>
                              <div className="text-xs text-muted-foreground">Applications</div>
                            </div>
                            <div className="text-center bg-muted/20 px-3 sm:px-4 py-2 rounded-2xl">
                              <div className="text-sm font-medium">{formatDate(client.updatedAt)}</div>
                              <div className="text-xs text-muted-foreground">Last Updated</div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-muted/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onViewDetails(client._id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onViewApplications(client._id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Applications
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onOpenReassign(client._id)}>
                                <Users className="mr-2 h-4 w-4" />
                                Reassign Employee
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onViewActivity(client._id)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Activity History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}

        {/* Client Details Modal */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {!clientDetails ? (
                <p>Loading details...</p>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{clientDetails.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{clientDetails.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{clientDetails.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned To</div>
                    <div className="font-medium">{getAssignedEmployeeName(clientDetails)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Joined</div>
                    <div className="font-medium">{formatDate(clientDetails.createdAt)}</div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Applications Modal */}
        <Dialog open={appsOpen} onOpenChange={setAppsOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Client Applications</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {clientApplications.length === 0 ? (
                <p>No applications found for this client.</p>
              ) : (
                clientApplications.map((app) => (
                  <div key={app._id} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{app.visaType || "Application"}</div>
                        <div className="text-sm text-muted-foreground">{app.applicationStatus || "—"}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{formatDate(app.createdAt)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setAppsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reassign Modal */}
        <Dialog open={reassignOpen} onOpenChange={setReassignOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Reassign Client</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <label className="text-sm text-muted-foreground">Assign to Employee</label>
              {employeesList.length === 0 ? (
                <div className="text-muted-foreground text-sm">No employees found.</div>
              ) : (
                <Select value={selectedEmployeeId || ""} onValueChange={(v) => setSelectedEmployeeId(v || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeesList.map((emp) => (
                      <SelectItem key={emp._id} value={emp._id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <label className="text-sm text-muted-foreground">Or assign to Agent</label>
              {agentsList.length === 0 ? (
                <div className="text-muted-foreground text-sm">No agents found.</div>
              ) : (
                <Select value={selectedAgentId || ""} onValueChange={(v) => setSelectedAgentId(v || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentsList.map((a) => (
                      <SelectItem key={a._id} value={a._id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReassignOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitReassign} disabled={reassignLoading}>
                {reassignLoading ? "Reassigning..." : "Reassign"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Activity Modal */}
        <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Activity History</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {clientActivity.length === 0 ? (
                <p>No activity recorded for this client.</p>
              ) : (
                clientActivity.map((act, idx) => (
                  <div key={idx} className="p-2 border-b">
                    <div className="font-medium">{act.action || act.type || "Action"}</div>
                    <div className="text-sm text-muted-foreground">{act.message || act.details}</div>
                    <div className="text-xs text-muted">{act.createdAt ? new Date(act.createdAt).toLocaleString() : ""}</div>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setActivityOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default AdminClients