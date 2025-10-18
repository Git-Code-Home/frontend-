// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Loader2, UserPlus } from "lucide-react"
// import BASE_URL from "@/lib/BaseUrl"

// type FormData = {
//   name: string
//   email: string
//   phone: string
//   unqualified: boolean
//   password: string // added
// }

// type Errors = Partial<Record<keyof FormData | "submit", string>>

// interface Props {
//   onSuccess?: (client: any) => void
//   onCancel?: () => void
// }

// const RegisterClientForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     unqualified: false,
//     password: "", // added
//   })
//   const [loading, setLoading] = useState(false)
//   const [errors, setErrors] = useState<Errors>({})
//   const employeeData = JSON.parse(localStorage.getItem("employeeInfo") || "{}")
//   const token = employeeData.token
//   const employeeId = employeeData._id
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//     if (errors[name as keyof FormData]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Errors = {}
//     if (!formData.name.trim()) newErrors.name = "Name is required"
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required"
//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required"
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!validateForm()) return
//     setLoading(true)

//     try {
//       const token =
//         typeof window !== "undefined" ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token : null
//       const employeeId =
//         typeof window !== "undefined" ? JSON.parse(localStorage.getItem("employeeInfo") || "{}")._id : null

//       const payload = { ...formData, assignedTo: employeeId } // add employee ID here

//       const response = await fetch(`${BASE_URL}/employee/clients`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//         credentials: "include",
//       })

//       if (!response.ok) throw new Error("Failed to register client")
//       const client = await response.json()
//       setFormData({ name: "", email: "", phone: "", unqualified: false, password: "" }) // added
//       if (onSuccess) onSuccess(client)
//     } catch (error) {
//       console.error("Error registering client:", error)
//       setErrors({ submit: "Failed to register client. Please try again." })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
//       <CardHeader className="pb-4">
//         <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
//           <UserPlus className="h-5 w-5 mr-2" />
//           Register New Client
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name" className="text-slate-700">
//               Full Name *
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter client's full name"
//               className={`rounded-xl ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
//               disabled={loading}
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-slate-700">
//               Email Address *
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter client's email"
//               className={`rounded-xl ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
//               disabled={loading}
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone" className="text-slate-700">
//               Phone Number *
//             </Label>
//             <Input
//               id="phone"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter client's phone number"
//               className={`rounded-xl ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
//               disabled={loading}
//             />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password" className="text-slate-700">
//               Password *
//             </Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Set a secure password for the client"
//               autoComplete="new-password"
//               className={`rounded-xl ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
//               disabled={loading}
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//           <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
//             <Label htmlFor="unqualified" className="text-slate-700 cursor-pointer">
//               Mark as Unqualified
//             </Label>
//             <Switch
//               id="unqualified"
//               name="unqualified"
//               checked={formData.unqualified}
//               onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, unqualified: checked }))}
//               disabled={loading}
//             />
//           </div>
//           {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
//           <div className="flex gap-3 pt-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={loading}
//               className="flex-1 rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Registering...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="h-4 w-4 mr-2" />
//                   Register Client
//                 </>
//               )}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default RegisterClientForm



"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, UserPlus } from "lucide-react"
import BASE_URL from "@/lib/BaseUrl"

type FormData = {
  name: string
  email: string
  phone: string
  unqualified: boolean
  password: string // added
}

type Errors = Partial<Record<keyof FormData | "submit", string>>

interface Props {
  onSuccess?: (client: any) => void
  onCancel?: () => void
}

const RegisterClientForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    unqualified: false,
    password: "", // added
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const employeeData = JSON.parse(localStorage.getItem("employeeInfo") || "{}")
  const token = employeeData.token
  const employeeId = employeeData._id
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Errors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const token =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("employeeInfo") || "{}").token : null
      const employeeId =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("employeeInfo") || "{}")._id : null

      const payload = { ...formData, assignedTo: employeeId } // add employee ID here

      const response = await fetch(`${BASE_URL}/api/employee/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) throw new Error("Failed to register client")
      const client = await response.json()
      setFormData({ name: "", email: "", phone: "", unqualified: false, password: "" }) // added
      if (onSuccess) onSuccess(client)
    } catch (error) {
      console.error("Error registering client:", error)
      setErrors({ submit: "Failed to register client. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Register New Client
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client's full name"
              className={`rounded-xl ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter client's email"
              className={`rounded-xl ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter client's phone number"
              className={`rounded-xl ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              Password *
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Set a secure password for the client"
              autoComplete="new-password"
              className={`rounded-xl ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <Label htmlFor="unqualified" className="text-slate-700 cursor-pointer">
              Mark as Unqualified
            </Label>
            <Switch
              id="unqualified"
              name="unqualified"
              checked={formData.unqualified}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, unqualified: checked }))}
              disabled={loading}
            />
          </div>
          {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Client
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterClientForm