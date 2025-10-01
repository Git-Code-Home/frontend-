"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, Phone, Mail, FileText, Eye, MessageCircle, MoreHorizontal, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getMyClients, type Client } from "@/lib/employee"
import { useToast } from "@/hooks/use-toast"

const EmployeeClients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const data = await getMyClients()
        console.log("[v0] Fetched clients:", data)
        setClients(data)
      } catch (error) {
        console.error("[v0] Error fetching clients:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch clients",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
      case "Pending":
        return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
      case "Inactive":
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
      default:
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600"
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userRole="employee" userName="Sarah Johnson">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Clients
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">Manage your assigned clients and their applications</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Register New Client
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Clients</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{clients.length}</div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">With Email</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
                <Mail className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{clients.filter((c) => c.email).length}</div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">With Phone</CardTitle>
              <div className="p-2 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
                <Phone className="h-4 w-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{clients.filter((c) => c.phone).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Client Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                {searchTerm ? "No clients found matching your search" : "No clients assigned yet"}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div
                    key={client._id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50 hover:shadow-md"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{client.name}</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {client.email}
                            </div>
                            {client.phone && (
                              <div className="flex items-center">
                                <Phone className="mr-1 h-3 w-3" />
                                {client.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        {client.phone && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-2xl border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}

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
                            <DropdownMenuItem className="rounded-xl">
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl">
                              <FileText className="mr-2 h-4 w-4" />
                              View Applications
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl">
                              <Plus className="mr-2 h-4 w-4" />
                              New Application
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Register Client Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[520px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Register New Client</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-slate-600">Client registration form will be implemented here</div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeClients
