// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Shield } from "lucide-react"
// import BASE_URL from "@/lib/BaseUrl"

// const AdminLogin = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setLoading(true)

//   try {
//     const response = await fetch(`${BASE_URL}/admin/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       localStorage.setItem("adminToken", data.token)

//       toast({
//         title: "Login Successful",
//         description: `Welcome ${data.name}`,
//       })
//       navigate("/admin/dashboard")
//     } else {
//       toast({
//         title: "Login Failed",
//         description: data.message || "Invalid credentials",
//         variant: "destructive",
//       })
//     }
//   } catch (error) {
//     toast({
//       title: "Error",
//       description: "Something went wrong. Please try again.",
//       variant: "destructive",
//     })
//   } finally {
//     setLoading(false)
//   }
// }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <Card className="shadow-2xl border-0 rounded-3xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
//           <CardHeader className="text-center pb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
//               <Shield className="h-8 w-8 text-primary" />
//             </div>
//             <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
//               Admin Login
//             </CardTitle>
//             <p className="text-muted-foreground">Access the administrative portal to manage the entire visa system</p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="rounded-2xl border-0 bg-muted/20 focus:bg-background/50 transition-colors"
//                   required
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
//                 disabled={loading}
//               >
//                 {loading ? "Signing In..." : "Sign In"}
//               </Button>

//               <div className="text-center text-sm text-muted-foreground bg-muted/10 p-3 rounded-2xl">
//                 Demo credentials: admin@dubai.gov / admin123
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default AdminLogin
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

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ✅ Updated fetch block
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 Important for CORS
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
       localStorage.setItem("userInfo", JSON.stringify(data))
        toast({
          title: "Login Successful",
          description: `Welcome ${data.name}`,
        })
        navigate("/admin/dashboard")
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
              Admin Login
            </CardTitle>
            <p className="text-muted-foreground">
              Access the administrative portal to manage the entire visa system
            </p>
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
                Demo credentials: admin@dubai.gov / admin123
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminLogin
