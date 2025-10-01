// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import AuthLayout from "@/components/AuthLayout"

// const EmployeeLogin = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     setTimeout(() => {
//       if (email && password) {
//         toast({
//           title: "Login Successful",
//           description: "Welcome to the Employee Portal",
//         })
//         navigate("/employee/dashboard")
//       } else {
//         toast({
//           title: "Login Failed",
//           description: "Please enter valid credentials",
//           variant: "destructive",
//         })
//       }
//       setLoading(false)
//     }, 1000)
//   }

//   return (
//     <AuthLayout title="Employee Login" description="Access your employee portal to manage client applications">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-slate-700 font-medium">
//             Employee ID / Email
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="employee@dubai.gov"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400 h-12"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="password" className="text-slate-700 font-medium">
//             Password
//           </Label>
//           <Input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="rounded-2xl border-slate-200 focus:border-blue-400 focus:ring-blue-400 h-12"
//           />
//         </div>

//         <Button
//           type="submit"
//           className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//           disabled={loading}
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </Button>

//         <div className="text-center text-sm text-slate-500 bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-2xl border border-slate-200">
//           Demo credentials: employee@dubai.gov / emp123
//         </div>
//       </form>
//     </AuthLayout>
//   )
// }

// export default EmployeeLogin


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"

// const ClientLogin = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     setTimeout(() => {
//       if (email && password) {
//         toast({
//           title: "Login Successful",
//           description: "Welcome to your Client Portal",
//         })
//         navigate("/client/dashboard")
//       } else {
//         toast({
//           title: "Login Failed",
//           description: "Please enter valid credentials",
//           variant: "destructive",
//         })
//       }
//       setLoading(false)
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
//           <div className="text-center space-y-2">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Client Login
//             </h1>
//             <p className="text-slate-600">Access your personal visa application portal</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-slate-700 font-medium">
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-slate-700 font-medium">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 py-3"
//               disabled={loading}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </Button>

//             <div className="text-center space-y-3">
//               <div className="text-sm text-slate-500 bg-slate-50 rounded-2xl p-3">
//                 Demo credentials: client@example.com / client123
//               </div>
//               <div className="text-sm">
//                 <span className="text-slate-600">Don't have an account? </span>
//                 <Link
//                   to="/client/register"
//                   className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
//                 >
//                   Register here
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ClientLogin

"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"
import BASE_URL from "@/lib/BaseUrl"

const EmployeeLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const res = await fetch(`${BASE_URL}/employee/login-employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Login failed")
    }

    // Store token + employee info (optional: use Redux or Context)
    localStorage.setItem("employeeToken", data.token)
    localStorage.setItem("employeeInfo", JSON.stringify(data))

    toast({
      title: "Login Successful",
      description: `Welcome, ${data.name}`,
    })

    navigate("/employee/dashboard")
  } catch (error: any) {
    toast({
      title: "Login Failed",
      description: error.message,
      variant: "destructive",
    })
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Employee Login
            </CardTitle>
            <p className="text-muted-foreground">Access the administrative portal to manage the entire visa system</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-muted-foreground bg-muted/10 p-3 rounded-2xl">
                Demo credentials: client@dubai.gov / admin123
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmployeeLogin;
