// "use client"

// import { useEffect, useMemo, useState } from "react"
// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//   Search,
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   Eye,
//   Edit,
//   Download,
//   MoreHorizontal,
//   User,
// } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import {
//   type Application,
//   getMyApplications,
//   updateApplicationDetails,
//   updateApplicationStatus,
//   uploadApplicationDocuments,
//   buildDocumentsFormData,
// } from "@/lib/agent"

// const AgentApplication = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [typeFilter, setTypeFilter] = useState("all")
//   const [applications, setApplications] = useState<Application[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // edit modal state
//   const [open, setOpen] = useState(false)
//   const [editing, setEditing] = useState<Application | null>(null)
//   const [visaType, setVisaType] = useState("")
//   const [status, setStatus] = useState<Application["applicationStatus"]>("processing")
//   const [issueDate, setIssueDate] = useState("")
//   const [expiryDate, setExpiryDate] = useState("")

//   // upload dialog state
//   const [uploadOpen, setUploadOpen] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [uploadApp, setUploadApp] = useState<Application | null>(null)
//   const [passportFile, setPassportFile] = useState<File | undefined>()
//   const [photoFile, setPhotoFile] = useState<File | undefined>()
//   const [idCardFile, setIdCardFile] = useState<File | undefined>()

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true)
//         const a = await getMyApplications()
//         setApplications(a)
//         setError(null)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load applications")
//       } finally {
//         setLoading(false)
//       }
//     }
//     load()
//   }, [])

//   const refresh = async () => {
//     try {
//       const a = await getMyApplications()
//       setApplications(a)
//     } catch {}
//   }

//   const getDisplayStatus = (s: string): string => {
//     switch (s) {
//       case "processing":
//         return "Processing"
//       case "submitted":
//         return "Under Review"
//       case "approved":
//         return "Approved"
//       case "rejected":
//         return "Rejected"
//       case "documents-required":
//         return "Documents Required"
//       default:
//         return "Processing"
//     }
//   }

//   const getPriorityDisplay = (p?: string) => (p === "high" ? "High" : p === "low" ? "Low" : "Normal")

//   const getStatusColor = (s: string) => {
//     const d = getDisplayStatus(s)
//     switch (d) {
//       case "Approved":
//         return "bg-success text-success-foreground"
//       case "Processing":
//         return "bg-warning text-warning-foreground"
//       case "Under Review":
//         return "bg-accent text-accent-foreground"
//       case "Documents Required":
//         return "bg-destructive text-destructive-foreground"
//       case "Rejected":
//         return "bg-muted text-muted-foreground"
//       default:
//         return "bg-muted text-muted-foreground"
//     }
//   }

//   const getUrgencyColor = (p?: string) =>
//     p === "high" ? "text-destructive" : p === "low" ? "text-muted-foreground" : "text-warning"
//   const getPaymentStatusColor = (paid?: boolean) =>
//     paid ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
//   const getPaymentStatusText = (paid?: boolean) => (paid ? "Paid" : "Pending")

//   const formatDate = (d: string) =>
//     new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
//   const getProcessingDays = (createdAt: string) => {
//     const created = new Date(createdAt)
//     const now = new Date()
//     const diffTime = Math.abs(now.getTime() - created.getTime())
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//   }

//   const filtered = useMemo(() => {
//     return applications.filter((app) => {
//       const displayStatus = getDisplayStatus(app.applicationStatus)
//       const searchLower = searchTerm.toLowerCase()
//       const matchesSearch =
//         app.client?.name?.toLowerCase().includes(searchLower) ||
//         app._id.toLowerCase().includes(searchLower) ||
//         app.visaType.toLowerCase().includes(searchLower) ||
//         (typeof app.processedBy === "object" ? app.processedBy?.name?.toLowerCase().includes(searchLower) : false)
//       const matchesStatus = statusFilter === "all" || displayStatus.toLowerCase().replace(" ", "-") === statusFilter
//       const matchesType = typeFilter === "all" || app.visaType.toLowerCase().includes(typeFilter)
//       return matchesSearch && matchesStatus && matchesType
//     })
//   }, [applications, searchTerm, statusFilter, typeFilter])

//   // Stats
//   const totalApplications = applications.length
//   const processingApplications = applications.filter(
//     (a) => a.applicationStatus === "processing" || a.applicationStatus === "submitted",
//   ).length
//   const approvedApplications = applications.filter((a) => a.applicationStatus === "approved").length
//   const actionRequiredApplications = applications.filter((a) => a.applicationStatus === "documents-required").length
//   const rejectedApplications = applications.filter((a) => a.applicationStatus === "rejected").length

//   const openEdit = (app: Application) => {
//     setEditing(app)
//     setVisaType(app.visaType || "")
//     setStatus(app.applicationStatus || "processing")
//     setIssueDate(app.issueDate ? app.issueDate.slice(0, 10) : "")
//     setExpiryDate(app.expiryDate ? app.expiryDate.slice(0, 10) : "")
//     setOpen(true)
//   }

//   const submitEdit = async () => {
//     if (!editing) return
//     try {
//       await updateApplicationDetails(editing._id, {
//         visaType: visaType || undefined,
//         issueDate: issueDate || undefined,
//         expiryDate: expiryDate || undefined,
//       })
//       // also sync status if changed
//       if (status && status !== editing.applicationStatus) {
//         await updateApplicationStatus(editing._id, status)
//       }
//       setOpen(false)
//       await refresh()
//     } catch (e) {
//       console.error("[v0] failed to update application", e)
//       // consider adding toast
//     }
//   }

//   const changeStatus = async (app: Application, next: Application["applicationStatus"]) => {
//     try {
//       await updateApplicationStatus(app._id, next)
//       await refresh()
//     } catch (e) {
//       console.error("[v0] failed to change status", e)
//     }
//   }

