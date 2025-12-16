import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, CheckCircle, Clock, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import BASE_URL from "@/lib/BaseUrl"

interface RequiredDocumentApplication {
  _id: string
  clientId: {
    _id: string
    name: string
    email: string
    mobileNumber: string
  }
  fullName: string
  email: string
  passportNumber: string
  status: "pending" | "reviewed" | "approved" | "rejected"
  adminNotes?: string
  createdAt: string
}

const AdminRequiredDocuments = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [applications, setApplications] = useState<RequiredDocumentApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
      if (!token) {
        toast({ title: "Error", description: "Please login to continue", variant: "destructive" })
        navigate("/admin/login")
        return
      }

      const res = await fetch(`${BASE_URL}/api/client/required-document-applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch applications")
      }

      const data = await res.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error("Error fetching applications:", err)
      toast({ title: "Error", description: err.message || "Failed to fetch applications", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
      const res = await fetch(`${BASE_URL}/api/client/required-document-applications/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) {
        throw new Error("Failed to update status")
      }

      toast({ title: "Success", description: "Status updated successfully", variant: "default" })
      fetchApplications()
    } catch (err: any) {
      console.error("Error updating status:", err)
      toast({ title: "Error", description: err.message || "Failed to update status", variant: "destructive" })
    }
  }

  const handleViewDetails = (id: string) => {
    navigate(`/admin/required-documents/${id}`)
  }

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.clientId?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    reviewed: { icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    approved: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  }

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Clock
    return Icon
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Required Document Applications</h1>
          <p className="text-muted-foreground mt-2">Review and manage client document submissions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Search by name, email, or passport..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No applications found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 font-semibold">Client Name</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Passport</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Submitted</th>
                        <th className="pb-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredApplications.map((app) => {
                        const StatusIcon = getStatusIcon(app.status)
                        return (
                          <tr key={app._id} className="hover:bg-muted/50">
                            <td className="py-4">{app.fullName || app.clientId?.name || "—"}</td>
                            <td className="py-4">{app.email || app.clientId?.email || "—"}</td>
                            <td className="py-4 font-mono text-xs">{app.passportNumber || "—"}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <StatusIcon className="h-4 w-4" />
                                <span className="capitalize">{app.status}</span>
                              </div>
                            </td>
                            <td className="py-4 text-xs text-muted-foreground">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(app._id)}
                                className="mr-2"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Select value={app.status} onValueChange={(status) => handleStatusUpdate(app._id, status)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="reviewed">Reviewed</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminRequiredDocuments
