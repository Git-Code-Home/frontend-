"use client"

import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMyClients, getMyApplications, type Client, type Application } from "../../lib/employee"

const EmployeeDashboard = () => {
  const navigate = useNavigate()

  const [clients, setClients] = useState<Client[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [clientsData, applicationsData] = await Promise.all([getMyClients(), getMyApplications()])
        setClients(clientsData)
        setApplications(applicationsData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        console.error("[v0] Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const applicationsToday = applications.filter((app) => new Date(app.createdAt) >= todayStart).length

  const pendingReview = applications.filter(
    (app) => app.applicationStatus === "pending" || app.applicationStatus === "under_review",
  ).length

  const completedToday = applications.filter(
    (app) => app.applicationStatus === "completed" && new Date(app.createdAt) >= todayStart,
  ).length

  const myStats = [
    { title: "My Clients", value: clients.length.toString(), icon: Users, color: "text-blue-400" },
    { title: "Applications Today", value: applicationsToday.toString(), icon: FileText, color: "text-indigo-400" },
    { title: "Pending Review", value: pendingReview.toString(), icon: Clock, color: "text-amber-400" },
    { title: "Completed Today", value: completedToday.toString(), icon: CheckCircle, color: "text-emerald-400" },
  ]

  const myApplications = applications.slice(0, 4).map((app) => {
    const clientName = app.client.name

    return {
      id: app._id,
      client: clientName,
      type: app.visaType,
      status: app.applicationStatus,
      urgent: app.processingPriority === "urgent",
    }
  })

  const todayTasks = [
    { task: "Review pending documents", priority: "High", time: "10:00 AM" },
    { task: "Update application statuses", priority: "Medium", time: "11:30 AM" },
    { task: "Send client reminders", priority: "Low", time: "2:00 PM" },
    { task: "Process payment confirmations", priority: "High", time: "4:00 PM" },
  ]

  const handleapplication = () => {
    navigate("/employee/new-application")
  }

  if (loading) {
    return (
      <DashboardLayout userRole="employee" userName="Sarah Johnson">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userRole="employee" userName="Sarah Johnson">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium mb-2">Error loading dashboard</p>
            <p className="text-slate-600 text-sm">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Retry
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Dashboard
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">Manage your assigned clients and applications</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleapplication}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {myStats.map((stat) => (
            <Card
              key={stat.title}
              className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <div className="p-2 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* My Applications */}
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {myApplications.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No applications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50"
                    >
                      <div className="flex items-center space-x-4">
                        {app.urgent && (
                          <div className="p-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-800">{app.client}</div>
                          <div className="text-sm text-slate-500">
                            {app.id} • {app.type}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          app.status === "completed"
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                            : app.status === "pending"
                              ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm text-slate-800">{task.task}</div>
                      <div className="text-xs text-slate-500">{task.time}</div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === "High"
                          ? "bg-gradient-to-r from-red-100 to-pink-100 text-red-700"
                          : task.priority === "Medium"
                            ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                            : "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <Users className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-slate-700">Register Client</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <FileText className="h-6 w-6 mb-2 text-indigo-600" />
                <span className="text-slate-700">New Application</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <Clock className="h-6 w-6 mb-2 text-amber-600" />
                <span className="text-slate-700">Update Status</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                <CheckCircle className="h-6 w-6 mb-2 text-emerald-600" />
                <span className="text-slate-700">Generate Link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeDashboard
