import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Download, Eye } from "lucide-react"
import adminApi from "@/lib/adminApi"

interface Payment {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  application: {
    _id: string
    visaType: string
    country: string
  }
  gateway: "stripe" | "paypal"
  amount: number
  currency: string
  paymentStatus: "pending" | "completed" | "failed" | "cancelled"
  transactionId: string
  createdAt: string
  completedAt?: string
}

export default function AdminPaymentDashboard() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [gatewayFilter, setGatewayFilter] = useState("all")

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const data = await adminApi.get("/payments")
      setPayments(data || [])
    } catch (error) {
      console.error("Failed to fetch payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "cancelled":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getGatewayBadgeColor = (gateway: string) => {
    switch (gateway) {
      case "stripe":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "paypal":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.application.visaType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.paymentStatus === statusFilter
    const matchesGateway = gatewayFilter === "all" || payment.gateway === gatewayFilter

    return matchesSearch && matchesStatus && matchesGateway
  })

  const totalAmount = filteredPayments
    .filter((p) => p.paymentStatus === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const completedCount = filteredPayments.filter((p) => p.paymentStatus === "completed").length
  const pendingCount = filteredPayments.filter((p) => p.paymentStatus === "pending").length
  const failedCount = filteredPayments.filter((p) => p.paymentStatus === "failed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Payment Management
        </h1>
        <p className="text-slate-600 mt-1">Track all client payments across Stripe and PayPal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">{completedCount} completed payments</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <p className="text-xs text-slate-500 mt-1">Successful payments</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-slate-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedCount}</div>
            <p className="text-xs text-slate-500 mt-1">Failed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="rounded-2xl border-slate-200">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={gatewayFilter} onValueChange={setGatewayFilter}>
          <SelectTrigger className="rounded-2xl border-slate-200">
            <SelectValue placeholder="Filter by gateway" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gateways</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card className="rounded-3xl border-slate-200">
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>{filteredPayments.length} payments found</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <p className="text-slate-600">Loading payments...</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <p className="text-slate-600">No payments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 hover:bg-slate-50">
                    <TableHead className="text-slate-700 font-semibold">Client</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Application</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Amount</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Gateway</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Transaction ID</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Date</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow
                      key={payment._id}
                      className="border-slate-200 hover:bg-slate-50 transition-colors duration-200"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{payment.user.name}</p>
                          <p className="text-sm text-slate-600">{payment.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{payment.application.visaType}</p>
                          <p className="text-sm text-slate-600">{payment.application.country}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-slate-900">
                          ${payment.amount.toFixed(2)} {payment.currency}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getGatewayBadgeColor(payment.gateway)} rounded-full px-2 py-1 text-xs font-medium border`}
                        >
                          {payment.gateway === "stripe" ? "💳 Stripe" : "🅿️ PayPal"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getPaymentStatusColor(payment.paymentStatus)} rounded-full px-2 py-1 text-xs font-medium border`}
                        >
                          {payment.paymentStatus.charAt(0).toUpperCase() + payment.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {payment.transactionId.substring(0, 20)}...
                        </code>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-slate-600">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-slate-200 hover:bg-slate-50 bg-transparent"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
