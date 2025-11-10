import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ClientApplications = () => {
  const applications = [
    {
      id: "VA025",
      type: "Tourist Visa",
      status: "Approved",
      submitDate: "2024-01-10",
      issueDate: "2024-01-15",
      expiryDate: "2024-07-15",
      validityDays: 181,
    },
    {
      id: "VA026",
      type: "Business Visa",
      status: "Under Review",
      submitDate: "2024-01-14",
      issueDate: null,
      expiryDate: null,
      validityDays: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Under Review":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const navigate = useNavigate()

  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-slate-600 mt-1">Track all your visa applications</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-2xl bg-blue-100">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{app.type}</h3>
                      <p className="text-sm text-slate-600">Application {app.id}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(app.status)} rounded-full px-3 py-1 border`}>{app.status}</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Submit Date</p>
                    <p className="font-medium text-slate-900">{app.submitDate}</p>
                  </div>
                  {app.issueDate && (
                    <>
                      <div>
                        <p className="text-sm text-slate-600">Issue Date</p>
                        <p className="font-medium text-slate-900">{app.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Expiry Date</p>
                        <p className="font-medium text-slate-900">{app.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Validity</p>
                        <p className="font-medium text-slate-900">{app.validityDays} days</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/client/applications/${app.id}`)}
                    className="rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  {app.status === "Approved" && (
                    <Button
                      size="sm"
                      onClick={() => (window.location.href = `/client/applications/${app.id}/download`)}
                      className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ClientApplications
