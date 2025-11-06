"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Calendar, FileText, Phone, Mail, MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Client, type Application, getMyClients, getMyApplications } from "@/lib/agent"

const AgentClients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [clients, setClients] = useState<Client[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [c, a] = await Promise.all([getMyClients(), getMyApplications()])
        setClients(c)
        setApplications(a)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load clients")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const navigate = useNavigate()

  const getClientType = (client: Client) => (client.unqualified ? "Unqualified" : "Qualified")

  const getClientStatus = (client: Client): string => {
    const clientApplications = applications.filter((app) => app.client?._id === client._id)
    if (clientApplications.length === 0) return "Pending"
    const hasActive = clientApplications.some(
      (app) => app.applicationStatus === "processing" || app.applicationStatus === "submitted",
    )
    return hasActive ? "Active" : "Inactive"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground"
      case "Pending":
        return "bg-warning text-warning-foreground"
      case "Inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Qualified":
        return "bg-accent text-accent-foreground"
      case "Unqualified":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  const totalApplications = applications.length
  const getClientApplicationsCount = (clientId: string) =>
    applications.filter((app) => app.client?._id === clientId).length

  const filteredClients = clients.filter((client) => {
    const clientType = getClientType(client)
    const clientStatus = getClientStatus(client)
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || clientStatus.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || clientType.toLowerCase() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <DashboardLayout userRole="agent" userName="Agent User">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading clients...</div>
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
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Client Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">View clients assigned to you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="rounded-2xl">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="rounded-2xl">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="unqualified">Unqualified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="border-0 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Total Clients</CardTitle>
              <div className="p-3 rounded-2xl">
                <Users className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Qualified</CardTitle>
              <div className="p-3 rounded-2xl">
                <Users className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{clients.filter((c) => !c.unqualified).length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">Active</CardTitle>
              <div className="p-3 rounded-2xl">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                {clients.filter((c) => getClientStatus(c) === "Active").length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm sm:text-base font-medium text-muted-foreground">
                Total Applications
              </CardTitle>
              <div className="p-3 rounded-2xl">
                <FileText className="h-4 w-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No clients found matching your criteria.</div>
              ) : (
                filteredClients.map((client) => {
                  const clientType = client.unqualified ? "Unqualified" : "Qualified"
                  const clientStatus = getClientStatus(client)
                  const applicationsCount = getClientApplicationsCount(client._id)
                  return (
                    <div
                      key={client._id}
                      className="p-4 sm:p-6 rounded-2xl border hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-4 xl:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm sm:text-base">
                              {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                              <h3 className="font-semibold text-base sm:text-lg">{client.name}</h3>
                              <div className="flex flex-wrap gap-2">
                                <Badge className={`${getStatusColor(clientStatus)} rounded-full px-3 py-1 w-fit`}>
                                  {clientStatus}
                                </Badge>
                                <Badge className={`${getTypeColor(clientType)} rounded-full px-3 py-1 w-fit`}>
                                  {clientType}
                                </Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Mail className="mr-1 h-3 w-3" />
                                <span className="truncate">{client.email}</span>
                              </div>
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Phone className="mr-1 h-3 w-3" />
                                {client.phone}
                              </div>
                              <div className="flex items-center bg-muted/20 px-2 py-1 rounded-full w-fit">
                                <Calendar className="mr-1 h-3 w-3" />
                                Joined: {formatDate(client.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between xl:justify-end space-x-4 xl:space-x-6">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="text-center bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
                              <div className="text-base sm:text-lg font-bold text-primary">{applicationsCount}</div>
                              <div className="text-xs text-muted-foreground">Applications</div>
                            </div>
                            <div className="text-center bg-muted/20 px-3 sm:px-4 py-2 rounded-2xl">
                              <div className="text-sm font-medium">{formatDate(client.updatedAt)}</div>
                              <div className="text-xs text-muted-foreground">Last Updated</div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-muted/20">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/agent/clients/${client._id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/agent/clients/${client._id}/applications`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Applications
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
    </DashboardLayout>
  )
}

export default AgentClients
