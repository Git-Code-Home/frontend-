import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ClientProfile = () => {
  const navigate = useNavigate()
  const [client, setClient] = useState<{ email?: string; name?: string } | null>(null)

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("client") : null
      if (raw) setClient(JSON.parse(raw))
    } catch (err) {
      setClient(null)
    }
  }, [])

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("clientToken")
        localStorage.removeItem("client")
      }
    } catch (err) {
      console.warn("Failed to clear local storage:", err)
    }
    navigate("/client/login")
  }

  return (
    <DashboardLayout userRole="client" userName={client?.name || "Client"}>
      <div className="space-y-6">
        <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-600">Name</div>
                <div className="font-medium text-slate-900">{client?.name || "-"}</div>
              </div>

              <div>
                <div className="text-sm text-slate-600">Email</div>
                <div className="font-medium text-slate-900">{client?.email || "-"}</div>
              </div>

              <div className="pt-4">
                <Button variant="destructive" onClick={handleLogout} className="rounded-2xl">
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ClientProfile
