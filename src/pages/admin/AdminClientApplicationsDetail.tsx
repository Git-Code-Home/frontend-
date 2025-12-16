import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Eye, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import adminApi from "@/lib/adminApi"
import BASE_URL from "@/lib/BaseUrl"

interface Document {
  fieldName: string
  fileName: string
  url: string
}

interface ClientApplication {
  _id: string
  clientId: string
  country: string
  visaType: string
  visaDuration: string
  status: string
  formData: Record<string, any>
  documents: Document[]
  createdAt: string
  updatedAt: string
}

interface ClientInfo {
  _id: string
  name: string
  email: string
  mobileNumber: string
}

const AdminClientApplicationsDetail = () => {
  const navigate = useNavigate()
  const { clientId } = useParams<{ clientId: string }>()
  const { toast } = useToast()
  const [applications, setApplications] = useState<ClientApplication[]>([])
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedApp, setExpandedApp] = useState<string | null>(null)

  useEffect(() => {
    if (clientId) {
      fetchClientApplications()
    }
  }, [clientId])

  const fetchClientApplications = async () => {
    try {
      setLoading(true)

      // Get client info
      const clientData = await adminApi.get(`/clients/${clientId}`)
      if (clientData) {
        setClientInfo(clientData)
      }

      // Get client's applications
      const appData = await adminApi.get(`/clients/${clientId}/applications`)
      setApplications(Array.isArray(appData) ? appData : [])
    } catch (err: any) {
      console.error("Error fetching applications:", err)
      toast({ title: "Error", description: err.message || "Failed to fetch applications", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadDocument = async (appId: string, fieldName: string, fileName: string) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
      const downloadUrl = `${BASE_URL}/api/admin/applications/${appId}/documents/download?field=${fieldName}`

      const res = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to download document")
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName || fieldName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({ title: "Success", description: "Document downloaded", variant: "default" })
    } catch (err: any) {
      console.error("Download error:", err)
      toast({ title: "Error", description: "Failed to download document", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate("/admin/client-applications")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>

        {clientInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{clientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{clientInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">{clientInfo.mobileNumber}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No applications found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {app.country} - {app.visaType} ({app.visaDuration})
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Submitted: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="capitalize font-medium">{app.status}</span>
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedApp(expandedApp === app._id ? null : app._id)}
                      >
                        {expandedApp === app._id ? "Hide" : "Show"} Details
                      </Button>
                    </div>

                    {expandedApp === app._id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div>
                          <h4 className="font-semibold mb-3">Form Data</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {app.formData &&
                              Object.entries(app.formData).map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                                  <p className="font-medium text-sm">{String(value) || "—"}</p>
                                </div>
                              ))}
                          </div>
                        </div>

                        {app.documents && app.documents.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Uploaded Documents</h4>
                            <div className="space-y-2">
                              {app.documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <div>
                                      <p className="text-sm font-medium">{doc.fieldName}</p>
                                      <p className="text-xs text-muted-foreground">{doc.fileName}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        window.open(`${BASE_URL}${doc.url}`, "_blank")
                                      }}
                                      title="View document"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDownloadDocument(app._id, doc.fieldName, doc.fileName)}
                                      title="Download document"
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminClientApplicationsDetail
