import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, Calendar, Plus, Download, AlertTriangle } from "lucide-react"

const ClientDashboard = () => {
  const myStats = [
    { title: "Total Applications", value: "3", icon: FileText, color: "text-blue-600" },
    { title: "Active Visas", value: "1", icon: CheckCircle, color: "text-emerald-600" },
    { title: "Pending", value: "1", icon: Clock, color: "text-amber-600" },
    { title: "Expiring Soon", value: "0", icon: AlertTriangle, color: "text-red-600" },
  ]

  const myApplications = [
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
    {
      id: "VA027",
      type: "Transit Visa",
      status: "Documents Required",
      submitDate: "2024-01-16",
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
      case "Documents Required":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const calculateDaysRemaining = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Dashboard
            </h1>
            <p className="text-slate-600 mt-1">Track your visa applications and manage your profile</p>
          </div>
          <Button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 px-6">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {myStats.map((stat) => (
            <Card
              key={stat.title}
              className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
                Active Visa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Visa Type</span>
                  <span className="text-sm text-slate-900">Tourist Visa</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Issue Date</span>
                  <span className="text-sm text-slate-900">15 Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Expiry Date</span>
                  <span className="text-sm text-slate-900">15 Jul 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Days Remaining</span>
                  <span className="text-sm font-bold text-emerald-600">
                    {calculateDaysRemaining("2024-07-15")} days
                  </span>
                </div>
                <Button
                  className="w-full mt-4 rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Visa
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Apply for New Visa
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-slate-900">{app.type}</div>
                        <div className="text-sm text-slate-600">
                          Application {app.id} • Submitted {app.submitDate}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(app.status)} rounded-full px-3 py-1 border`}>
                      {app.status}
                    </Badge>
                  </div>

                  {app.status === "Approved" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <div className="text-center">
                        <div className="text-sm text-emerald-600">Issue Date</div>
                        <div className="font-medium text-emerald-900">{app.issueDate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-emerald-600">Expiry Date</div>
                        <div className="font-medium text-emerald-900">{app.expiryDate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-emerald-600">Validity</div>
                        <div className="font-medium text-emerald-900">{app.validityDays} days</div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-end mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-slate-200 hover:bg-slate-50 bg-transparent"
                    >
                      View Details
                    </Button>
                    {app.status === "Approved" && (
                      <Button
                        size="sm"
                        className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ClientDashboard
