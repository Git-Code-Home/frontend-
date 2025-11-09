import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Send } from "lucide-react"
import { useEffect, useState } from "react"
import FieldRenderer from "@/components/FieldRenderer"
import { getCountries, getTemplateByCountry } from "@/lib/employee"
import BASE_URL from "@/lib/BaseUrl"
import { useToast } from "@/hooks/use-toast"

const ClientNewApplication = () => {
  const { toast } = useToast()
  const [countries, setCountries] = useState<Array<{ name: string; slug: string }>>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("dubai")
  const [template, setTemplate] = useState<any | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const cs = await getCountries()
        setCountries(cs || [])
      } catch (err) {
        console.warn("Failed to load countries:", err)
      }
    }
    load()
  }, [])

  useEffect(() => {
    let mounted = true
    const loadTemplate = async () => {
      try {
        if (!selectedCountry) return
        const t = await getTemplateByCountry(selectedCountry)
        if (mounted) setTemplate(t)
      } catch (err) {
        if (mounted) setTemplate(null)
      }
    }
    loadTemplate()
    return () => {
      mounted = false
    }
  }, [selectedCountry])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // build payload from formData and simple fields
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("clientToken") : null
      const payload: any = { country: selectedCountry, formData }
      const res = await fetch(`${BASE_URL}/api/client/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || "Failed to submit application")
      }

      toast({ title: "Submitted", description: "Your application was submitted.", variant: "default" })
    } catch (err: any) {
      console.error("Client new application submit failed:", err)
      toast({ title: "Error", description: err?.message || "Failed to submit", variant: "destructive" })
    }
  }
  return (
    <DashboardLayout userRole="client" userName="Ahmed Hassan">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            New Visa Application
          </h1>
          <p className="text-slate-600 mt-1">Submit a new visa application</p>
        </div>

        <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Country</Label>
                  <Select value={selectedCountry} onValueChange={(v) => setSelectedCountry(v)}>
                    <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {countries.length === 0 ? (
                        <SelectItem value="dubai">Dubai</SelectItem>
                      ) : (
                        countries.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Visa Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="tourist">Tourist Visa</SelectItem>
                      <SelectItem value="business">Business Visa</SelectItem>
                      <SelectItem value="transit">Transit Visa</SelectItem>
                      <SelectItem value="family">Family Visa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Duration</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="travelDate" className="text-slate-700 font-medium">
                    Travel Date
                  </Label>
                  <Input
                    id="travelDate"
                    type="date"
                    className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate" className="text-slate-700 font-medium">
                    Return Date
                  </Label>
                  <Input
                    id="returnDate"
                    type="date"
                    className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Dynamic template fields */}
              {template?.fields && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Details for {template.title || selectedCountry}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FieldRenderer fields={template.fields} formData={formData} setFormData={setFormData} />
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-200 px-6 bg-transparent"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
                <Button type="submit" className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 px-6">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ClientNewApplication
