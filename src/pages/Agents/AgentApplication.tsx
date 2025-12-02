"use client"

import { useEffect, useMemo, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Clock, CheckCircle, XCircle, Eye, Edit, Download, MoreHorizontal, User, X, Calendar, CreditCard, FileImage, IdCard, Camera } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  type Application,
  getMyApplications,
  updateApplicationDetails,
  updateApplicationStatus,
  uploadApplicationDocuments,
  buildDocumentsFormData,
  type Client,
  getMyClients,
  createOrUpdateApplication,
  getApplicationById,
  approveApplication,
  rejectApplication,
} from "@/lib/agent"
import BASE_URL from "@/lib/BaseUrl"
import { useToast } from "@/hooks/use-toast"

interface ApplicationDetails extends Omit<Application, 'client'> {
  documents?: {
    passport?: string
    photo?: string
    idCard?: string
  }
  invoice?: {
    paid: boolean
    amount?: number
    dueDate?: string
  }
  client?: {
    _id: string
    name: string
    email: string
    phone?: string
    dateOfBirth?: string
    nationality?: string
  }
  agent?: {
    _id: string
    name: string
    email: string
  }
  processedBy?: {
    _id: string
    name: string
    email: string
  }
  commissionStatus?: string // Add missing property
  clientId?: string // Add missing property
}

const AgentApplication = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [applications, setApplications] = useState<Application[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // unified modal state
  const [open, setOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "upload">("create")
  const [editing, setEditing] = useState<Application | null>(null)
  const [visaType, setVisaType] = useState("")
  const [status, setStatus] = useState<Application["applicationStatus"]>("processing")
  const [issueDate, setIssueDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  
  // upload state
  const [uploading, setUploading] = useState(false)
  const [passportFile, setPassportFile] = useState<File | undefined>()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [idCardFile, setIdCardFile] = useState<File | undefined>()
  const [approvedVisaFile, setApprovedVisaFile] = useState<File | undefined>()

  // view details state
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const a = await getMyApplications()
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
      const a = await getMyApplications()
      setApplications(a)
    } catch {}
  }

const fetchApplicationDetails = async (applicationId: string) => {
  try {
    setDetailsLoading(true)
    const app = await getApplicationById(applicationId)
    setSelectedApplication(app as ApplicationDetails)
    setDetailsOpen(true)
  } catch (err: any) {
    console.error("Error fetching application details:", err)
    setError(err?.message || "Failed to load application details")
    toast({ title: "Failed to load", description: err?.message || "Unable to load application details", variant: "destructive" })
  } finally {
    setDetailsLoading(false)
  }
}

const buildFileUrl = (path?: string) => {
  if (!path) return undefined
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
}

const handleApprove = async (appId: string) => {
  try {
    const updated = await approveApplication(appId)
    toast({ title: "Application Approved", description: "Application marked as approved." })
    // refresh list and detail view
    await refresh()
    setSelectedApplication(updated as ApplicationDetails)
  } catch (err: any) {
    console.error("approve failed", err)
    toast({ title: "Approve Failed", description: err?.message || "Could not approve application", variant: "destructive" })
  }
}

const handleReject = async (appId: string) => {
  try {
    const updated = await rejectApplication(appId)
    toast({ title: "Application Rejected", description: "Application marked as rejected." })
    await refresh()
    setSelectedApplication(updated as ApplicationDetails)
  } catch (err: any) {
    console.error("reject failed", err)
    toast({ title: "Reject Failed", description: err?.message || "Could not reject application", variant: "destructive" })
  }
}

  const openDetails = async (application: Application) => {
    await fetchApplicationDetails(application._id)
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
  const formatDateTime = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit'
    })
  const getProcessingDays = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Download Documents handler (fetch each document and trigger browser download)
  const downloadDocuments = async (app: Application) => {
    if (!app.documents || Object.keys(app.documents).length === 0) {
      toast({ title: "No documents", description: "No documents available for download.", variant: "destructive" })
      return
    }

    for (const [key, url] of Object.entries(app.documents)) {
      if (!url) continue
      try {
        const finalUrl = (String(url).startsWith("http://") || String(url).startsWith("https://"))
          ? String(url)
          : `${BASE_URL.replace(/\/$/, "")}/${String(url).replace(/^\//, "")}`

        const res = await fetch(finalUrl)
        if (!res.ok) {
          console.error("Failed to fetch document:", finalUrl, res.status)
          toast({ title: "Download failed", description: `Could not download ${key}` , variant: "destructive" })
          continue
        }

        const blob = await res.blob()
        const urlParts = finalUrl.split("?")[0].split("#")[0].split('.')
        const ext = urlParts.length > 1 ? urlParts.pop() : 'bin'
        const safeExt = (ext || 'bin').replace(/[^a-z0-9]/gi, '')
        const filename = `${app._id}_${key}.${safeExt}`

        const blobUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(blobUrl)
      } catch (err: any) {
        console.error("Error downloading document", err)
        toast({ title: "Download error", description: err?.message || `Failed to download ${key}`, variant: "destructive" })
      }
    }
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
    setModalMode("edit")
    setOpen(true)
  }

  const openUpload = (app: Application) => {
    setEditing(app)
    setVisaType(app.visaType || "") // Pre-fill visa type from existing application
    setIssueDate(app.issueDate ? app.issueDate.slice(0, 10) : "")
    setExpiryDate(app.expiryDate ? app.expiryDate.slice(0, 10) : "")
    setPassportFile(undefined)
    setPhotoFile(undefined)
    setIdCardFile(undefined)
    setModalMode("upload")
    setOpen(true)
  }

  const openCreate = async () => {
    try {
      if (clients.length === 0) {
        const list = await getMyClients()
        setClients(list)
      }
      setSelectedClientId("")
      setVisaType("")
      setIssueDate("")
      setExpiryDate("")
      setModalMode("create")
      setOpen(true)
    } catch (e) {
      console.error("[v0] failed to load clients", e)
      setModalMode("create")
      setOpen(true)
    }
  }

  const submitEdit = async () => {
    if (!editing) return
    try {
      await updateApplicationDetails(editing._id, {
        visaType: visaType || undefined,
        issueDate: issueDate || undefined,
        expiryDate: expiryDate || undefined,
      })
      if (status && status !== editing.applicationStatus) {
        await updateApplicationStatus(editing._id, status)
      }
      setOpen(false)
      await refresh()
    } catch (e) {
      console.error("[v0] failed to update application", e)
    }
  }

  const submitUpload = async () => {
    if (!editing) return
    try {
      setUploading(true)
      
      // Create FormData with all required fields
            const formData = new FormData()
            
            // Append documents
            if (passportFile) formData.append("passport", passportFile)
            if (photoFile) formData.append("photo", photoFile)
            if (idCardFile) formData.append("idCard", idCardFile)
            if (approvedVisaFile) formData.append("approvedVisa", approvedVisaFile)
            
            // Append required identifiers and visa data
            formData.append("applicationId", editing._id)
            // Prefer client id from the linked client object; fall back to selectedClientId if available
            const clientIdToAppend = editing.client?._id ?? selectedClientId
            if (clientIdToAppend) formData.append("clientId", clientIdToAppend)
            formData.append("visaType", visaType || editing.visaType || "")
            
            // Append dates if available
            if (issueDate) formData.append("issueDate", issueDate)
            if (expiryDate) formData.append("expiryDate", expiryDate)

      await createOrUpdateApplication(formData)
      setOpen(false)
      await refresh()
    } catch (e) {
      console.error("[v0] upload failed", e)
    } finally {
      setUploading(false)
    }
  }

  const submitCreate = async () => {
    if (!selectedClientId) return
    try {
      setUploading(true)
      await createOrUpdateApplication({
        clientId: selectedClientId,
        visaType: visaType || undefined,
        issueDate: issueDate || undefined,
        expiryDate: expiryDate || undefined,
      })
      setOpen(false)
      await refresh()
    } catch (e) {
      console.error("[v0] failed to create application", e)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = () => {
    switch (modalMode) {
      case "create":
        return submitCreate()
      case "edit":
        return submitEdit()
      case "upload":
        return submitUpload()
    }
  }

  const getModalTitle = () => {
    switch (modalMode) {
      case "create":
        return "Create Application"
      case "edit":
        return "Edit Application"
      case "upload":
        return "Upload Documents & Update Visa Info"
    }
  }

  const getSubmitButtonText = () => {
    switch (modalMode) {
      case "create":
        return uploading ? "Creating..." : "Create"
      case "edit":
        return "Save"
      case "upload":
        return uploading ? "Uploading..." : "Upload Documents"
    }
  }

  const isSubmitDisabled = () => {
    switch (modalMode) {
      case "create":
        return uploading || !selectedClientId
      case "edit":
        return false
      case "upload":
        return uploading || !visaType
    }
  }

  const changeStatus = async (app: Application, next: Application["applicationStatus"]) => {
    try {
      await updateApplicationStatus(app._id, next)
      await refresh()
    } catch (e) {
      console.error("[v0] failed to change status", e)
    }
  }

  if (loading) {
    return (
      <DashboardLayout userRole="agent" userName="Agent User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading applications...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userRole="agent" userName="Agent User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-destructive">Error: {error}</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="agent" userName="Agent User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Application Management</h1>
          <p className="text-muted-foreground">Monitor and manage visa applications for your assigned clients</p>
        </div>

        <div className="flex items-center justify-end">
          <Button onClick={openCreate}>Add Application</Button>
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
            <CardHeader>
              <CardTitle>Need Action</CardTitle>
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
                              <DropdownMenuItem onClick={() => handleApprove(application._id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Approved
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(application._id)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Mark Rejected
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openUpload(application)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Upload Documents
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadDocuments(application)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Documents
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
      </div>

      {/* Unified Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Client Selection (Create Mode Only) */}
            {modalMode === "create" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={clients.length ? "Select client" : "No clients available"} />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name} ({c.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Visa Type (All Modes - Required for upload) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visaType" className="text-right">
                Visa Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="visaType"
                className="col-span-3"
                value={visaType}
                onChange={(e) => setVisaType(e.target.value)}
                placeholder="e.g. tourist, business, transit"
                required
              />
            </div>

            {/* Status (Edit Mode Only) */}
            {modalMode === "edit" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
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
            )}

            {/* Issue Date (All Modes except Upload if not needed, but keeping for consistency) */}
            {(modalMode === "create" || modalMode === "edit" || modalMode === "upload") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issueDate" className="text-right">
                  Issue Date
                </Label>
                <Input
                  id="issueDate"
                  type="date"
                  className="col-span-3"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </div>
            )}

            {/* Expiry Date (All Modes except Upload if not needed, but keeping for consistency) */}
            {(modalMode === "create" || modalMode === "edit" || modalMode === "upload") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiryDate" className="text-right">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  className="col-span-3"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            )}

            {/* Document Upload (Upload Mode Only) */}
            {modalMode === "upload" && (
              <>
                <div className="border-t pt-4 mt-2">
                  <h4 className="text-lg font-medium mb-4">Upload Documents</h4>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passport" className="text-right">
                      Passport
                    </Label>
                    <Input
                      id="passport"
                      className="col-span-3"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setPassportFile(e.target.files?.[0])}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="photo" className="text-right">
                      Photo
                    </Label>
                    <Input
                      id="photo"
                      className="col-span-3"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files?.[0])}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="idCard" className="text-right">
                      ID Card
                    </Label>
                    <Input
                      id="idCard"
                      className="col-span-3"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setIdCardFile(e.target.files?.[0])}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="approvedVisa" className="text-right">
                      Approved Visa (Agent upload)
                    </Label>
                    <Input
                      id="approvedVisa"
                      className="col-span-3"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setApprovedVisaFile(e.target.files?.[0])}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitDisabled()}>
              {getSubmitButtonText()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Application Details</span>
              <Button variant="ghost" size="sm" onClick={() => setDetailsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {detailsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-lg">Loading details...</div>
            </div>
          ) : selectedApplication ? (
            <div className="space-y-6">
              {/* Application Header */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">APP-{selectedApplication._id.slice(-6).toUpperCase()}</h3>
                    <p className="text-muted-foreground">Application ID: {selectedApplication._id}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(selectedApplication.applicationStatus)}>
                      {getDisplayStatus(selectedApplication.applicationStatus)}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      Priority: {getPriorityDisplay(selectedApplication.processingPriority)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Client Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Name</Label>
                      <p className="font-medium">{selectedApplication.client?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="font-medium">{selectedApplication.client?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="font-medium">{selectedApplication.client?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Nationality</Label>
                      <p className="font-medium">{selectedApplication.client?.nationality || 'N/A'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Application Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Application Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Visa Type</Label>
                      <p className="font-medium">{selectedApplication.visaType}</p>
                    </div>
                    <div>
                      <Label>Processing Priority</Label>
                      <p className="font-medium">{getPriorityDisplay(selectedApplication.processingPriority)}</p>
                    </div>
                    <div>
                      <Label>Commission Status</Label>
                      <p className="font-medium capitalize">{selectedApplication.commissionStatus}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Dates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Important Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Created Date</Label>
                      <p className="font-medium">{formatDateTime(selectedApplication.createdAt)}</p>
                    </div>
                    <div>
                      <Label>Last Updated</Label>
                      <p className="font-medium">{formatDateTime(selectedApplication.updatedAt)}</p>
                    </div>
                    {selectedApplication.issueDate && (
                      <div>
                        <Label>Issue Date</Label>
                        <p className="font-medium">{formatDate(selectedApplication.issueDate)}</p>
                      </div>
                    )}
                    {selectedApplication.expiryDate && (
                      <div>
                        <Label>Expiry Date</Label>
                        <p className="font-medium">{formatDate(selectedApplication.expiryDate)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Payment Status</Label>
                      <Badge className={getPaymentStatusColor(selectedApplication.invoice?.paid)}>
                        {getPaymentStatusText(selectedApplication.invoice?.paid)}
                      </Badge>
                    </div>
                    {selectedApplication.invoice?.amount && (
                      <div>
                        <Label>Amount</Label>
                        <p className="font-medium">${selectedApplication.invoice.amount}</p>
                      </div>
                    )}
                    {selectedApplication.invoice?.dueDate && (
                      <div>
                        <Label>Due Date</Label>
                        <p className="font-medium">{formatDate(selectedApplication.invoice.dueDate)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Documents Section */}
              {selectedApplication.documents && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileImage className="h-5 w-5" />
                      Uploaded Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedApplication.documents.passport && (
                        <div className="text-center">
                          <FileText className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                          <Label>Passport</Label>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(selectedApplication.documents!.passport, '_blank')}
                            >
                              View Document
                            </Button>
                          </div>
                        </div>
                      )}
                      {selectedApplication.documents.photo && (
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-2 text-green-500" />
                          <Label>Photo</Label>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(selectedApplication.documents!.photo, '_blank')}
                            >
                              View Document
                            </Button>
                          </div>
                        </div>
                      )}
                      {selectedApplication.documents.idCard && (
                        <div className="text-center">
                          <IdCard className="h-12 w-12 mx-auto mb-2 text-orange-500" />
                          <Label>ID Card</Label>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(selectedApplication.documents!.idCard, '_blank')}
                            >
                              View Document
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    {!selectedApplication.documents.passport && !selectedApplication.documents.photo && !selectedApplication.documents.idCard && (
                      <p className="text-muted-foreground text-center py-4">No documents uploaded yet.</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Failed to load application details.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default AgentApplication