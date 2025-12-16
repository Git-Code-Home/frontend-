import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, Send, ClipboardList } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FieldRenderer from "@/components/FieldRenderer"
import { getCountries, getTemplateByCountry } from "@/lib/employee"
import BASE_URL from "@/lib/BaseUrl"
import { useToast } from "@/hooks/use-toast"

const ClientNewApplication = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [countries, setCountries] = useState<Array<{ name: string; slug: string; region?: string; active?: boolean }>>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("dubai")
  const [selectedSchengenMember, setSelectedSchengenMember] = useState<string>("")
  const [template, setTemplate] = useState<any | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [visaType, setVisaType] = useState<string>("")
  const [visaDuration, setVisaDuration] = useState<string>("")
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [idCardFile, setIdCardFile] = useState<File | null>(null)
  const [filledTemplateFile, setFilledTemplateFile] = useState<File | null>(null)
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null)
  const [dynamicDocs, setDynamicDocs] = useState<Record<string, File | null>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const cs = await getCountries()
        // only show active countries returned by the API
        const active = (cs || []).filter((c: any) => c.active !== false)
        setCountries(active)
        if (active && active.length) {
          setSelectedCountry(active[0].slug)
          // if the first active is Schengen, preselect first member (optional)
          const schengenMembers = active.filter((c: any) => String((c.region || "")).toLowerCase() === "schengen" && c.slug !== "schengen")
          if (String(active[0].slug || "").toLowerCase() === "schengen" && schengenMembers.length) {
            setSelectedSchengenMember(schengenMembers[0].slug)
          }
        }
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
        // If top-level Schengen selected, fetch the Schengen template (shared template)
        const templateSlugToFetch = selectedCountry === "schengen" ? "schengen" : selectedCountry
        const t = await getTemplateByCountry(templateSlugToFetch)
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

  // Schengen members (compute from API; fallback to a safe list if backend missing members)
  const schengenFallback = [
    { name: "France", slug: "france" },
    { name: "Germany", slug: "germany" },
    { name: "Spain", slug: "spain" },
    { name: "Italy", slug: "italy" },
    { name: "Netherlands", slug: "netherlands" },
    { name: "Belgium", slug: "belgium" },
    { name: "Portugal", slug: "portugal" },
    { name: "Greece", slug: "greece" },
    { name: "Austria", slug: "austria" },
    { name: "Sweden", slug: "sweden" },
    { name: "Norway", slug: "norway" },
  ]

  const schengenMembersFromApi = (countries || []).filter((c: any) => String((c.region || "")).toLowerCase() === "schengen" && c.slug !== "schengen")
  const schengenMembersToShow = schengenMembersFromApi.length ? schengenMembersFromApi : schengenFallback

  useEffect(() => {
    if (String((selectedCountry || "")).toLowerCase() === "schengen") {
      if (!selectedSchengenMember && schengenMembersToShow.length) {
        setSelectedSchengenMember(schengenMembersToShow[0].slug)
      }
    }
  }, [selectedCountry, selectedSchengenMember, schengenMembersToShow])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("clientToken") : null
      if (!token) {
        toast({ title: "Not logged in", description: "Please login to submit an application", variant: "destructive" })
        navigate("/client/login")
        return
      }
  // If Schengen is selected and a member is chosen, use the member slug as the application's country
  const effectiveCountry = selectedCountry === "schengen" && selectedSchengenMember ? selectedSchengenMember : selectedCountry
  const payload: any = { country: effectiveCountry, formData, visaType, visaDuration }

      // Create the application first
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
        throw new Error(err?.message || "Failed to create application")
      }

      const created = await res.json()
      const appId = created && created._id

      // If there are no files to upload, we're done
      const hasFiles = passportFile || photoFile || idCardFile || filledTemplateFile || paymentReceiptFile || Object.values(dynamicDocs || {}).some((f) => !!f)

      if (!hasFiles) {
        toast({ title: "Submitted", description: "Your application was submitted.", variant: "default" })
        return
      }

      // Build FormData for files
      const fm = new FormData()
      if (passportFile) fm.append("passport", passportFile)
      if (photoFile) fm.append("photo", photoFile)
      if (idCardFile) fm.append("idCard", idCardFile)
  if (filledTemplateFile) fm.append("filledTemplate", filledTemplateFile)
        if (paymentReceiptFile) fm.append("paymentReceipt", paymentReceiptFile)

      // Append dynamic template-named required docs using the exact template keys
      Object.entries(dynamicDocs || {}).forEach(([key, file]) => {
        if (file) {
          // Use the template doc label as the field name so the server will store documents.<label>
          fm.append(key, file)
        }
      })

      // POST files to the upload endpoint
      const upRes = await fetch(`${BASE_URL}/api/client/applications/${appId}/upload`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: fm,
      })

      if (!upRes.ok) {
        const err = await upRes.json().catch(() => ({}))
        throw new Error(err?.message || "Failed to upload documents")
      }

      toast({ title: "Submitted", description: "Your application and documents were uploaded.", variant: "default" })
    } catch (err: any) {
      console.error("Client new application submit failed:", err)
      toast({ title: "Error", description: err?.message || "Failed to submit", variant: "destructive" })
    }
  }

  const handleOpenRequiredDocument = () => {
    navigate("/required-document")
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

                {/* When Schengen is chosen, show member country dropdown */}
                {String((selectedCountry || "")).toLowerCase() === "schengen" && (
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Schengen Member Country</Label>
                    <Select value={selectedSchengenMember} onValueChange={(v) => setSelectedSchengenMember(v)}>
                      <SelectTrigger className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select Schengen country" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {schengenMembersToShow.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Visa Type</Label>
                  <Select value={visaType} onValueChange={(v) => setVisaType(v)}>
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
                  <Select value={visaDuration} onValueChange={(v) => setVisaDuration(v)}>
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

              {/* requiredDocs and document uploads (including dynamic template docs) */}
              {template?.requiredDocs && Array.isArray(template.requiredDocs) && template.requiredDocs.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Required Documents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {template.requiredDocs.map((doc: string) => (
                      <div className="space-y-2" key={doc}>
                        <Label htmlFor={`doc-${doc}`}>{doc}</Label>
                        <Input
                          id={`doc-${doc}`}
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => setDynamicDocs({ ...dynamicDocs, [doc]: e.target.files?.[0] || null })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

                    {/* Template PDF download + filled-template upload */}
                    {template?.formPdfUrl && (
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium">Download Template</Label>
                        <a href={template.formPdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                          Download blank {template.title || selectedCountry} form
                        </a>
                      </div>
                    )}

                    {/* Legacy upload fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="passport">Passport (main copy)</Label>
                  <Input id="passport" type="file" accept="image/*,application/pdf" onChange={(e) => setPassportFile(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo</Label>
                  <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idCard">ID Card</Label>
                  <Input id="idCard" type="file" accept="image/*,application/pdf" onChange={(e) => setIdCardFile(e.target.files?.[0] || null)} />
                </div>
                      <div className="space-y-2">
                        <Label htmlFor="filledTemplate">Filled Template (PDF)</Label>
                        <Input id="filledTemplate" type="file" accept="application/pdf" onChange={(e) => setFilledTemplateFile(e.target.files?.[0] || null)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentReceipt">Payment Receipt</Label>
                        <Input id="paymentReceipt" type="file" accept="image/*,application/pdf" onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)} />
                      </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button type="button" onClick={handleOpenRequiredDocument} className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 px-6">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Fill Required Document
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
