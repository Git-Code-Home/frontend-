import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const AdminDashboard = () => {
  const stats = [
    { title: "Total Clients", value: "1,247", icon: Users, change: "+12%", color: "text-accent" },
    { title: "Active Applications", value: "89", icon: FileText, change: "+5%", color: "text-primary" },
    { title: "Expiring Visas", value: "23", icon: Clock, change: "+2%", color: "text-warning" },
    { title: "Revenue (AED)", value: "485,320", icon: DollarSign, change: "+18%", color: "text-success" },
  ]

  const applicationStats = [
    { status: "Processing", count: 45, color: "bg-warning", icon: Clock },
    { status: "Approved", count: 312, color: "bg-success", icon: CheckCircle },
    { status: "Rejected", count: 18, color: "bg-destructive", icon: XCircle },
    { status: "Expired", count: 67, color: "bg-muted", icon: AlertTriangle },
  ]

  const recentApplications = [
    { id: "VA001", client: "Ahmed Hassan", type: "Tourist Visa", status: "Processing", date: "2024-01-15" },
    { id: "VA002", client: "Sarah Johnson", type: "Business Visa", status: "Approved", date: "2024-01-14" },
    { id: "VA003", client: "Mohammad Ali", type: "Transit Visa", status: "Processing", date: "2024-01-14" },
    { id: "VA004", client: "Emma Wilson", type: "Tourist Visa", status: "Approved", date: "2024-01-13" },
  ]

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">Monitor system performance and key metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 ${stat.color}`}>
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationStats.map((stat) => (
                <div
                  key={stat.status}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${stat.color} shadow-lg`} />
                    <span className="font-medium">{stat.status}</span>
                  </div>
                  <div className="bg-background/50 px-3 py-1 rounded-full">
                    <span className="font-bold">{stat.count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
                <span className="font-medium">Approval Rate</span>
                <span className="font-bold text-success text-lg">94.5%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
                <span className="font-medium">Avg. Processing Time</span>
                <span className="font-bold text-lg">3.2 days</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/20">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="font-bold text-success text-lg">4.8/5</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/10">
                <span className="font-medium">Active Employees</span>
                <span className="font-bold text-lg">12</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-200 border border-primary/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="font-semibold text-primary">Add New Employee</div>
                <div className="text-sm text-muted-foreground mt-1">Create employee account</div>
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/20 transition-all duration-200 border border-accent/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="font-semibold text-accent">Generate Report</div>
                <div className="text-sm text-muted-foreground mt-1">Monthly analytics report</div>
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-warning/5 to-warning/10 hover:from-warning/10 hover:to-warning/20 transition-all duration-200 border border-warning/20 hover:shadow-lg hover:transform hover:scale-[1.02]">
                <div className="font-semibold text-warning">Review Expiring Visas</div>
                <div className="text-sm text-muted-foreground mt-1">Check renewal alerts</div>
              </button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01] space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{app.client}</div>
                      <div className="text-sm text-muted-foreground">
                        {app.id} • {app.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                    <span
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full ${
                        app.status === "Approved"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-warning/10 text-warning border border-warning/20"
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground bg-muted/20 px-2 sm:px-3 py-1 rounded-full">
                      {app.date}
                    </span>
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

export default AdminDashboard
