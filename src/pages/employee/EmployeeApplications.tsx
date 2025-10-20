"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  User,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createApplication, uploadApplicationDocuments, getMyClients, getMyApplications } from "@/lib/employee"

interface Application {
  _id: string
  client: {
    _id: string
    name: string
    email: string
    phone?: string
  }
  visaType: string
  status: string
  priority?: string
  documents?: {
    passport?: string
    photo?: string
    idCard?: string
    birthCertificate?: string
    bForm?: string
    passportFirstPage?: string
    passportCoverPage?: string
    paymentReceipt?: string
  }
  createdAt: string
  updatedAt: string
}

const EmployeeApplications = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clients, setClients] = useState<Array<{ _id: string; name: string }>>([])
  const [selectedClientId, setSelectedClientId] = useState<string>("all")
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [openCreate, setOpenCreate] = useState(false)
  const [clientId, setClientId] = useState("")
  const [visaTypeCreate, setVisaTypeCreate] = useState("")
  const [visaDuration, setVisaDuration] = useState("")
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [idCardFile, setIdCardFile] = useState<File | null>(null)
  const [birthCertificateFile, setBirthCertificateFile] = useState<File | null>(null)
  const [bFormFile, setBFormFile] = useState<File | null>(null)
  const [passportFirstPageFile, setPassportFirstPageFile] = useState<File | null>(null)
  const [passportCoverPageFile, setPassportCoverPageFile] = useState<File | null>(null)
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [openDetails, setOpenDetails] = useState(false)

  // Payment receipt upload state
  const [openPaymentUpload, setOpenPaymentUpload] = useState(false)
  const [selectedAppForPayment, setSelectedAppForPayment] = useState<Application | null>(null)
  const [paymentReceiptUploadFile, setPaymentReceiptUploadFile] = useState<File | null>(null)
  const [uploadingReceipt, setUploadingReceipt] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[v0] Fetching clients and applications from API...")
        const [clientsData, applicationsData] = await Promise.all([getMyClients(), getMyApplications()])
        console.log("[v0] Clients fetched:", clientsData)
        console.log("[v0] Applications fetched:", applicationsData)
        setClients(clientsData)
        setApplications(applicationsData)
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
        toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  async function handleCreateApplication(e: React.FormEvent) {
    e.preventDefault()
    try {
      setSubmitting(true)
      if (!clientId || !visaTypeCreate) {
        toast({ title: "Missing fields", description: "Client and Visa Type are required.", variant: "destructive" })
        return
      }

      console.log("[v0] Creating application with clientId:", clientId, "visaType:", visaTypeCreate)
      const { applicationId } = await createApplication({ clientId, visaType: visaTypeCreate, visaDuration })
      console.log("[v0] Application created with ID:", applicationId)

      if (applicationId && (passportFile || photoFile || idCardFile || birthCertificateFile || bFormFile || 
          passportFirstPageFile || passportCoverPageFile || paymentReceiptFile)) {
        console.log("[v0] Uploading documents for application:", applicationId)
        await uploadApplicationDocuments({
          applicationId,
          passport: passportFile,
          photo: photoFile,
          idCard: idCardFile,
          birthCertificate: birthCertificateFile,
          bForm: bFormFile,
          passportFirstPage: passportFirstPageFile,
          passportCoverPage: passportCoverPageFile,
          paymentReceipt: paymentReceiptFile,
        })
        console.log("[v0] Documents uploaded successfully")
      }

      toast({ title: "Application created", description: "The application has been created successfully." })

      const applicationsData = await getMyApplications()
      setApplications(applicationsData)

      setClientId("")
      setVisaTypeCreate("")
      setVisaDuration("")
      setPassportFile(null)
      setPhotoFile(null)
      setIdCardFile(null)
      setBirthCertificateFile(null)
      setBFormFile(null)
      setPassportFirstPageFile(null)
      setPassportCoverPageFile(null)
      setPaymentReceiptFile(null)
      setOpenCreate(false)
    } catch (err: any) {
      console.error("[v0] Error creating application:", err)
      toast({ title: "Error", description: err?.message || "Failed to create application", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application)
    setOpenDetails(true)
  }

  const handleOpenPaymentUpload = (application: Application) => {
    setSelectedAppForPayment(application)
    setOpenPaymentUpload(true)
  }

  const handleUploadPaymentReceipt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAppForPayment || !paymentReceiptUploadFile) {
      toast({ title: "Missing File", description: "Please select a payment receipt to upload.", variant: "destructive" })
      return
    }

    try {
      setUploadingReceipt(true)
      await uploadApplicationDocuments({
        applicationId: selectedAppForPayment._id,
        paymentReceipt: paymentReceiptUploadFile
      })

      toast({ title: "Success", description: "Payment receipt uploaded successfully!", variant: "default" })
      
      // Refresh applications
      const updatedApplications = await getMyApplications()
      setApplications(updatedApplications)
      
      // Close modal and reset state
      setOpenPaymentUpload(false)
      setPaymentReceiptUploadFile(null)
      setSelectedAppForPayment(null)
    } catch (err: any) {
      console.error("[v0] Error uploading payment receipt:", err)
      toast({ title: "Error", description: err?.message || "Failed to upload payment receipt", variant: "destructive" })
    } finally {
      setUploadingReceipt(false)
    }
  }

  const handleMarkPaymentPending = async (application: Application) => {
    try {
      toast({ title: "Info", description: "Payment status marked as pending.", variant: "default" })
      // You can add API call here if needed to update status
    } catch (err: any) {
      console.error("[v0] Error marking payment as pending:", err)
      toast({ title: "Error", description: "Failed to update payment status", variant: "destructive" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Approval":
      case "approved":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
      case "Processing":
      case "processing":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
      case "Under Review":
      case "pending":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
      case "Documents Required":
      case "rejected":
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

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.visaType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status.toLowerCase().replace(" ", "-") === statusFilter

    const matchesClient = selectedClientId === "all" || app.client._id === selectedClientId

    return matchesSearch && matchesStatus && matchesClient
  })

  const getProcessingDays = (createdAt: string) => {
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
                {applications.filter((a) => a.status === "processing" || a.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Approved</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {applications.filter((a) => a.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Rejected</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {applications.filter((a) => a.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">+ Create Application</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <SelectItem value="Work Visa">Work Visa</SelectItem>
                        <SelectItem value="Student Visa">Student Visa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visaDuration">Visa Duration</Label>
                    <Select value={visaDuration} onValueChange={setVisaDuration}>
                      <SelectTrigger id="visaDuration" className="rounded-2xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="14 days">14 Days</SelectItem>
                        <SelectItem value="30 days">30 Days</SelectItem>
                        <SelectItem value="60 days">60 Days</SelectItem>
                        <SelectItem value="90 days">90 Days</SelectItem>
                        <SelectItem value="6 months">6 Months</SelectItem>
                        <SelectItem value="1 year">1 Year</SelectItem>
                        <SelectItem value="2 years">2 Years</SelectItem>
                        <SelectItem value="3 years">3 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Upload Documents (PDF, JPG, PNG)</Label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="passport" className="text-sm">Passport</Label>
                      <Input
                        id="passport"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-sm">Photo</Label>
                      <Input
                        id="photo"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idCard" className="text-sm">ID Card</Label>
                      <Input
                        id="idCard"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthCertificate" className="text-sm">Birth Certificate</Label>
                      <Input
                        id="birthCertificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setBirthCertificateFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bForm" className="text-sm">B-Form</Label>
                      <Input
                        id="bForm"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setBFormFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passportFirstPage" className="text-sm">Passport First Page</Label>
                      <Input
                        id="passportFirstPage"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPassportFirstPageFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passportCoverPage" className="text-sm">Passport Cover Page</Label>
                      <Input
                        id="passportCoverPage"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPassportCoverPageFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentReceipt" className="text-sm">Payment Receipt</Label>
                      <Input
                        id="paymentReceipt"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)}
                        className="rounded-2xl"
                      />
                    </div>
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
            {loading ? (
              <div className="text-center py-8 text-slate-600">Loading applications...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8 text-slate-600">No applications found</div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div
                    key={application._id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{application._id.slice(-6).toUpperCase()}</h3>
                            <Badge className={`${getStatusColor(application.status)} rounded-full`}>
                              {application.status}
                            </Badge>
                            {application.priority && (
                              <span className={`text-xs font-medium ${getPriorityColor(application.priority)}`}>
                                {application.priority} Priority
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                            <div>Client: {application.client.name}</div>
                            <div>Type: {application.visaType}</div>
                            <div>Submit Date: {new Date(application.createdAt).toLocaleDateString()}</div>
                            <div>Processing Days: {getProcessingDays(application.createdAt)}</div>
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
                            <DropdownMenuItem className="rounded-xl" onClick={() => handleOpenPaymentUpload(application)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Payment Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl">
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

                    {application.documents && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-3 bg-white/60 rounded-2xl border border-slate-200/50">
                        <div>
                          <h4 className="text-sm font-medium text-emerald-700 mb-2">Submitted Documents</h4>
                          <div className="flex flex-wrap gap-1">
                            {application.documents.passport && (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
                              >
                                Passport
                              </Badge>
                            )}
                            {application.documents.photo && (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
                              >
                                Photo
                              </Badge>
                            )}
                            {application.documents.idCard && (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
                              >
                                ID Card
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-blue-700 mb-2">Payment Status</h4>
                          <div className="flex flex-wrap gap-1">
                            {application.documents.paymentReceipt ? (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full border-emerald-200 text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50"
                              >
                                ✓ Receipt Uploaded
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-xs rounded-full border-amber-200 text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50"
                              >
                                ⏳ Payment Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={openDetails} onOpenChange={setOpenDetails}>
          <DialogContent className="rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Application Details
              </DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6">
                {/* Application Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {selectedApplication._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-sm text-slate-600">{selectedApplication.visaType}</p>
                    </div>
                    <Badge className={`${getStatusColor(selectedApplication.status)} rounded-full`}>
                      {selectedApplication.status}
                    </Badge>
                  </div>

                  {/* Client Information */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Client Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-slate-700">Name:</span>
                        <span className="text-slate-600">{selectedApplication.client.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-slate-700">Email:</span>
                        <span className="text-slate-600">{selectedApplication.client.email}</span>
                      </div>
                      {selectedApplication.client.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-slate-700">Phone:</span>
                          <span className="text-slate-600">{selectedApplication.client.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Application Timeline */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Timeline
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">Created:</span>
                        <span className="text-slate-600">
                          {new Date(selectedApplication.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">Last Updated:</span>
                        <span className="text-slate-600">
                          {new Date(selectedApplication.updatedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">Processing Days:</span>
                        <span className="text-slate-600">{getProcessingDays(selectedApplication.createdAt)} days</span>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  {selectedApplication.documents && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                      <h4 className="text-sm font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documents
                      </h4>
                      <div className="space-y-2">
                        {selectedApplication.documents.passport && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Passport</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl bg-transparent"
                              onClick={() => window.open(selectedApplication.documents?.passport, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        )}
                        {selectedApplication.documents.photo && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Photo</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl bg-transparent"
                              onClick={() => window.open(selectedApplication.documents?.photo, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        )}
                        {selectedApplication.documents.idCard && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-xl">
                            <span className="text-sm font-medium text-slate-700">ID Card</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl bg-transparent"
                              onClick={() => window.open(selectedApplication.documents?.idCard, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        )}
                        {!selectedApplication.documents.passport &&
                          !selectedApplication.documents.photo &&
                          !selectedApplication.documents.idCard && (
                            <p className="text-sm text-slate-600 text-center py-2">No documents uploaded yet</p>
                          )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="rounded-2xl bg-transparent"
                    onClick={() => setOpenDetails(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Receipt Upload Dialog */}
        <Dialog open={openPaymentUpload} onOpenChange={setOpenPaymentUpload}>
          <DialogContent className="rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Upload Payment Receipt
              </DialogTitle>
            </DialogHeader>
            {selectedAppForPayment && (
              <form onSubmit={handleUploadPaymentReceipt} className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-slate-700">Client:</span>
                      <span className="text-slate-600">{selectedAppForPayment.client.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-slate-700">Visa Type:</span>
                      <span className="text-slate-600">{selectedAppForPayment.visaType}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentReceipt" className="text-sm font-medium text-slate-700">
                    Payment Receipt File
                  </Label>
                  <Input
                    id="paymentReceipt"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setPaymentReceiptUploadFile(e.target.files?.[0] || null)}
                    className="rounded-2xl border-slate-200 bg-white"
                  />
                  <p className="text-xs text-slate-500">Accepted formats: PDF, JPG, JPEG, PNG</p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl bg-transparent"
                    onClick={() => {
                      setOpenPaymentUpload(false)
                      setPaymentReceiptUploadFile(null)
                      setSelectedAppForPayment(null)
                    }}
                    disabled={uploadingReceipt}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-2xl"
                    onClick={() => {
                      handleMarkPaymentPending(selectedAppForPayment)
                      setOpenPaymentUpload(false)
                      setSelectedAppForPayment(null)
                    }}
                    disabled={uploadingReceipt}
                  >
                    Mark as Pending
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600"
                    disabled={uploadingReceipt || !paymentReceiptUploadFile}
                  >
                    {uploadingReceipt ? "Uploading..." : "Upload Receipt"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeApplications
