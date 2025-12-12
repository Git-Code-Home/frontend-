"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Mail, Phone, Users, MoreHorizontal, Ban } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BASE_URL from "@/lib/BaseUrl"

interface Employee {
  _id: string
  name: string
  email: string
  phone?: string
  designation?: string
  role?: string
  status?: string
  clients: number
  processed: number
}

const AdminAgents = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newDesignation, setNewDesignation] = useState("")

  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editDesignation, setEditDesignation] = useState("")
  const [editStatus, setEditStatus] = useState("")

  const apiBase = BASE_URL.replace(/\/$/, "")

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null

      const url = `${apiBase}/api/public/agents`
      console.log("[agents] GET", url)
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      const body = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(body?.message || `Failed to fetch agents (status ${res.status})`)
      }

      const rawList = Array.isArray(body) ? body : body?.agents || body?.data || []
      const mapped: Employee[] = (Array.isArray(rawList) ? rawList : []).map((a: any) => ({
        _id: a._id,
        name: a.name,
        email: a.email,
        phone: a.phone || "",
        designation: a.designation || "",
        role: a.role || "agent",
        status: a.isBlocked ? "Inactive" : "Active",
        clients: a.clients ?? 0,
        processed: a.processed ?? 0,
      }))
      setEmployees(mapped)
    } catch (error: any) {
      console.error("Error fetching agents:", error?.message || error)
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents`
      console.log("[agents] POST", url)
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
          phone: newPhone,
          designation: newDesignation,
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        alert((data && data.message) || `Failed to add agent (status ${res.status})`)
        return
      }

      const agent = data?.agent ?? data
      const newEmp: Employee = {
        _id: agent._id || Date.now().toString(),
        name: agent.name || newName,
        email: agent.email || newEmail,
        phone: newPhone,
        designation: newDesignation,
        role: agent.role || "agent",
        status: agent.isBlocked ? "Inactive" : "Active",
        clients: 0,
        processed: 0,
      }

      setEmployees((prev) => [...prev, newEmp])
      setAddOpen(false)
      setNewName("")
      setNewEmail("")
      setNewPassword("")
      setNewPhone("")
      setNewDesignation("")
    } catch (error) {
      console.error("Error adding agent:", error)
      alert("Failed to add agent. See console for details.")
    }
  }

  const handleEditEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEmployee) return
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents/${selectedEmployee._id}`
      console.log("[agents] PUT", url)
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          phone: editPhone,
          designation: editDesignation,
          status: editStatus,
        }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || `Failed to edit agent (status ${res.status})`)
        return
      }

      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === selectedEmployee._id
            ? {
                ...emp,
                name: data?.name || editName,
                email: data?.email || editEmail,
                phone: data?.phone || editPhone,
                designation: data?.designation || editDesignation,
                status: data?.isBlocked ? "Inactive" : editStatus || "Active",
              }
            : emp,
        ),
      )

      setEditOpen(false)
      setSelectedEmployee(null)
    } catch (error) {
      console.error("Error updating agent:", error)
      alert("Failed to update agent. See console for details.")
    }
  }

  const handleDeleteEmployee = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    if (!selectedEmployee) return

    try {
      const res = await fetch(`${apiBase}/api/public/agents/${selectedEmployee._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || `Failed to delete agent (status ${res.status})`)
        return
      }

      setEmployees((prev) => prev.filter((emp) => emp._id !== selectedEmployee._id))
      setDeleteOpen(false)
      setSelectedEmployee(null)
    } catch (error) {
      console.error("Error deleting agent:", error)
      alert("Failed to delete agent. See console for details.")
    }
  }

  const handleToggleBlock = async (emp: Employee) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents/${emp._id}/block`
      console.log("[agents] TOGGLE BLOCK", url)
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || `Failed to toggle block (status ${res.status})`)
        return
      }

      const isBlocked = data?.agent?.isBlocked ?? data?.isBlocked ?? false
      setEmployees((prev) => prev.map((e) => (e._id === emp._id ? { ...e, status: isBlocked ? "Inactive" : "Active" } : e)))
    } catch (error) {
      console.error("Error toggling block:", error)
      alert("Failed to toggle block. See console for details.")
    }
  }

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setEditName(employee.name)
    setEditEmail(employee.email || "")
    setEditPhone(employee.phone || "")
    setEditDesignation(employee.designation || "")
    setEditStatus(employee.status || "Active")
    setEditOpen(true)
  }

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setDeleteOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground"
      case "On Leave":
        return "bg-warning text-warning-foreground"
      case "Inactive":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const name = employee.name?.toLowerCase() || ""
    const email = employee.email?.toLowerCase() || ""
    const designation = employee.designation?.toLowerCase() || ""
    const term = searchTerm.toLowerCase()

    return name.includes(term) || email.includes(term) || designation.includes(term)
  })

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Agents Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage visa processing staff and their assignments
            </p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Agent</DialogTitle>
                <DialogDescription>Provide the Agent's details to create their account.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Sarah Johnson"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sarah.johnson@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter a temporary password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Designation</Label>
                  <Select value={newDesignation} onValueChange={setNewDesignation}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Senior Officer">Senior Officer</SelectItem>
                      <SelectItem value="Junior Officer">Junior Officer</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    required
                  />
                </div>
                <DialogFooter className="sm:justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-primary"
                    disabled={!newName || !newEmail || !newPassword || !newPhone || !newDesignation}
                  >
                    Add Agents
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="pt-4 sm:pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search Agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors text-sm sm:text-base"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Agents Directory</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee._id}
                    className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01]"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm sm:text-base">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <h3 className="font-semibold text-base sm:text-lg">{employee.name}</h3>
                            <Badge className={`${getStatusColor(employee.status || "")} rounded-full px-3 py-1 w-fit`}>
                              {employee.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {employee.role || "agent"} • {employee.designation || "—"}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                            <div className="flex items-center text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full w-fit">
                              <Mail className="mr-1 h-3 w-3" />
                              <span className="truncate">{employee.email}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full w-fit">
                              <Phone className="mr-1 h-3 w-3" />
                              {employee.phone || "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end space-x-4 lg:space-x-6">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="text-center bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
                            <div className="text-base sm:text-lg font-bold text-primary">{employee.clients}</div>
                            <div className="text-xs text-muted-foreground">Clients</div>
                          </div>
                          <div className="text-center bg-success/5 px-3 sm:px-4 py-2 rounded-2xl">
                            <div className="text-base sm:text-lg font-bold text-success">{employee.processed}</div>
                            <div className="text-xs text-muted-foreground">Processed</div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-2xl hover:bg-muted/20">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                navigate(`/admin/clients?agentId=${employee._id}`)
                              }}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              View Clients
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleBlock(employee)}>
                              <Ban className="mr-2 h-3 w-3" />
                              {employee.status === "Inactive" ? "Unblock" : "Block"} Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(employee)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Employee
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

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
              <DialogDescription>Update the agent's details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditEmployee} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  type="text"
                  placeholder="Agent Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="agent@example.com"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Designation</Label>
                <Select value={editDesignation} onValueChange={setEditDesignation}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Senior Officer">Senior Officer</SelectItem>
                    <SelectItem value="Junior Officer">Junior Officer</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="sm:justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-primary"
                  disabled={!editName || !editEmail || !editPhone || !editDesignation || !editStatus}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the agent account for{" "}
                <strong>{selectedEmployee?.name}</strong> and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEmployee} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}

export default AdminAgents
