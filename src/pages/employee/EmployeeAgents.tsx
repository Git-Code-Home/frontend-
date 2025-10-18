// "use client"

// import { useEffect, useState } from "react"
// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { User, Search, Mail, Phone } from "lucide-react"
// import BASE_URL from "@/lib/BaseUrl"

// type Agent = {
//   _id: string
//   name: string
//   email: string
//   phone?: string
//   status?: string
// }

// const EmployeeAgents = () => {
//   const [agents, setAgents] = useState<Agent[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         setLoading(true)
//         const token =
//           typeof window !== "undefined"
//             ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token
//             : null

//         const res = await fetch(`${BASE_URL}/api/agent/list`, {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           credentials: "include",
//         })
//         if (!res.ok) throw new Error("Failed to fetch agents")
//         const data = await res.json()
//         setAgents(data)
//         setError(null)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load agents")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchAgents()
//   }, [])

//   const filteredAgents = agents.filter(
//     (agent) =>
//       agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (agent.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <DashboardLayout userRole="employee" userName="Employee User">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Agents</h1>
//           <p className="text-muted-foreground">
//             View and contact agents in the system
//           </p>
//         </div>

//         <div className="max-w-md mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search agents by name, email, or phone..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <Card className="shadow-card border-0">
//           <CardHeader>
//             <CardTitle>Agent List</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="text-center py-8 text-lg">Loading agents...</div>
//             ) : error ? (
//               <div className="text-center py-8 text-destructive">
//                 Error: {error}
//               </div>
//             ) : filteredAgents.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 No agents found.
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredAgents.map((agent) => (
//                   <div
//                     key={agent._id}
//                     className="p-4 rounded-lg border hover:shadow-md transition-shadow flex items-center space-x-4"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
//                       <User className="h-6 w-6 text-primary" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-semibold text-lg">{agent.name}</div>
//                       <div className="flex items-center text-sm text-muted-foreground space-x-2">
//                         <Mail className="h-4 w-4" />
//                         <span>{agent.email}</span>
//                         {agent.phone && (
//                           <>
//                             <Phone className="h-4 w-4 ml-2" />
//                             <span>{agent.phone}</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                     <Badge>
//                       {agent.status ? agent.status : "Active"}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EmployeeAgents



// "use client"

// import { useEffect, useState } from "react"
// import DashboardLayout from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { User, Search, Mail, Phone } from "lucide-react"
// import BASE_URL from "@/lib/BaseUrl"

// type Agent = {
//   _id: string
//   name: string
//   email: string
//   phone?: string
//   status?: string
// }

// const EmployeeAgents = () => {
//   const [agents, setAgents] = useState<Agent[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [newAgent, setNewAgent] = useState({ name: '', email: '', phone: '', status: 'Active' })
//   const [adding, setAdding] = useState(false)

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         setLoading(true)
//         const token =
//           typeof window !== "undefined"
//             ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token
//             : null

//         const res = await fetch(`${BASE_URL}/api/agent/list`, {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           credentials: "include",
//         })
//         if (!res.ok) throw new Error("Failed to fetch agents")
//         const data = await res.json()
//         setAgents(data)
//         setError(null)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load agents")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchAgents()
//   }, [])

//   const handleAddAgent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       const token =
//         typeof window !== "undefined"
//           ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token
//           : null;
//       const res = await fetch(`${BASE_URL}/api/agent/add`, {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//         credentials: "include",
//         body: JSON.stringify(newAgent)
//       });
//       if (!res.ok) throw new Error("Failed to add agent");
//       const agent = await res.json();
//       setAgents((prev) => [...prev, agent]);
//       setNewAgent({ name: '', email: '', phone: '', status: 'Active' });
//       setError(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to add agent");
//     } finally {
//       setAdding(false);
//     }
//   };

//   const filteredAgents = agents.filter(
//     (agent) =>
//       agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (agent.phone || "").toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <DashboardLayout userRole="employee" userName="Employee User">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Agents</h1>
//           <p className="text-muted-foreground">
//             View and contact agents in the system
//           </p>
//         </div>

//         {/* Add Agent Form */}
//         <form onSubmit={handleAddAgent} className="mb-6 space-y-2 max-w-md">
//           <h2 className="text-lg font-semibold">Add New Agent</h2>
//           <Input
//             placeholder="Name"
//             value={newAgent.name}
//             onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
//             required
//           />
//           <Input
//             placeholder="Email"
//             value={newAgent.email}
//             onChange={e => setNewAgent({ ...newAgent, email: e.target.value })}
//             required
//           />
//           <Input
//             placeholder="Phone"
//             value={newAgent.phone}
//             onChange={e => setNewAgent({ ...newAgent, phone: e.target.value })}
//           />
//           <Input
//             placeholder="Status"
//             value={newAgent.status}
//             onChange={e => setNewAgent({ ...newAgent, status: e.target.value })}
//           />
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={adding}>
//             {adding ? "Adding..." : "Add Agent"}
//           </button>
//         </form>

//         <div className="max-w-md mb-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search agents by name, email, or phone..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <Card className="shadow-card border-0">
//           <CardHeader>
//             <CardTitle>Agent List</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="text-center py-8 text-lg">Loading agents...</div>
//             ) : error ? (
//               <div className="text-center py-8 text-destructive">
//                 Error: {error}
//               </div>
//             ) : filteredAgents.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 No agents found.
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredAgents.map((agent) => (
//                   <div
//                     key={agent._id}
//                     className="p-4 rounded-lg border hover:shadow-md transition-shadow flex items-center space-x-4"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
//                       <User className="h-6 w-6 text-primary" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-semibold text-lg">{agent.name}</div>
//                       <div className="flex items-center text-sm text-muted-foreground space-x-2">
//                         <Mail className="h-4 w-4" />
//                         <span>{agent.email}</span>
//                         {agent.phone && (
//                           <>
//                             <Phone className="h-4 w-4 ml-2" />
//                             <span>{agent.phone}</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                     <Badge>
//                       {agent.status ? agent.status : "Active"}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default EmployeeAgents

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Mail, Phone, Users, MoreHorizontal, Ban, UserPlus } from "lucide-react"
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

interface Agent {
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

interface Client {
  _id: string
  name: string
  email: string
}

const EmployeeAgents = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [assignClientOpen, setAssignClientOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [selectedClientId, setSelectedClientId] = useState("")

  // Add agent state
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newDesignation, setNewDesignation] = useState("")

  // Edit agent state
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editDesignation, setEditDesignation] = useState("")
  const [editStatus, setEditStatus] = useState("")

  const apiBase = BASE_URL.replace(/\/$/, "")

  const fetchAgents = async () => {
    try {
      setLoading(true)
      const token = typeof window !== "undefined" 
        ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
        : null

      const url = `${apiBase}/api/public/agents`
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
      const mapped: Agent[] = (Array.isArray(rawList) ? rawList : []).map((a: any) => ({
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
      setAgents(mapped)
    } catch (error: any) {
      console.error("Error fetching agents:", error?.message || error)
      setAgents([])
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const token = typeof window !== "undefined" 
        ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
        : null

      const res = await fetch(`${apiBase}/api/employee/clients`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (!res.ok) throw new Error("Failed to fetch clients")
      const data = await res.json()
      setClients(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching clients:", error)
      setClients([])
    }
  }

  useEffect(() => {
    fetchAgents()
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
      : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const newAgent: Agent = {
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

      setAgents((prev) => [...prev, newAgent])
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

  const handleEditAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAgent) return
    const token = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
      : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents/${selectedAgent._id}`
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      setAgents((prev) =>
        prev.map((agent) =>
          agent._id === selectedAgent._id
            ? {
                ...agent,
                name: data?.name || editName,
                email: data?.email || editEmail,
                phone: data?.phone || editPhone,
                designation: data?.designation || editDesignation,
                status: data?.isBlocked ? "Inactive" : editStatus || "Active",
              }
            : agent,
        ),
      )

      setEditOpen(false)
      setSelectedAgent(null)
    } catch (error) {
      console.error("Error editing agent:", error)
      alert("Failed to edit agent. See console for details.")
    }
  }

  const handleDeleteAgent = async () => {
    if (!selectedAgent) return
    const token = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
      : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents/${selectedAgent._id}`
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || `Failed to delete agent (status ${res.status})`)
        return
      }

      setAgents((prev) => prev.filter((agent) => agent._id !== selectedAgent._id))
      setDeleteOpen(false)
      setSelectedAgent(null)
    } catch (error) {
      console.error("Error deleting agent:", error)
      alert("Failed to delete agent. See console for details.")
    }
  }

  const handleToggleBlock = async (agent: Agent) => {
    const token = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
      : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/public/agents/${agent._id}/block`
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || `Failed to toggle block (status ${res.status})`)
        return
      }

      const isBlocked = data?.agent?.isBlocked ?? data?.isBlocked ?? false
      setAgents((prev) => prev.map((a) => (a._id === agent._id ? { ...a, status: isBlocked ? "Inactive" : "Active" } : a)))
    } catch (error) {
      console.error("Error toggling block:", error)
      alert("Failed to toggle block. See console for details.")
    }
  }

  const handleAssignClient = async () => {
    if (!selectedAgent || !selectedClientId) return
    const token = typeof window !== "undefined" 
      ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token 
      : null
    if (!token) {
      alert("Not authenticated")
      return
    }

    try {
      const url = `${apiBase}/api/employee/assign-client`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          agentId: selectedAgent._id,
          clientId: selectedClientId,
        }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        alert((data && data.message) || "Failed to assign client")
        return
      }

      alert("Client assigned successfully!")
      setAssignClientOpen(false)
      setSelectedClientId("")
      fetchAgents() // Refresh to update client count
    } catch (error) {
      console.error("Error assigning client:", error)
      alert("Failed to assign client. See console for details.")
    }
  }

  const openEditDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setEditName(agent.name)
    setEditEmail(agent.email || "")
    setEditPhone(agent.phone || "")
    setEditDesignation(agent.designation || "")
    setEditStatus(agent.status || "Active")
    setEditOpen(true)
  }

  const openDeleteDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setDeleteOpen(true)
  }

  const openAssignClientDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setSelectedClientId("")
    setAssignClientOpen(true)
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

  const filteredAgents = agents.filter((agent) => {
    const name = agent.name?.toLowerCase() || ""
    const email = agent.email?.toLowerCase() || ""
    const designation = agent.designation?.toLowerCase() || ""
    const term = searchTerm.toLowerCase()

    return name.includes(term) || email.includes(term) || designation.includes(term)
  })

  return (
    <DashboardLayout userRole="employee" userName="Employee User">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Agents Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage visa processing agents and assign clients
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
              <form onSubmit={handleAddAgent} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
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
                    placeholder="john.doe@example.com"
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
                    Add Agent
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
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

        {/* Agent List */}
        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Agents Directory</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : filteredAgents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No agents found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent._id}
                    className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01]"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm sm:text-base">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                            <h3 className="font-semibold text-base sm:text-lg">{agent.name}</h3>
                            <Badge className={`${getStatusColor(agent.status || "")} rounded-full px-3 py-1 w-fit`}>
                              {agent.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {agent.role || "agent"} • {agent.designation || "—"}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                            <div className="flex items-center text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full w-fit">
                              <Mail className="mr-1 h-3 w-3" />
                              <span className="truncate">{agent.email}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full w-fit">
                              <Phone className="mr-1 h-3 w-3" />
                              {agent.phone || "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end space-x-4 lg:space-x-6">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="text-center bg-primary/5 px-3 sm:px-4 py-2 rounded-2xl">
                            <div className="text-base sm:text-lg font-bold text-primary">{agent.clients}</div>
                            <div className="text-xs text-muted-foreground">Clients</div>
                          </div>
                          <div className="text-center bg-success/5 px-3 sm:px-4 py-2 rounded-2xl">
                            <div className="text-base sm:text-lg font-bold text-success">{agent.processed}</div>
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
                            <DropdownMenuItem onClick={() => openEditDialog(agent)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openAssignClientDialog(agent)}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Assign Client
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Clients
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleBlock(agent)}>
                              <Ban className="mr-2 h-3 w-3" />
                              {agent.status === "Inactive" ? "Unblock" : "Block"} Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(agent)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Agent
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

        {/* Edit Agent Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
              <DialogDescription>Update the agent's details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditAgent} className="grid gap-4">
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

        {/* Assign Client Dialog */}
        <Dialog open={assignClientOpen} onOpenChange={setAssignClientOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Client to Agent</DialogTitle>
              <DialogDescription>
                Select a client to assign to {selectedAgent?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Select Client</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.length === 0 ? (
                      <SelectItem value="no-clients" disabled>
                        No clients available
                      </SelectItem>
                    ) : (
                      clients.map((client) => (
                        <SelectItem key={client._id} value={client._id}>
                          {client.name} - {client.email}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="sm:justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setAssignClientOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignClient}
                  className="bg-gradient-primary"
                  disabled={!selectedClientId}
                >
                  Assign Client
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Agent Dialog */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the agent account for{" "}
                <strong>{selectedAgent?.name}</strong> and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAgent} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeAgents