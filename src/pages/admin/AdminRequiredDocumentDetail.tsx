import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  gender: string
  dateOfBirth: string
  nationality: string
  passportNumber: string
  email: string
  mobileNumber: string
  companyName: string
  jobTitle: string
  monthlySalary: string
  purposeOfVisit: string
  destinationCountry: string
  departureDate: string
  returnDate: string
  durationOfStay: string
  hotelName: string
  flightBooking: string
  travelInsurance: string
  bankStatement: string
  documentsChecklist: string[]
  status: "pending" | "reviewed" | "approved" | "rejected"
  adminNotes: string
  createdAt: string
  updatedAt: string
}

const AdminRequiredDocumentDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()
  const [application, setApplication] = useState<RequiredDocumentApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (id) {
      fetchApplication()
    }
  }, [id])

  const fetchApplication = async () => {
    try {
      setLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
      if (!token) {
        navigate("/admin/login")
        return
      }

      const res = await fetch(`${BASE_URL}/api/client/required-document-applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch application")
      }

      const data = await res.json()
      setApplication(data)
      setStatus(data.status)
      setAdminNotes(data.adminNotes || "")
    } catch (err: any) {
      console.error("Error fetching application:", err)
      toast({ title: "Error", description: "Failed to load application details", variant: "destructive" })
      navigate("/admin/required-documents")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setUpdating(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null

      const res = await fetch(`${BASE_URL}/api/client/required-document-applications/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminNotes }),
      })

      if (!res.ok) {
        throw new Error("Failed to update application")
      }

      toast({ title: "Success", description: "Application updated successfully", variant: "default" })
      navigate("/admin/required-documents")
    } catch (err: any) {
      console.error("Error updating application:", err)
      toast({ title: "Error", description: err.message || "Failed to update", variant: "destructive" })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading application details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!application) {
    return (
      <DashboardLayout userRole="admin" userName="Admin">
        <div className="text-center py-12">
          <p className="text-destructive">Application not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate("/admin/required-documents")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{application.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{application.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nationality</p>
                <p className="font-medium">{application.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passport Number</p>
                <p className="font-mono text-sm">{application.passportNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile Number</p>
                <p className="text-sm">{application.mobileNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="font-medium">{application.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="font-medium">{application.jobTitle}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Salary</p>
                <p className="font-medium">{application.monthlySalary}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Travel Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Purpose of Visit</p>
                <p className="font-medium">{application.purposeOfVisit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Destination Country</p>
                <p className="font-medium">{application.destinationCountry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Departure Date</p>
                <p className="font-medium">{new Date(application.departureDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return Date</p>
                <p className="font-medium">{new Date(application.returnDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration of Stay</p>
                <p className="font-medium">{application.durationOfStay}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accommodation & Travel Documents</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Hotel Name</p>
                <p className="font-medium">{application.hotelName || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flight Booking</p>
                <p className="font-medium">{application.flightBooking || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Travel Insurance</p>
                <p className="font-medium">{application.travelInsurance || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bank Statement</p>
                <p className="font-medium">{application.bankStatement || "—"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Array.isArray(application.documentsChecklist) &&
                  application.documentsChecklist.map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      {doc}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Admin Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Admin Notes</label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  className="mt-2 min-h-32"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => navigate("/admin/required-documents")}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={updating} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  {updating ? "Updating..." : "Update Application"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminRequiredDocumentDetail
