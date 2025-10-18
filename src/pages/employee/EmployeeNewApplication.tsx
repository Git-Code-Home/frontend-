// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
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
//   AlertTriangle,
//   Eye,
//   Edit,
//   Send,
//   MoreHorizontal,
//   Upload,
// } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { createApplication, uploadApplicationDocuments, getMyClients } from "../../lib/employee"

// const EmployeeApplications = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [clients, setClients] = useState<Array<{ _id: string; name: string }>>([])
//   const [selectedClientId, setSelectedClientId] = useState<string>("all")
//   const [loading, setLoading] = useState(true)
//   const { toast } = useToast()

//   const [openCreate, setOpenCreate] = useState(false)
//   const [clientId, setClientId] = useState("")
//   const [visaTypeCreate, setVisaTypeCreate] = useState("")
//   const [passportFile, setPassportFile] = useState<File | null>(null)
//   const [photoFile, setPhotoFile] = useState<File | null>(null)
//   const [idCardFile, setIdCardFile] = useState<File | null>(null)
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         console.log("[v0] Fetching clients from API...")
//         const data = await getMyClients()
//         console.log("[v0] Clients fetched successfully:", data)
//         setClients(data)
//       } catch (error) {
//         console.error("[v0] Error fetching clients:", error)
//         toast({ title: "Error", description: "Failed to fetch clients", variant: "destructive" })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchClients()
//   }, [toast])

//   async function handleCreateApplication(e: React.FormEvent) {
//     e.preventDefault()
//     try {
//       setSubmitting(true)
//       if (!clientId || !visaTypeCreate) {
//         toast({ title: "Missing fields", description: "Client and Visa Type are required.", variant: "destructive" })
//         return
//       }

//       console.log("[v0] Creating application with clientId:", clientId, "visaType:", visaTypeCreate)
//       const { applicationId } = await createApplication({ clientId, visaType: visaTypeCreate })
//       console.log("[v0] Application created with ID:", applicationId)

//       if (applicationId && (passportFile || photoFile || idCardFile)) {
//         console.log("[v0] Uploading documents for application:", applicationId)
//         await uploadApplicationDocuments({
//           applicationId,
//           passport: passportFile || undefined,
//           photo: photoFile || undefined,
//           idCard: idCardFile || undefined,
//         })
//         console.log("[v0] Documents uploaded successfully")
//       }

//       toast({ title: "Application created", description: "The application has been created successfully." })

//       setClientId("")
//       setVisaTypeCreate("")
//       setPassportFile(null)
//       setPhotoFile(null)
//       setIdCardFile(null)
//       setOpenCreate(false)
//     } catch (err: any) {
//       console.error("[v0] Error creating application:", err)
//       toast({ title: "Error", description: err?.message || "Failed to create application", variant: "destructive" })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const myApplications = [
//     {
//       id: "VA015",
//       clientName: "Ahmed Hassan",
//       clientId: "CL001",
//       visaType: "Tourist Visa",
//       status: "Documents Required",
//       priority: "High",
//       submitDate: "2024-01-15",
//       processingDays: 3,
//       nextAction: "Document Review",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo"],
//       missingDocs: ["Bank Statement", "Hotel Booking"],
//     },
//     {
//       id: "VA016",
//       clientName: "Fatima Al-Zahra",
//       clientId: "CL007",
//       visaType: "Family Visa",
//       status: "Under Review",
//       priority: "Normal",
//       submitDate: "2024-01-12",
//       processingDays: 6,
//       nextAction: "Background Verification",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Marriage Certificate", "Sponsor Documents"],
//       missingDocs: [],
//     },
//     {
//       id: "VA017",
//       clientName: "Raj Patel",
//       clientId: "CL012",
//       visaType: "Business Visa",
//       status: "Processing",
//       priority: "High",
//       submitDate: "2024-01-14",
//       processingDays: 4,
//       nextAction: "Final Approval",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Business License", "Company Letter"],
//       missingDocs: [],
//     },
//     {
//       id: "VA018",
//       clientName: "Sarah Thompson",
//       clientId: "CL018",
//       visaType: "Tourist Visa",
//       status: "Ready for Approval",
//       priority: "Normal",
//       submitDate: "2024-01-10",
//       processingDays: 8,
//       nextAction: "Issue Visa",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Bank Statement", "Travel Itinerary"],
//       missingDocs: [],
//     },
//     {
//       id: "VA019",
//       clientName: "Mohammed Ali",
//       clientId: "CL025",
//       visaType: "Transit Visa",
//       status: "Pending Documents",
//       priority: "Low",
//       submitDate: "2024-01-16",
//       processingDays: 2,
//       nextAction: "Document Upload",
//       paymentStatus: "Pending",
//       documents: ["Passport Copy"],
//       missingDocs: ["Photo", "Flight Tickets"],
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Ready for Approval":
//         return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
//       case "Processing":
//         return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
//       case "Under Review":
//         return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
//       case "Documents Required":
//         return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//       case "Pending Documents":
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//       default:
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High":
//         return "text-red-600"
//       case "Normal":
//         return "text-amber-600"
//       case "Low":
//         return "text-slate-500"
//       default:
//         return "text-slate-500"
//     }
//   }

//   const filteredApplications = myApplications.filter((app) => {
//     const matchesSearch =
//       app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.visaType.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter

//     const matchesClient = selectedClientId === "all" || app.clientId === selectedClientId

//     return matchesSearch && matchesStatus && matchesClient
//   })

//   return (
//     <DashboardLayout userRole="employee" userName="Sarah Johnson">
//       <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             My Applications
//           </h1>
//           <p className="text-slate-600 text-sm sm:text-base">Manage and track all applications assigned to you</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="lg:col-span-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
//               <Input
//                 placeholder="Search by client name, application ID, or visa type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           <Select value={selectedClientId} onValueChange={setSelectedClientId}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder={loading ? "Loading clients..." : "Filter by client"} />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Clients</SelectItem>
//               {clients.map((client) => (
//                 <SelectItem key={client._id} value={client._id}>
//                   {client.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="processing">Processing</SelectItem>
//               <SelectItem value="under-review">Under Review</SelectItem>
//               <SelectItem value="ready-for-approval">Ready for Approval</SelectItem>
//               <SelectItem value="documents-required">Documents Required</SelectItem>
//               <SelectItem value="pending-documents">Pending Documents</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Total Applications</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <FileText className="h-4 w-4 text-blue-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">{myApplications.length}</div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
//                 <Clock className="h-4 w-4 text-amber-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status === "Processing" || a.status === "Under Review").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Ready to Approve</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
//                 <CheckCircle className="h-4 w-4 text-emerald-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status === "Ready for Approval").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Need Attention</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
//                 <AlertTriangle className="h-4 w-4 text-red-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status.includes("Documents")).length}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex justify-end">
//           <Dialog open={openCreate} onOpenChange={setOpenCreate}>
//             <DialogTrigger asChild>
//               <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">+ Create Application</Button>
//             </DialogTrigger>
//             <DialogContent className="rounded-2xl sm:max-w-lg">
//               <DialogHeader>
//                 <DialogTitle>Create New Application</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleCreateApplication} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="clientSelect">Client</Label>
//                   <Select value={clientId} onValueChange={setClientId}>
//                     <SelectTrigger id="clientSelect" className="rounded-2xl">
//                       <SelectValue
//                         placeholder={
//                           loading ? "Loading clients..." : clients.length === 0 ? "No clients found" : "Select a client"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       {clients.length === 0 ? (
//                         <SelectItem value="no-clients" disabled>
//                           No clients available
//                         </SelectItem>
//                       ) : (
//                         clients.map((client) => (
//                           <SelectItem key={client._id} value={client._id}>
//                             {client.name}
//                           </SelectItem>
//                         ))
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="visaType">Visa Type</Label>
//                   <Select value={visaTypeCreate} onValueChange={setVisaTypeCreate}>
//                     <SelectTrigger id="visaType" className="rounded-2xl">
//                       <SelectValue placeholder="Select visa type" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
//                       <SelectItem value="Business Visa">Business Visa</SelectItem>
//                       <SelectItem value="Family Visa">Family Visa</SelectItem>
//                       <SelectItem value="Transit Visa">Transit Visa</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div className="space-y-2">
//                     <Label htmlFor="passport">Passport</Label>
//                     <Input
//                       id="passport"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="photo">Photo</Label>
//                     <Input
//                       id="photo"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="idCard">ID Card</Label>
//                     <Input
//                       id="idCard"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="rounded-2xl bg-transparent"
//                     onClick={() => setOpenCreate(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-700" disabled={submitting}>
//                     {submitting ? "Creating..." : "Create"}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Application Queue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredApplications.map((application) => (
//                 <div
//                   key={application.id}
//                   className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                         <FileText className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap items-center gap-2 mb-1">
//                           <h3 className="font-semibold text-slate-800">{application.id}</h3>
//                           <Badge className={`${getStatusColor(application.status)} rounded-full`}>
//                             {application.status}
//                           </Badge>
//                           <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
//                             {application.priority} Priority
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
//                           <div>Client: {application.clientName}</div>
//                           <div>Type: {application.visaType}</div>
//                           <div>Submit Date: {application.submitDate}</div>
//                           <div>Processing Days: {application.processingDays}</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="rounded-2xl border-slate-200 shadow-lg">
//                           <DropdownMenuItem className="rounded-xl">
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Edit className="mr-2 h-4 w-4" />
//                             Update Status
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Send className="mr-2 h-4 w-4" />
//                             Contact Client
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Upload className="mr-2 h-4 w-4" />
//                             Request Documents
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-3 bg-white/60 rounded-2xl border border-slate-200/50">
//                     <div>
//                       <h4 className="text-sm font-medium text-emerald-700 mb-2">Submitted Documents</h4>
//                       <div className="flex flex-wrap gap-1">
//                         {application.documents.map((doc, index) => (
//                           <Badge
//                             key={index}
//                             variant="outline"
//                             className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
//                           >
//                             {doc}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     {application.missingDocs.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-medium text-red-700 mb-2">Missing Documents</h4>
//                         <div className="flex flex-wrap gap-1">
//                           {application.missingDocs.map((doc, index) => (
//                             <Badge
//                               key={index}
//                               className="text-xs rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//                             >
//                               {doc}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
//                       <div>
//                         <span className="text-sm font-medium text-blue-700">Next Action: </span>
//                         <span className="text-sm text-slate-700">{application.nextAction}</span>
//                       </div>
//                       <div className="flex space-x-2">
//                         {application.status === "Documents Required" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                           >
//                             <Send className="mr-1 h-3 w-3" />
//                             Request Docs
//                           </Button>
//                         )}
//                         {application.status === "Ready for Approval" && (
//                           <Button
//                             size="sm"
//                             className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                           >
//                             <CheckCircle className="mr-1 h-3 w-3" />
//                             Approve
//                           </Button>
//                         )}
//                         {application.status === "Under Review" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                           >
//                             <Edit className="mr-1 h-3 w-3" />
//                             Update Status
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EmployeeApplications



// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
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
//   AlertTriangle,
//   Eye,
//   Edit,
//   Send,
//   MoreHorizontal,
//   Upload,
// } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { createApplication, uploadApplicationDocuments, getMyClients } from "../../lib/employee"

// const EmployeeApplications = () => {
//   // Filters / lists
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [clients, setClients] = useState<Array<{ _id: string; name: string }>>([])
//   const [selectedClientId, setSelectedClientId] = useState<string>("all")
//   const [loading, setLoading] = useState(true)
//   const { toast } = useToast()

//   // Create dialog/form
//   const [openCreate, setOpenCreate] = useState(false)
//   const [clientId, setClientId] = useState("")
//   const [visaTypeCreate, setVisaTypeCreate] = useState("")

//   // Existing files
//   const [passportFile, setPassportFile] = useState<File | null>(null)
//   const [photoFile, setPhotoFile] = useState<File | null>(null)
//   const [idCardFile, setIdCardFile] = useState<File | null>(null)

//   // New files
//   const [passportFirstPageFile, setPassportFirstPageFile] = useState<File | null>(null)
//   const [passportCoverPageFile, setPassportCoverPageFile] = useState<File | null>(null)
//   const [birthCertificateFile, setBirthCertificateFile] = useState<File | null>(null)
//   const [bayFormFile, setBayFormFile] = useState<File | null>(null)
//   const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null)

//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const data = await getMyClients()
//         setClients(data)
//       } catch (error) {
//         toast({ title: "Error", description: "Failed to fetch clients", variant: "destructive" })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchClients()
//   }, [toast])

//   async function handleCreateApplication(e: React.FormEvent) {
//     e.preventDefault()
//     try {
//       setSubmitting(true)
//       if (!clientId || !visaTypeCreate) {
//         toast({ title: "Missing fields", description: "Client and Visa Type are required.", variant: "destructive" })
//         return
//       }

//       const { applicationId } = await createApplication({ clientId, visaType: visaTypeCreate })

//       const hasAnyFile =
//         passportFile ||
//         photoFile ||
//         idCardFile ||
//         passportFirstPageFile ||
//         passportCoverPageFile ||
//         birthCertificateFile ||
//         bayFormFile ||
//         paymentReceiptFile

//       if (applicationId && hasAnyFile) {
//         await uploadApplicationDocuments({
//           applicationId,
//           passport: passportFile || undefined,
//           photo: photoFile || undefined,
//           idCard: idCardFile || undefined,
//           passportFirstPage: passportFirstPageFile || undefined,
//           passportCoverPage: passportCoverPageFile || undefined,
//           birthCertificate: birthCertificateFile || undefined,
//           bayForm: bayFormFile || undefined,
//           paymentReceipt: paymentReceiptFile || undefined,
//         })
//       }

//       toast({ title: "Application created", description: "The application has been created successfully." })

//       // Reset form
//       setClientId("")
//       setVisaTypeCreate("")
//       setPassportFile(null)
//       setPhotoFile(null)
//       setIdCardFile(null)
//       setPassportFirstPageFile(null)
//       setPassportCoverPageFile(null)
//       setBirthCertificateFile(null)
//       setBayFormFile(null)
//       setPaymentReceiptFile(null)
//       setOpenCreate(false)
//     } catch (err: any) {
//       toast({ title: "Error", description: err?.message || "Failed to create application", variant: "destructive" })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const myApplications = [
//     {
//       id: "VA015",
//       clientName: "Ahmed Hassan",
//       clientId: "CL001",
//       visaType: "Tourist Visa",
//       status: "Documents Required",
//       priority: "High",
//       submitDate: "2024-01-15",
//       processingDays: 3,
//       nextAction: "Document Review",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo"],
//       missingDocs: ["Bank Statement", "Hotel Booking"],
//     },
//     {
//       id: "VA016",
//       clientName: "Fatima Al-Zahra",
//       clientId: "CL007",
//       visaType: "Family Visa",
//       status: "Under Review",
//       priority: "Normal",
//       submitDate: "2024-01-12",
//       processingDays: 6,
//       nextAction: "Background Verification",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Marriage Certificate", "Sponsor Documents"],
//       missingDocs: [],
//     },
//     {
//       id: "VA017",
//       clientName: "Raj Patel",
//       clientId: "CL012",
//       visaType: "Business Visa",
//       status: "Processing",
//       priority: "High",
//       submitDate: "2024-01-14",
//       processingDays: 4,
//       nextAction: "Final Approval",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Business License", "Company Letter"],
//       missingDocs: [],
//     },
//     {
//       id: "VA018",
//       clientName: "Sarah Thompson",
//       clientId: "CL018",
//       visaType: "Tourist Visa",
//       status: "Ready for Approval",
//       priority: "Normal",
//       submitDate: "2024-01-10",
//       processingDays: 8,
//       nextAction: "Issue Visa",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Bank Statement", "Travel Itinerary"],
//       missingDocs: [],
//     },
//     {
//       id: "VA019",
//       clientName: "Mohammed Ali",
//       clientId: "CL025",
//       visaType: "Transit Visa",
//       status: "Pending Documents",
//       priority: "Low",
//       submitDate: "2024-01-16",
//       processingDays: 2,
//       nextAction: "Document Upload",
//       paymentStatus: "Pending",
//       documents: ["Passport Copy"],
//       missingDocs: ["Photo", "Flight Tickets"],
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Ready for Approval":
//         return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
//       case "Processing":
//         return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
//       case "Under Review":
//         return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
//       case "Documents Required":
//         return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//       case "Pending Documents":
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//       default:
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High":
//         return "text-red-600"
//       case "Normal":
//         return "text-amber-600"
//       case "Low":
//         return "text-slate-500"
//       default:
//         return "text-slate-500"
//     }
//   }

//   const filteredApplications = myApplications.filter((app) => {
//     const matchesSearch =
//       app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.visaType.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
//     const matchesClient = selectedClientId === "all" || app.clientId === selectedClientId

//     return matchesSearch && matchesStatus && matchesClient
//   })

//   return (
//     <DashboardLayout userRole="employee" userName="Sarah Johnson">
//       <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             My Applications
//           </h1>
//           <p className="text-slate-600 text-sm sm:text-base">Manage and track all applications assigned to you</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="lg:col-span-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
//               <Input
//                 placeholder="Search by client name, application ID, or visa type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           <Select value={selectedClientId} onValueChange={setSelectedClientId}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder={loading ? "Loading clients..." : "Filter by client"} />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Clients</SelectItem>
//               {clients.map((client) => (
//                 <SelectItem key={client._id} value={client._id}>
//                   {client.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="processing">Processing</SelectItem>
//               <SelectItem value="under-review">Under Review</SelectItem>
//               <SelectItem value="ready-for-approval">Ready for Approval</SelectItem>
//               <SelectItem value="documents-required">Documents Required</SelectItem>
//               <SelectItem value="pending-documents">Pending Documents</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Total Applications</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <FileText className="h-4 w-4 text-blue-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">{myApplications.length}</div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
//                 <Clock className="h-4 w-4 text-amber-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status === "Processing" || a.status === "Under Review").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Ready to Approve</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
//                 <CheckCircle className="h-4 w-4 text-emerald-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status === "Ready for Approval").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Need Attention</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
//                 <AlertTriangle className="h-4 w-4 text-red-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {myApplications.filter((a) => a.status.includes("Documents")).length}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex justify-end">
//           <Dialog open={openCreate} onOpenChange={setOpenCreate}>
//             <DialogTrigger asChild>
//               <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">+ Create Application</Button>
//             </DialogTrigger>
//             <DialogContent className="rounded-2xl sm:max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Create New Application</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleCreateApplication} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="clientSelect">Client</Label>
//                   <Select value={clientId} onValueChange={setClientId}>
//                     <SelectTrigger id="clientSelect" className="rounded-2xl">
//                       <SelectValue
//                         placeholder={
//                           loading ? "Loading clients..." : clients.length === 0 ? "No clients found" : "Select a client"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       {clients.length === 0 ? (
//                         <SelectItem value="no-clients" disabled>
//                           No clients available
//                         </SelectItem>
//                       ) : (
//                         clients.map((client) => (
//                           <SelectItem key={client._id} value={client._id}>
//                             {client.name}
//                           </SelectItem>
//                         ))
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="visaType">Visa Type</Label>
//                   <Select value={visaTypeCreate} onValueChange={setVisaTypeCreate}>
//                     <SelectTrigger id="visaType" className="rounded-2xl">
//                       <SelectValue placeholder="Select visa type" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
//                       <SelectItem value="Business Visa">Business Visa</SelectItem>
//                       <SelectItem value="Family Visa">Family Visa</SelectItem>
//                       <SelectItem value="Transit Visa">Transit Visa</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Uploads */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                   <div className="space-y-2">
//                     <Label htmlFor="passport">Passport (main copy)</Label>
//                     <Input
//                       id="passport"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="passportFirstPage">Passport First Page</Label>
//                     <Input
//                       id="passportFirstPage"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportFirstPageFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="passportCoverPage">Passport Cover Page</Label>
//                     <Input
//                       id="passportCoverPage"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportCoverPageFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="birthCertificate">Birth Certificate</Label>
//                     <Input
//                       id="birthCertificate"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setBirthCertificateFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bayForm">Bay Form</Label>
//                     <Input
//                       id="bayForm"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setBayFormFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="paymentReceipt">Payment Receipt</Label>
//                     <Input
//                       id="paymentReceipt"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="photo">Photo</Label>
//                     <Input
//                       id="photo"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="idCard">ID Card (jpg/png/pdf)</Label>
//                     <Input
//                       id="idCard"
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="rounded-2xl bg-transparent"
//                     onClick={() => setOpenCreate(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-700" disabled={submitting}>
//                     {submitting ? "Creating..." : "Create"}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Application Queue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredApplications.map((application) => (
//                 <div
//                   key={application.id}
//                   className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                         <FileText className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap items-center gap-2 mb-1">
//                           <h3 className="font-semibold text-slate-800">{application.id}</h3>
//                           <Badge className={`${getStatusColor(application.status)} rounded-full`}>
//                             {application.status}
//                           </Badge>
//                           <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
//                             {application.priority} Priority
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
//                           <div>Client: {application.clientName}</div>
//                           <div>Type: {application.visaType}</div>
//                           <div>Submit Date: {application.submitDate}</div>
//                           <div>Processing Days: {application.processingDays}</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="rounded-2xl border-slate-200 shadow-lg">
//                           <DropdownMenuItem className="rounded-xl">
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Edit className="mr-2 h-4 w-4" />
//                             Update Status
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Send className="mr-2 h-4 w-4" />
//                             Contact Client
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Upload className="mr-2 h-4 w-4" />
//                             Request Documents
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-3 bg-white/60 rounded-2xl border border-slate-200/50">
//                     <div>
//                       <h4 className="text-sm font-medium text-emerald-700 mb-2">Submitted Documents</h4>
//                       <div className="flex flex-wrap gap-1">
//                         {application.documents.map((doc, index) => (
//                           <Badge
//                             key={index}
//                             variant="outline"
//                             className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
//                           >
//                             {doc}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     {application.missingDocs.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-medium text-red-700 mb-2">Missing Documents</h4>
//                         <div className="flex flex-wrap gap-1">
//                           {application.missingDocs.map((doc, index) => (
//                             <Badge
//                               key={index}
//                               className="text-xs rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//                             >
//                               {doc}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
//                       <div>
//                         <span className="text-sm font-medium text-blue-700">Next Action: </span>
//                         <span className="text-sm text-slate-700">{application.nextAction}</span>
//                       </div>
//                       <div className="flex space-x-2">
//                         {application.status === "Documents Required" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                           >
//                             <Send className="mr-1 h-3 w-3" />
//                             Request Docs
//                           </Button>
//                         )}
//                         {application.status === "Ready for Approval" && (
//                           <Button
//                             size="sm"
//                             className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                           >
//                             <CheckCircle className="mr-1 h-3 w-3" />
//                             Approve
//                           </Button>
//                         )}
//                         {application.status === "Under Review" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                           >
//                             <Edit className="mr-1 h-3 w-3" />
//                             Update Status
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EmployeeApplications



// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
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
//   AlertTriangle,
//   Eye,
//   Edit,
//   Send,
//   MoreHorizontal,
//   Upload,
// } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { createApplication, uploadApplicationDocuments, getMyClients } from "../../lib/employee"

// type ApplicationItem = {
//   id: string
//   clientName: string
//   clientId: string
//   visaType: string
//   status: string
//   priority: "High" | "Normal" | "Low"
//   submitDate: string
//   processingDays: number
//   nextAction: string
//   paymentStatus: "Paid" | "Pending" | "Unpaid"
//   documents: string[]
//   missingDocs: string[]
// }

// const EmployeeApplications = () => {
//   // Filters / lists
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [clients, setClients] = useState<Array<{ _id: string; name: string }>>([])
//   const [selectedClientId, setSelectedClientId] = useState<string>("all")
//   const [loading, setLoading] = useState(true)
//   const { toast } = useToast()

//   // Create dialog/form
//   const [openCreate, setOpenCreate] = useState(false)
//   const [clientId, setClientId] = useState("")
//   const [visaTypeCreate, setVisaTypeCreate] = useState("")

//   // Existing files
//   const [passportFile, setPassportFile] = useState<File | null>(null)
//   const [photoFile, setPhotoFile] = useState<File | null>(null)
//   const [idCardFile, setIdCardFile] = useState<File | null>(null)

//   // New files
//   const [passportFirstPageFile, setPassportFirstPageFile] = useState<File | null>(null)
//   const [passportCoverPageFile, setPassportCoverPageFile] = useState<File | null>(null)
//   const [birthCertificateFile, setBirthCertificateFile] = useState<File | null>(null)
//   const [bayFormFile, setBayFormFile] = useState<File | null>(null)
//   const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null)

//   const [submitting, setSubmitting] = useState(false)

//   // Modals state
//   const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null)
//   const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
//   const [updateStatusOpen, setUpdateStatusOpen] = useState(false)
//   const [newStatus, setNewStatus] = useState("")

//   // Mock data -> keep as state so UI updates after status change
//   const initialApplications: ApplicationItem[] = [
//     {
//       id: "VA015",
//       clientName: "Ahmed Hassan",
//       clientId: "CL001",
//       visaType: "Tourist Visa",
//       status: "Documents Required",
//       priority: "High",
//       submitDate: "2024-01-15",
//       processingDays: 3,
//       nextAction: "Document Review",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo"],
//       missingDocs: ["Bank Statement", "Hotel Booking"],
//     },
//     {
//       id: "VA016",
//       clientName: "Fatima Al-Zahra",
//       clientId: "CL007",
//       visaType: "Family Visa",
//       status: "Under Review",
//       priority: "Normal",
//       submitDate: "2024-01-12",
//       processingDays: 6,
//       nextAction: "Background Verification",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Marriage Certificate", "Sponsor Documents"],
//       missingDocs: [],
//     },
//     {
//       id: "VA017",
//       clientName: "Raj Patel",
//       clientId: "CL012",
//       visaType: "Business Visa",
//       status: "Processing",
//       priority: "High",
//       submitDate: "2024-01-14",
//       processingDays: 4,
//       nextAction: "Final Approval",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Business License", "Company Letter"],
//       missingDocs: [],
//     },
//     {
//       id: "VA018",
//       clientName: "Sarah Thompson",
//       clientId: "CL018",
//       visaType: "Tourist Visa",
//       status: "Ready for Approval",
//       priority: "Normal",
//       submitDate: "2024-01-10",
//       processingDays: 8,
//       nextAction: "Issue Visa",
//       paymentStatus: "Paid",
//       documents: ["Passport Copy", "Photo", "Bank Statement", "Travel Itinerary"],
//       missingDocs: [],
//     },
//     {
//       id: "VA019",
//       clientName: "Mohammed Ali",
//       clientId: "CL025",
//       visaType: "Transit Visa",
//       status: "Pending Documents",
//       priority: "Low",
//       submitDate: "2024-01-16",
//       processingDays: 2,
//       nextAction: "Document Upload",
//       paymentStatus: "Pending",
//       documents: ["Passport Copy"],
//       missingDocs: ["Photo", "Flight Tickets"],
//     },
//   ]

//   const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications)

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const data = await getMyClients()
//         setClients(data)
//       } catch (error) {
//         toast({ title: "Error", description: "Failed to fetch clients", variant: "destructive" })
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchClients()
//   }, [toast])

//   async function handleCreateApplication(e: React.FormEvent) {
//     e.preventDefault()
//     try {
//       setSubmitting(true)
//       if (!clientId || !visaTypeCreate) {
//         toast({ title: "Missing fields", description: "Client and Visa Type are required.", variant: "destructive" })
//         return
//       }

//       const { applicationId } = await createApplication({ clientId, visaType: visaTypeCreate })

//       const hasAnyFile =
//         passportFile ||
//         photoFile ||
//         idCardFile ||
//         passportFirstPageFile ||
//         passportCoverPageFile ||
//         birthCertificateFile ||
//         bayFormFile ||
//         paymentReceiptFile

//       if (applicationId && hasAnyFile) {
//         await uploadApplicationDocuments({
//           applicationId,
//           passport: passportFile || undefined,
//           photo: photoFile || undefined,
//           idCard: idCardFile || undefined,
//           passportFirstPage: passportFirstPageFile || undefined,
//           passportCoverPage: passportCoverPageFile || undefined,
//           birthCertificate: birthCertificateFile || undefined,
//           bayForm: bayFormFile || undefined,
//           paymentReceipt: paymentReceiptFile || undefined,
//         })
//       }

//       toast({ title: "Application created", description: "The application has been created successfully." })

//       // Reset form
//       setClientId("")
//       setVisaTypeCreate("")
//       setPassportFile(null)
//       setPhotoFile(null)
//       setIdCardFile(null)
//       setPassportFirstPageFile(null)
//       setPassportCoverPageFile(null)
//       setBirthCertificateFile(null)
//       setBayFormFile(null)
//       setPaymentReceiptFile(null)
//       setOpenCreate(false)
//     } catch (err: any) {
//       toast({ title: "Error", description: err?.message || "Failed to create application", variant: "destructive" })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // UI helpers
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Ready for Approval":
//         return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
//       case "Processing":
//         return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
//       case "Under Review":
//         return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
//       case "Documents Required":
//         return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//       case "Pending Documents":
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//       default:
//         return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "High":
//         return "text-red-600"
//       case "Normal":
//         return "text-amber-600"
//       case "Low":
//         return "text-slate-500"
//       default:
//         return "text-slate-500"
//     }
//   }

//   // Actions: view details / update status
//   const handleViewDetails = (app: ApplicationItem) => {
//     setSelectedApp(app)
//     setViewDetailsOpen(true)
//   }

//   const handleUpdateStatus = (app: ApplicationItem) => {
//     setSelectedApp(app)
//     setNewStatus(app.status)
//     setUpdateStatusOpen(true)
//   }

//   const handleStatusSave = () => {
//     if (!selectedApp) return
//     setApplications((prev) =>
//       prev.map((a) => (a.id === selectedApp.id ? { ...a, status: newStatus } : a))
//     )
//     setUpdateStatusOpen(false)
//     toast({ title: "Status Updated", description: `Status changed to ${newStatus}` })
//   }

//   // Filtering
//   const filteredApplications = applications.filter((app) => {
//     const matchesSearch =
//       app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.visaType.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
//     const matchesClient = selectedClientId === "all" || app.clientId === selectedClientId

//     return matchesSearch && matchesStatus && matchesClient
//   })

//   return (
//     <DashboardLayout userRole="employee" userName="Sarah Johnson">
//       <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             My Applications
//           </h1>
//           <p className="text-slate-600 text-sm sm:text-base">Manage and track all applications assigned to you</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="lg:col-span-2">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
//               <Input
//                 placeholder="Search by client name, application ID, or visa type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           <Select value={selectedClientId} onValueChange={setSelectedClientId}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder={loading ? "Loading clients..." : "Filter by client"} />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Clients</SelectItem>
//               {clients.map((client) => (
//                 <SelectItem key={client._id} value={client._id}>
//                   {client.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="processing">Processing</SelectItem>
//               <SelectItem value="under-review">Under Review</SelectItem>
//               <SelectItem value="ready-for-approval">Ready for Approval</SelectItem>
//               <SelectItem value="documents-required">Documents Required</SelectItem>
//               <SelectItem value="pending-documents">Pending Documents</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Total Applications</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <FileText className="h-4 w-4 text-blue-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">{applications.length}</div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
//                 <Clock className="h-4 w-4 text-amber-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {applications.filter((a) => a.status === "Processing" || a.status === "Under Review").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Ready to Approve</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
//                 <CheckCircle className="h-4 w-4 text-emerald-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {applications.filter((a) => a.status === "Ready for Approval").length}
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-slate-600">Need Attention</CardTitle>
//               <div className="p-2 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
//                 <AlertTriangle className="h-4 w-4 text-red-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-slate-800">
//                 {applications.filter((a) => a.status.includes("Documents")).length}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex justify-end">
//           <Dialog open={openCreate} onOpenChange={setOpenCreate}>
//             <DialogTrigger asChild>
//               <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">+ Create Application</Button>
//             </DialogTrigger>
//             <DialogContent className="rounded-2xl sm:max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Create New Application</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleCreateApplication} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="clientSelect">Client</Label>
//                   <Select value={clientId} onValueChange={setClientId}>
//                     <SelectTrigger id="clientSelect" className="rounded-2xl">
//                       <SelectValue
//                         placeholder={
//                           loading ? "Loading clients..." : clients.length === 0 ? "No clients found" : "Select a client"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       {clients.length === 0 ? (
//                         <SelectItem value="no-clients" disabled>
//                           No clients available
//                         </SelectItem>
//                       ) : (
//                         clients.map((client) => (
//                           <SelectItem key={client._id} value={client._id}>
//                             {client.name}
//                           </SelectItem>
//                         ))
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="visaType">Visa Type</Label>
//                   <Select value={visaTypeCreate} onValueChange={setVisaTypeCreate}>
//                     <SelectTrigger id="visaType" className="rounded-2xl">
//                       <SelectValue placeholder="Select visa type" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
//                       <SelectItem value="Business Visa">Business Visa</SelectItem>
//                       <SelectItem value="Family Visa">Family Visa</SelectItem>
//                       <SelectItem value="Transit Visa">Transit Visa</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Uploads */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                   <div className="space-y-2">
//                     <Label htmlFor="passport">Passport (main copy)</Label>
//                     <Input
//                       id="passport"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="passportFirstPage">Passport First Page</Label>
//                     <Input
//                       id="passportFirstPage"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportFirstPageFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="passportCoverPage">Passport Cover Page</Label>
//                     <Input
//                       id="passportCoverPage"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPassportCoverPageFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="birthCertificate">Birth Certificate</Label>
//                     <Input
//                       id="birthCertificate"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setBirthCertificateFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bayForm">Bay Form</Label>
//                     <Input
//                       id="bayForm"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setBayFormFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="paymentReceipt">Payment Receipt</Label>
//                     <Input
//                       id="paymentReceipt"
//                       type="file"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="photo">Photo</Label>
//                     <Input
//                       id="photo"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="idCard">ID Card (jpg/png/pdf)</Label>
//                     <Input
//                       id="idCard"
//                       type="file"
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="rounded-2xl bg-transparent"
//                     onClick={() => setOpenCreate(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-700" disabled={submitting}>
//                     {submitting ? "Creating..." : "Create"}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Application Queue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredApplications.map((application) => (
//                 <div
//                   key={application.id}
//                   className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                         <FileText className="h-6 w-6 text-white" />
//                       </div>
//                       <div>
//                         <div className="flex flex-wrap items-center gap-2 mb-1">
//                           <h3 className="font-semibold text-slate-800">{application.id}</h3>
//                           <Badge className={`${getStatusColor(application.status)} rounded-full`}>
//                             {application.status}
//                           </Badge>
//                           <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
//                             {application.priority} Priority
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
//                           <div>Client: {application.clientName}</div>
//                           <div>Type: {application.visaType}</div>
//                           <div>Submit Date: {application.submitDate}</div>
//                           <div>Processing Days: {application.processingDays}</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
//                         onClick={() => handleViewDetails(application)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="rounded-2xl border-slate-200 shadow-lg">
//                           <DropdownMenuItem className="rounded-xl" onClick={() => handleViewDetails(application)}>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl" onClick={() => handleUpdateStatus(application)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Update Status
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Send className="mr-2 h-4 w-4" />
//                             Contact Client
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="rounded-xl">
//                             <Upload className="mr-2 h-4 w-4" />
//                             Request Documents
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-3 bg-white/60 rounded-2xl border border-slate-200/50">
//                     <div>
//                       <h4 className="text-sm font-medium text-emerald-700 mb-2">Submitted Documents</h4>
//                       <div className="flex flex-wrap gap-1">
//                         {application.documents.map((doc, index) => (
//                           <Badge
//                             key={index}
//                             variant="outline"
//                             className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
//                           >
//                             {doc}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>

//                     {application.missingDocs.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-medium text-red-700 mb-2">Missing Documents</h4>
//                         <div className="flex flex-wrap gap-1">
//                           {application.missingDocs.map((doc, index) => (
//                             <Badge
//                               key={index}
//                               className="text-xs rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
//                             >
//                               {doc}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
//                       <div>
//                         <span className="text-sm font-medium text-blue-700">Next Action: </span>
//                         <span className="text-sm text-slate-700">{application.nextAction}</span>
//                       </div>
//                       <div className="flex space-x-2">
//                         {application.status === "Documents Required" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                           >
//                             <Send className="mr-1 h-3 w-3" />
//                             Request Docs
//                           </Button>
//                         )}
//                         {application.status === "Ready for Approval" && (
//                           <Button
//                             size="sm"
//                             className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                           >
//                             <CheckCircle className="mr-1 h-3 w-3" />
//                             Approve
//                           </Button>
//                         )}
//                         {application.status === "Under Review" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
//                             onClick={() => handleUpdateStatus(application)}
//                           >
//                             <Edit className="mr-1 h-3 w-3" />
//                             Update Status
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* View Details Modal */}
//         <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
//           <DialogContent className="rounded-2xl sm:max-w-lg">
//             <DialogHeader>
//               <DialogTitle>Application Details</DialogTitle>
//             </DialogHeader>
//             {selectedApp && (
//               <div className="space-y-2">
//                 <div><strong>ID:</strong> {selectedApp.id}</div>
//                 <div><strong>Client:</strong> {selectedApp.clientName}</div>
//                 <div><strong>Visa Type:</strong> {selectedApp.visaType}</div>
//                 <div><strong>Status:</strong> {selectedApp.status}</div>
//                 <div><strong>Priority:</strong> {selectedApp.priority}</div>
//                 <div><strong>Submit Date:</strong> {selectedApp.submitDate}</div>
//                 <div><strong>Processing Days:</strong> {selectedApp.processingDays}</div>
//                 <div><strong>Next Action:</strong> {selectedApp.nextAction}</div>
//                 <div><strong>Payment Status:</strong> {selectedApp.paymentStatus}</div>
//                 <div><strong>Documents:</strong> {selectedApp.documents.join(", ")}</div>
//                 {selectedApp.missingDocs.length > 0 && (
//                   <div><strong>Missing Documents:</strong> {selectedApp.missingDocs.join(", ")}</div>
//                 )}
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>

//         {/* Update Status Modal */}
//         <Dialog open={updateStatusOpen} onOpenChange={setUpdateStatusOpen}>
//           <DialogContent className="rounded-2xl sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Update Application Status</DialogTitle>
//             </DialogHeader>
//             {selectedApp && (
//               <div className="space-y-4">
//                 <div><strong>Application ID:</strong> {selectedApp.id}</div>
//                 <div>
//                   <Label htmlFor="statusSelect">Status</Label>
//                   <Select value={newStatus} onValueChange={setNewStatus}>
//                     <SelectTrigger id="statusSelect" className="rounded-2xl">
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-2xl">
//                       <SelectItem value="Processing">Processing</SelectItem>
//                       <SelectItem value="Under Review">Under Review</SelectItem>
//                       <SelectItem value="Ready for Approval">Ready for Approval</SelectItem>
//                       <SelectItem value="Documents Required">Documents Required</SelectItem>
//                       <SelectItem value="Pending Documents">Pending Documents</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <Button variant="outline" onClick={() => setUpdateStatusOpen(false)}>Cancel</Button>
//                   <Button onClick={handleStatusSave} className="bg-blue-600 text-white">Save</Button>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EmployeeApplications






"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
  AlertTriangle,
  Eye,
  Edit,
  Send,
  MoreHorizontal,
  Upload,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createApplication, uploadApplicationDocuments, getMyClients } from "../../lib/employee"

type ApplicationItem = {
  id: string
  clientName: string
  clientId: string
  visaType: string
  status: string
  priority: "High" | "Normal" | "Low"
  submitDate: string
  processingDays: number
  nextAction: string
  paymentStatus: "Paid" | "Pending" | "Unpaid"
  documents: string[]
  missingDocs: string[]
}

const EmployeeApplications = () => {
  // Filters / lists
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clients, setClients] = useState<Array<{ _id: string; name: string }>>([])
  const [selectedClientId, setSelectedClientId] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Create dialog/form
  const [openCreate, setOpenCreate] = useState(false)
  const [clientId, setClientId] = useState("")
  const [visaTypeCreate, setVisaTypeCreate] = useState("")

  // Existing files
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [idCardFile, setIdCardFile] = useState<File | null>(null)

  // New files
  const [passportFirstPageFile, setPassportFirstPageFile] = useState<File | null>(null)
  const [passportCoverPageFile, setPassportCoverPageFile] = useState<File | null>(null)
  const [birthCertificateFile, setBirthCertificateFile] = useState<File | null>(null)
  const [bayFormFile, setBayFormFile] = useState<File | null>(null)
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null)

  const [submitting, setSubmitting] = useState(false)

  // Modals state
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  // Preselect clientId from URL if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const id = params.get("clientId")
      if (id) setClientId(id)
    }
  }, [])

  // Mock data -> keep as state so UI updates after status change
  const initialApplications: ApplicationItem[] = [
    {
      id: "VA015",
      clientName: "Ahmed Hassan",
      clientId: "CL001",
      visaType: "Tourist Visa",
      status: "Documents Required",
      priority: "High",
      submitDate: "2024-01-15",
      processingDays: 3,
      nextAction: "Document Review",
      paymentStatus: "Paid",
      documents: ["Passport Copy", "Photo"],
      missingDocs: ["Bank Statement", "Hotel Booking"],
    },
    {
      id: "VA016",
      clientName: "Fatima Al-Zahra",
      clientId: "CL007",
      visaType: "Family Visa",
      status: "Under Review",
      priority: "Normal",
      submitDate: "2024-01-12",
      processingDays: 6,
      nextAction: "Background Verification",
      paymentStatus: "Paid",
      documents: ["Passport Copy", "Photo", "Marriage Certificate", "Sponsor Documents"],
      missingDocs: [],
    },
    {
      id: "VA017",
      clientName: "Raj Patel",
      clientId: "CL012",
      visaType: "Business Visa",
      status: "Processing",
      priority: "High",
      submitDate: "2024-01-14",
      processingDays: 4,
      nextAction: "Final Approval",
      paymentStatus: "Paid",
      documents: ["Passport Copy", "Photo", "Business License", "Company Letter"],
      missingDocs: [],
    },
    {
      id: "VA018",
      clientName: "Sarah Thompson",
      clientId: "CL018",
      visaType: "Tourist Visa",
      status: "Ready for Approval",
      priority: "Normal",
      submitDate: "2024-01-10",
      processingDays: 8,
      nextAction: "Issue Visa",
      paymentStatus: "Paid",
      documents: ["Passport Copy", "Photo", "Bank Statement", "Travel Itinerary"],
      missingDocs: [],
    },
    {
      id: "VA019",
      clientName: "Mohammed Ali",
      clientId: "CL025",
      visaType: "Transit Visa",
      status: "Pending Documents",
      priority: "Low",
      submitDate: "2024-01-16",
      processingDays: 2,
      nextAction: "Document Upload",
      paymentStatus: "Pending",
      documents: ["Passport Copy"],
      missingDocs: ["Photo", "Flight Tickets"],
    },
  ]

  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getMyClients()
        setClients(data)
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch clients", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [toast])

  async function handleCreateApplication(e: React.FormEvent) {
    e.preventDefault()
    try {
      setSubmitting(true)
      if (!clientId || !visaTypeCreate) {
        toast({ title: "Missing fields", description: "Client and Visa Type are required.", variant: "destructive" })
        return
      }

      const { applicationId } = await createApplication({ clientId, visaType: visaTypeCreate })

      const hasAnyFile =
        passportFile ||
        photoFile ||
        idCardFile ||
        passportFirstPageFile ||
        passportCoverPageFile ||
        birthCertificateFile ||
        bayFormFile ||
        paymentReceiptFile

      if (applicationId && hasAnyFile) {
        await uploadApplicationDocuments({
          applicationId,
          passport: passportFile || undefined,
          photo: photoFile || undefined,
          idCard: idCardFile || undefined,
          passportFirstPage: passportFirstPageFile || undefined,
          passportCoverPage: passportCoverPageFile || undefined,
          birthCertificate: birthCertificateFile || undefined,
          bayForm: bayFormFile || undefined,
          paymentReceipt: paymentReceiptFile || undefined,
        })
      }

      toast({ title: "Application created", description: "The application has been created successfully." })

      // Reset form
      setClientId("")
      setVisaTypeCreate("")
      setPassportFile(null)
      setPhotoFile(null)
      setIdCardFile(null)
      setPassportFirstPageFile(null)
      setPassportCoverPageFile(null)
      setBirthCertificateFile(null)
      setBayFormFile(null)
      setPaymentReceiptFile(null)
      setOpenCreate(false)
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Failed to create application", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  // UI helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Approval":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
      case "Processing":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
      case "Under Review":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
      case "Documents Required":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
      case "Pending Documents":
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
      default:
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"
      case "Normal":
        return "text-amber-600"
      case "Low":
        return "text-slate-500"
      default:
        return "text-slate-500"
    }
  }

  // Actions: view details / update status
  const handleViewDetails = (app: ApplicationItem) => {
    setSelectedApp(app)
    setViewDetailsOpen(true)
  }

  const handleUpdateStatus = (app: ApplicationItem) => {
    setSelectedApp(app)
    setNewStatus(app.status)
    setUpdateStatusOpen(true)
  }

  const handleStatusSave = () => {
    if (!selectedApp) return
    setApplications((prev) =>
      prev.map((a) => (a.id === selectedApp.id ? { ...a, status: newStatus } : a))
    )
    setUpdateStatusOpen(false)
    toast({ title: "Status Updated", description: `Status changed to ${newStatus}` })
  }

  // Filtering
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesClient = selectedClientId === "all" || app.clientId === selectedClientId

    return matchesSearch && matchesStatus && matchesClient
  })

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">Manage and track all applications assigned to you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by client name, application ID, or visa type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>

          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
              <SelectValue placeholder={loading ? "Loading clients..." : "Filter by client"} />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
              <SelectItem value="all">All Clients</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client._id} value={client._id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 shadow-lg">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="ready-for-approval">Ready for Approval</SelectItem>
              <SelectItem value="documents-required">Documents Required</SelectItem>
              <SelectItem value="pending-documents">Pending Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Applications</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{applications.length}</div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {applications.filter((a) => a.status === "Processing" || a.status === "Under Review").length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Ready to Approve</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {applications.filter((a) => a.status === "Ready for Approval").length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Need Attention</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {applications.filter((a) => a.status.includes("Documents")).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">+ Create Application</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Application</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateApplication} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientSelect">Client</Label>
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger id="clientSelect" className="rounded-2xl">
                      <SelectValue
                        placeholder={
                          loading ? "Loading clients..." : clients.length === 0 ? "No clients found" : "Select a client"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {clients.length === 0 ? (
                        <SelectItem value="no-clients" disabled>
                          No clients available
                        </SelectItem>
                      ) : (
                        clients.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visaType">Visa Type</Label>
                  <Select value={visaTypeCreate} onValueChange={setVisaTypeCreate}>
                    <SelectTrigger id="visaType" className="rounded-2xl">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
                      <SelectItem value="Business Visa">Business Visa</SelectItem>
                      <SelectItem value="Family Visa">Family Visa</SelectItem>
                      <SelectItem value="Transit Visa">Transit Visa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="passport">Passport (main copy)</Label>
                    <Input
                      id="passport"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportFirstPage">Passport First Page</Label>
                    <Input
                      id="passportFirstPage"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setPassportFirstPageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passportCoverPage">Passport Cover Page</Label>
                    <Input
                      id="passportCoverPage"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setPassportCoverPageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthCertificate">Birth Certificate</Label>
                    <Input
                      id="birthCertificate"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setBirthCertificateFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bayForm">Bay Form</Label>
                    <Input
                      id="bayForm"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setBayFormFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentReceipt">Payment Receipt</Label>
                    <Input
                      id="paymentReceipt"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idCard">ID Card (jpg/png/pdf)</Label>
                    <Input
                      id="idCard"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl bg-transparent"
                    onClick={() => setOpenCreate(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-2xl bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                    {submitting ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Application Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800">{application.id}</h3>
                          <Badge className={`${getStatusColor(application.status)} rounded-full`}>
                            {application.status}
                          </Badge>
                          <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
                            {application.priority} Priority
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                          <div>Client: {application.clientName}</div>
                          <div>Type: {application.visaType}</div>
                          <div>Submit Date: {application.submitDate}</div>
                          <div>Processing Days: {application.processingDays}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
                        onClick={() => handleViewDetails(application)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-slate-200 shadow-lg">
                          <DropdownMenuItem className="rounded-xl" onClick={() => handleViewDetails(application)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl" onClick={() => handleUpdateStatus(application)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl">
                            <Send className="mr-2 h-4 w-4" />
                            Contact Client
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl">
                            <Upload className="mr-2 h-4 w-4" />
                            Request Documents
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-3 bg-white/60 rounded-2xl border border-slate-200/50">
                    <div>
                      <h4 className="text-sm font-medium text-emerald-700 mb-2">Submitted Documents</h4>
                      <div className="flex flex-wrap gap-1">
                        {application.documents.map((doc, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
                          >
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {application.missingDocs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-2">Missing Documents</h4>
                        <div className="flex flex-wrap gap-1">
                          {application.missingDocs.map((doc, index) => (
                            <Badge
                              key={index}
                              className="text-xs rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
                            >
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div>
                        <span className="text-sm font-medium text-blue-700">Next Action: </span>
                        <span className="text-sm text-slate-700">{application.nextAction}</span>
                      </div>
                      <div className="flex space-x-2">
                        {application.status === "Documents Required" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
                          >
                            <Send className="mr-1 h-3 w-3" />
                            Request Docs
                          </Button>
                        )}
                        {application.status === "Ready for Approval" && (
                          <Button
                            size="sm"
                            className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                        )}
                        {application.status === "Under Review" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-2xl border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 bg-transparent"
                            onClick={() => handleUpdateStatus(application)}
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Details Modal */}
        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="rounded-2xl sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedApp && (
              <div className="space-y-2">
                <div><strong>ID:</strong> {selectedApp.id}</div>
                <div><strong>Client:</strong> {selectedApp.clientName}</div>
                <div><strong>Visa Type:</strong> {selectedApp.visaType}</div>
                <div><strong>Status:</strong> {selectedApp.status}</div>
                <div><strong>Priority:</strong> {selectedApp.priority}</div>
                <div><strong>Submit Date:</strong> {selectedApp.submitDate}</div>
                <div><strong>Processing Days:</strong> {selectedApp.processingDays}</div>
                <div><strong>Next Action:</strong> {selectedApp.nextAction}</div>
                <div><strong>Payment Status:</strong> {selectedApp.paymentStatus}</div>
                <div><strong>Documents:</strong> {selectedApp.documents.join(", ")}</div>
                {selectedApp.missingDocs.length > 0 && (
                  <div><strong>Missing Documents:</strong> {selectedApp.missingDocs.join(", ")}</div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Update Status Modal */}
        <Dialog open={updateStatusOpen} onOpenChange={setUpdateStatusOpen}>
          <DialogContent className="rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Application Status</DialogTitle>
            </DialogHeader>
            {selectedApp && (
              <div className="space-y-4">
                <div><strong>Application ID:</strong> {selectedApp.id}</div>
                <div>
                  <Label htmlFor="statusSelect">Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="statusSelect" className="rounded-2xl">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Ready for Approval">Ready for Approval</SelectItem>
                      <SelectItem value="Documents Required">Documents Required</SelectItem>
                      <SelectItem value="Pending Documents">Pending Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setUpdateStatusOpen(false)}>Cancel</Button>
                  <Button onClick={handleStatusSave} className="bg-blue-600 text-white">Save</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeApplications