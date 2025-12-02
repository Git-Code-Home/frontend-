import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import BASE_URL from "@/lib/BaseUrl"
import { useToast } from "@/hooks/use-toast"

const ClientApplicationDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [app, setApp] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        setLoading(true)
        const token = typeof window !== "undefined" ? localStorage.getItem("clientToken") : null
        const res = await fetch(`${BASE_URL}/api/client/applications/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error(err?.message || `Failed to load application (${res.status})`)
        }
        const data = await res.json()
        setApp(data)
      } catch (err: any) {
        console.error("Failed to load application:", err)
        toast({ title: "Error", description: err?.message || "Failed to load application", variant: "destructive" })
        // navigate back to applications list on error
        navigate("/client/applications")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return (
    <DashboardLayout userRole="client" userName="Client">
      <div>Loading...</div>
    </DashboardLayout>
  )

  if (!app) return (
    <DashboardLayout userRole="client" userName="Client">
      <div>No application found.</div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout userRole="client" userName="Client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Application Details</h1>
          <p className="text-slate-600 mt-1">Application {String(app._id).slice(-6)}</p>
        </div>

        <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600">Visa Type</div>
                <div className="font-medium text-slate-900">{app.visaType || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Status</div>
                <div className="font-medium text-slate-900">{app.applicationStatus || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Country</div>
                <div className="font-medium text-slate-900">{app.country || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Submitted</div>
                <div className="font-medium text-slate-900">{app.submitDate ? new Date(app.submitDate).toLocaleString() : "-"}</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Documents</h4>
              {app.documents && Object.keys(app.documents).length ? (
                <div className="space-y-2">
                  {Object.entries(app.documents).map(([k, v]: any) => (
                    <div key={k} className="flex items-center justify-between border p-3 rounded-lg">
                      <div className="text-sm text-slate-700">{k}</div>
                      <div>
                        <a href={String(v)} target="_blank" rel="noreferrer" className="text-blue-600 underline mr-3">View</a>
                        <a href={String(v)} download className="text-blue-600 underline">Download</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-600">No documents uploaded</div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => navigate('/client/applications')}>Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ClientApplicationDetail
