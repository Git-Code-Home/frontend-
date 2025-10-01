"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Award,
  Save,
  Edit,
  FileText,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"

interface EmployeeInfo {
  _id: string
  name: string
  email: string
  role: string
  designation: string
  phone: string
  status: string
  token: string
}

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    department: "Visa Processing",
    role: "",
    status: "",
    joinDate: "2022-03-15",
    address: "Dubai, United Arab Emirates",
    emergencyContact: "",
    skills: ["Document Verification", "Customer Service", "Arabic Language", "Compliance Review"],
    certifications: ["Dubai Visa Processing Certificate", "Customer Service Excellence", "Data Protection Training"],
  })

  useEffect(() => {
    const storedData = localStorage.getItem("employeeInfo")
    if (storedData) {
      try {
        const parsedData: EmployeeInfo = JSON.parse(storedData)
        setEmployeeData((prev) => ({
          ...prev,
          id: parsedData._id,
          name: parsedData.name,
          email: parsedData.email,
          phone: parsedData.phone,
          role: parsedData.designation,
          status: parsedData.status,
        }))
      } catch (error) {
        console.error("Failed to parse employee data from localStorage:", error)
      }
    }
  }, [])

  const performanceStats = [
    { title: "Applications Processed", value: "312", icon: FileText, color: "text-blue-400" },
    { title: "Clients Assigned", value: "47", icon: Users, color: "text-indigo-400" },
    { title: "Avg Processing Time", value: "2.8 days", icon: Clock, color: "text-emerald-400" },
    { title: "Customer Rating", value: "4.9/5", icon: Award, color: "text-amber-400" },
  ]

  const recentActivity = [
    { date: "2024-01-16", action: "Approved tourist visa for Ahmed Hassan", type: "approval" },
    { date: "2024-01-16", action: "Requested additional documents from Maria Garcia", type: "request" },
    { date: "2024-01-15", action: "Completed document review for John Smith", type: "review" },
    { date: "2024-01-15", action: "Updated application status for Emma Wilson", type: "update" },
    { date: "2024-01-14", action: "Registered new client Raj Patel", type: "registration" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <Shield className="h-4 w-4 text-emerald-600" />
      case "request":
        return <Mail className="h-4 w-4 text-amber-600" />
      case "review":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "update":
        return <Edit className="h-4 w-4 text-indigo-600" />
      case "registration":
        return <Users className="h-4 w-4 text-emerald-600" />
      default:
        return <FileText className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <DashboardLayout userRole="employee" userName={employeeData.name || "Employee"}>
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Manage your personal information and view performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <User className="mr-2 h-5 w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 bg-transparent"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={employeeData.name}
                      readOnly
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId" className="text-slate-700 font-medium">
                      Employee ID
                    </Label>
                    <Input
                      id="employeeId"
                      value={employeeData.id}
                      readOnly
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={employeeData.email}
                      className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={employeeData.phone}
                      className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-slate-700 font-medium">
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={employeeData.department}
                      readOnly
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-slate-700 font-medium">
                      Role
                    </Label>
                    <Input
                      id="role"
                      value={employeeData.role}
                      readOnly
                      className="rounded-2xl border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700 font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={employeeData.address}
                    className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-slate-700 font-medium">
                    Emergency Contact
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={employeeData.emergencyContact}
                    className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>

                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Skills & Certifications */}
            <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <Award className="mr-2 h-5 w-5 text-amber-600" />
                  Skills & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {employeeData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="rounded-full border-blue-200 text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">Certifications</Label>
                  <div className="space-y-2 mt-2">
                    {employeeData.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center space-x-2 p-2 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100"
                      >
                        <Award className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-slate-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary & Stats */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {employeeData.name
                      ? employeeData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "?"}
                  </span>
                </div>
                <CardTitle className="text-slate-800">{employeeData.name || "Loading..."}</CardTitle>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                  <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full">
                    {employeeData.status || "Unknown"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-blue-200 text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50"
                  >
                    {employeeData.role || "N/A"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <div className="flex items-center justify-center text-sm text-slate-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Joined {employeeData.joinDate}
                </div>
                <div className="flex items-center justify-center text-sm text-slate-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {employeeData.department}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceStats.map((stat) => (
                  <div
                    key={stat.title}
                    className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{stat.title}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-slate-200/50"
                >
                  <div className="p-2 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.date}</p>
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

export default EmployeeProfile