//   if (loading) {
//     return (
//       <DashboardLayout userRole="admin" userName="Admin User">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg">Loading applications...</div>
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
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
//           <p className="text-muted-foreground">Monitor and manage visa applications for your assigned clients</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="md:col-span-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search by client name, application ID, or visa type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger>
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="processing">Processing</SelectItem>
//               <SelectItem value="under-review">Under Review</SelectItem>
//               <SelectItem value="approved">Approved</SelectItem>
//               <SelectItem value="documents-required">Documents Required</SelectItem>
//               <SelectItem value="rejected">Rejected</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={typeFilter} onValueChange={setTypeFilter}>
//             <SelectTrigger>
//               <SelectValue placeholder="Filter by visa type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="tourist">Tourist Visa</SelectItem>
//               <SelectItem value="business">Business Visa</SelectItem>
//               <SelectItem value="transit">Transit Visa</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//           <Card className="shadow-card border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
//               <FileText className="h-4 w-4 text-accent" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalApplications}</div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-card border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Processing</CardTitle>
//               <Clock className="h-4 w-4 text-warning" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{processingApplications}</div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-card border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Approved</CardTitle>
//               <CheckCircle className="h-4 w-4 text-success" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{approvedApplications}</div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-card border-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Need Action</CardTitle>
//               <AlertTriangle className="h-4 w-4 text-destructive" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{actionRequiredApplications}</div>
//             </CardContent>
//           </Card>
//           <Card className="shadow-card border-0">
//             <CardHeader>
//               <CardTitle>Rejected</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{rejectedApplications}</div>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="shadow-card border-0">
//           <CardHeader>
//             <CardTitle>Application Queue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filtered.length === 0 ? (
//                 <div className="text-center py-8 text-muted-foreground">No applications found.</div>
//               ) : (
//                 filtered.map((application) => {
//                   const displayStatus = getDisplayStatus(application.applicationStatus)
//                   const processingDays = getProcessingDays(application.createdAt)
//                   const priorityDisplay = getPriorityDisplay(application.processingPriority)
//                   return (
//                     <div key={application._id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
//                             <User className="h-6 w-6 text-primary" />
//                           </div>
//                           <div>
//                             <div className="flex items-center space-x-2 mb-1">
//                               <h3 className="font-semibold">APP-{application._id.slice(-6).toUpperCase()}</h3>
//                               <Badge className={getStatusColor(application.applicationStatus)}>{displayStatus}</Badge>
//                               <span
//                                 className={`text-xs font-medium ${getUrgencyColor(application.processingPriority)}`}
//                               >
//                                 {priorityDisplay} Priority
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                               <div className="flex items-center">
//                                 <User className="mr-1 h-3 w-3" />
//                                 Client: {application.client?.name}
//                               </div>
//                               <div>Type: {application.visaType}</div>
//                               <div>Processing Days: {processingDays}</div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-6">
//                           <div className="text-center">
//                             <div className="text-sm font-medium">{formatDate(application.createdAt)}</div>
//                             <div className="text-xs text-muted-foreground">Submit Date</div>
//                           </div>
//                           <div className="text-center">
//                             <Badge className={getPaymentStatusColor(application.invoice?.paid)}>
//                               {getPaymentStatusText(application.invoice?.paid)}
//                             </Badge>
//                           </div>

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="sm">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem
//                                 onClick={() => {
//                                   /* view details route */
//                                 }}
//                               >
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 View Details
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => openEdit(application)}>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 Edit Application
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => changeStatus(application, "documents-required")}>
//                                 <FileText className="mr-2 h-4 w-4" />
//                                 Request Documents
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => changeStatus(application, "approved")}>
//                                 <CheckCircle className="mr-2 h-4 w-4" />
//                                 Mark Approved
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => changeStatus(application, "rejected")}>
//                                 <XCircle className="mr-2 h-4 w-4" />
//                                 Mark Rejected
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => {
//                                   setUploadApp(application)
//                                   setPassportFile(undefined)
//                                   setPhotoFile(undefined)
//                                   setIdCardFile(undefined)
//                                   setUploadOpen(true)
//                                 }}
//                               >
//                                 <FileText className="mr-2 h-4 w-4" />
//                                 Upload Documents
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => {
//                                   /* optional: download docs */
//                                 }}
//                               >
//                                 <Download className="mr-2 h-4 w-4" />
//                                 Download Documents
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
//       </div>

//       {/* Edit Application Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Application</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Visa Type</Label>
//               <Input className="col-span-3" value={visaType} onChange={(e) => setVisaType(e.target.value)} />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Status</Label>
//               <Select value={status} onValueChange={(v) => setStatus(v as Application["applicationStatus"])}>
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="submitted">Submitted</SelectItem>
//                   <SelectItem value="processing">Processing</SelectItem>
//                   <SelectItem value="approved">Approved</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                   <SelectItem value="documents-required">Documents Required</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Issue Date</Label>
//               <Input
//                 type="date"
//                 className="col-span-3"
//                 value={issueDate}
//                 onChange={(e) => setIssueDate(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Expiry Date</Label>
//               <Input
//                 type="date"
//                 className="col-span-3"
//                 value={expiryDate}
//                 onChange={(e) => setExpiryDate(e.target.value)}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={submitEdit}>Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Upload Documents Dialog */}
//       <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Upload Documents</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Passport</Label>
//               <Input
//                 className="col-span-3"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => setPassportFile(e.target.files?.[0])}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">Photo</Label>
//               <Input
//                 className="col-span-3"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setPhotoFile(e.target.files?.[0])}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">ID Card</Label>
//               <Input
//                 className="col-span-3"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => setIdCardFile(e.target.files?.[0])}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setUploadOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={async () => {
//                 if (!uploadApp) return
//                 try {
//                   setUploading(true)
//                   const fd = buildDocumentsFormData({
//                     passport: passportFile,
//                     photo: photoFile,
//                     idCard: idCardFile,
//                   })
//                   await uploadApplicationDocuments(uploadApp._id, fd)
//                   setUploadOpen(false)
//                   await refresh()
//                 } catch (e) {
//                   console.error("[v0] upload failed", e)
//                 } finally {
//                   setUploading(false)
//                 }
//               }}
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   )
// }

// export default AgentApplication




"use client"

import { useEffect, useMemo, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  User,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
// import {
//   type Application,
//   getAdminApplications,
//   adminUpdateApplicationStatus,
// } from "@/lib/admin"
import { Application } from "@/lib/types"
import { getAdminApplications, adminUpdateApplicationStatus } from "@/lib/admin"

const AdminApplication = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // edit modal state
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Application | null>(null)
  const [visaType, setVisaType] = useState("")
  const [status, setStatus] = useState<Application["applicationStatus"]>("processing")
  const [issueDate, setIssueDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  // upload dialog state
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadApp, setUploadApp] = useState<Application | null>(null)
  const [passportFile, setPassportFile] = useState<File | undefined>()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [idCardFile, setIdCardFile] = useState<File | undefined>()

  // details modal state
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailsApp, setDetailsApp] = useState<Application | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const a = await getAdminApplications()
        setApplications(a)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load applications")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const refresh = async () => {
    try {
      const a = await getAdminApplications()
      setApplications(a)
    } catch {}
  }

  const getDisplayStatus = (s: string): string => {
    switch (s) {
      case "processing":
        return "Processing"
      case "submitted":
        return "Under Review"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "documents-required":
        return "Documents Required"
      default:
        return "Processing"
    }
  }

  const getPriorityDisplay = (p?: string) => (p === "high" ? "High" : p === "low" ? "Low" : "Normal")

  const getStatusColor = (s: string) => {
    const d = getDisplayStatus(s)
    switch (d) {
      case "Approved":
        return "bg-success text-success-foreground"
      case "Processing":
        return "bg-warning text-warning-foreground"
      case "Under Review":
        return "bg-accent text-accent-foreground"
      case "Documents Required":
        return "bg-destructive text-destructive-foreground"
      case "Rejected":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUrgencyColor = (p?: string) =>
    p === "high" ? "text-destructive" : p === "low" ? "text-muted-foreground" : "text-warning"
  const getPaymentStatusColor = (paid?: boolean) =>
    paid ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
  const getPaymentStatusText = (paid?: boolean) => (paid ? "Paid" : "Pending")

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  const getProcessingDays = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const displayStatus = getDisplayStatus(app.applicationStatus)
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        app.client?.name?.toLowerCase().includes(searchLower) ||
        app._id.toLowerCase().includes(searchLower) ||
        app.visaType.toLowerCase().includes(searchLower) ||
        (typeof app.processedBy === "object" ? app.processedBy?.name?.toLowerCase().includes(searchLower) : false)
      const matchesStatus = statusFilter === "all" || displayStatus.toLowerCase().replace(" ", "-") === statusFilter
      const matchesType = typeFilter === "all" || app.visaType.toLowerCase().includes(typeFilter)
      return matchesSearch && matchesStatus && matchesType
    })
  }, [applications, searchTerm, statusFilter, typeFilter])

  // Stats
  const totalApplications = applications.length
  const processingApplications = applications.filter(
    (a) => a.applicationStatus === "processing" || a.applicationStatus === "submitted",
  ).length
  const approvedApplications = applications.filter((a) => a.applicationStatus === "approved").length
  const actionRequiredApplications = applications.filter((a) => a.applicationStatus === "documents-required").length
  const rejectedApplications = applications.filter((a) => a.applicationStatus === "rejected").length

  const openEdit = (app: Application) => {
    setEditing(app)
    setVisaType(app.visaType || "")
    setStatus(app.applicationStatus || "processing")
    setIssueDate(app.issueDate ? app.issueDate.slice(0, 10) : "")
    setExpiryDate(app.expiryDate ? app.expiryDate.slice(0, 10) : "")
    setOpen(true)
  }

  const submitEdit = async () => {
    if (!editing) return
    try {
      // TODO: Implement admin API for details update if needed
      if (status && status !== editing.applicationStatus) {
        await adminUpdateApplicationStatus(editing._id, status)
      }
      setOpen(false)
      await refresh()
    } catch (e) {
      alert("Failed to update application.")
      console.error("[v0] failed to update application", e)
    }
  }

  const changeStatus = async (app: Application, next: Application["applicationStatus"]) => {
    try {
      await adminUpdateApplicationStatus(app._id, next)
      await refresh()
    } catch (e) {
      alert("Failed to change status.")
      console.error("[v0] failed to change status", e)
    }
  }

  // View Details handler
  const openDetails = (app: Application) => {
    setDetailsApp(app)
    setDetailsOpen(true)
  }

  // Download Documents handler
  const downloadDocuments = (app: Application) => {
    if (!app.documents) {
      alert("No documents available for download.")
      return
    }
    Object.entries(app.documents).forEach(([key, url]) => {
      if (url) {
        window.open(url, "_blank")
      }
    })
  }

  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading applications...</div>
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
          <p className="text-muted-foreground">Monitor and manage visa applications for your assigned clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by client name, application ID, or visa type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="documents-required">Documents Required</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by visa type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tourist">Tourist Visa</SelectItem>
              <SelectItem value="business">Business Visa</SelectItem>
              <SelectItem value="transit">Transit Visa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Action</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedApplications}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No applications found.</div>
              ) : (
                filtered.map((application) => {
                  const displayStatus = getDisplayStatus(application.applicationStatus)
                  const processingDays = getProcessingDays(application.createdAt)
                  const priorityDisplay = getPriorityDisplay(application.processingPriority)
                  return (
                    <div key={application._id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">APP-{application._id.slice(-6).toUpperCase()}</h3>
                              <Badge className={getStatusColor(application.applicationStatus)}>{displayStatus}</Badge>
                              <span
                                className={`text-xs font-medium ${getUrgencyColor(application.processingPriority)}`}
                              >
                                {priorityDisplay} Priority
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <User className="mr-1 h-3 w-3" />
                                Client: {application.client?.name}
                              </div>
                              <div>Type: {application.visaType}</div>
                              <div>Processing Days: {processingDays}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm font-medium">{formatDate(application.createdAt)}</div>
                            <div className="text-xs text-muted-foreground">Submit Date</div>
                          </div>
                          <div className="text-center">
                            <Badge className={getPaymentStatusColor(application.invoice?.paid)}>
                              {getPaymentStatusText(application.invoice?.paid)}
                            </Badge>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDetails(application)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEdit(application)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Application
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeStatus(application, "documents-required")}>
                                <FileText className="mr-2 h-4 w-4" />
                                Request Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeStatus(application, "approved")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Approved
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeStatus(application, "rejected")}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Mark Rejected
                              </DropdownMenuItem>
                              {/* Upload/Download logic can be updated to use admin API if needed */}
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
      </div>

      {/* Edit Application Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Visa Type</Label>
              <Input className="col-span-3" value={visaType} onChange={(e) => setVisaType(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Application["applicationStatus"])}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="documents-required">Documents Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Issue Date</Label>
              <Input
                type="date"
                className="col-span-3"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Expiry Date</Label>
              <Input
                type="date"
                className="col-span-3"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {detailsApp ? (
            <div className="space-y-2">
              <div>
                <strong>Application ID:</strong> {detailsApp._id}
              </div>
              <div>
                <strong>Client:</strong> {detailsApp.client?.name}
              </div>
              <div>
                <strong>Visa Type:</strong> {detailsApp.visaType}
              </div>
              <div>
                <strong>Status:</strong> {getDisplayStatus(detailsApp.applicationStatus)}
              </div>
              <div>
                <strong>Priority:</strong> {getPriorityDisplay(detailsApp.processingPriority)}
              </div>
              <div>
                <strong>Issue Date:</strong> {detailsApp.issueDate ? formatDate(detailsApp.issueDate) : "—"}
              </div>
              <div>
                <strong>Expiry Date:</strong> {detailsApp.expiryDate ? formatDate(detailsApp.expiryDate) : "—"}
              </div>
              <div>
                <strong>Documents:</strong>{" "}
                {detailsApp.documents
                  ? Object.entries(detailsApp.documents)
                      .map(([key, url]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                          {key}
                        </a>
                      ))
                  : "No documents"}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default AdminApplication