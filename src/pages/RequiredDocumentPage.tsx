import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import BASE_URL from "@/lib/BaseUrl"

const inputClass =
  "w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
const labelClass = "text-sm font-medium text-slate-700"
const sectionTitleClass = "text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2"

const RequiredDocumentPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    placeOfIssue: "",
    emiratesId: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    spouseName: "",
    children: "",
    homeAddress: "",
    currentAddress: "",
    city: "",
    country: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    occupation: "",
    companyName: "",
    companyAddress: "",
    jobTitle: "",
    monthlySalary: "",
    employerContact: "",
    noc: "",
    purposeOfVisit: "",
    destinationCountry: "",
    departureDate: "",
    returnDate: "",
    durationOfStay: "",
    travelHistory: "",
    visaRefusal: "",
    visaRefusalDetails: "",
    hotelName: "",
    flightBooking: "",
    travelInsurance: "",
    tripPayment: "",
    sponsorName: "",
    sponsorRelationship: "",
    sponsorContact: "",
    sponsorAddress: "",
    bankStatement: "",
    documentsChecklist: [] as string[],
    clientSignature: "",
    declarationDate: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      documentsChecklist: prev.documentsChecklist.includes(item)
        ? prev.documentsChecklist.filter((i) => i !== item)
        : [...prev.documentsChecklist, item],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("clientToken") : null
      if (!token) {
        toast({ title: "Error", description: "Please login to submit", variant: "destructive" })
        navigate("/client/login")
        return
      }

      setSubmitting(true)
      const res = await fetch(`${BASE_URL}/api/client/required-document-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || "Failed to submit application")
      }

      toast({ title: "Success", description: "Your application has been submitted to the admin", variant: "default" })
      setFormData({
        fullName: "",
        gender: "",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "",
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        placeOfIssue: "",
        emiratesId: "",
        fatherName: "",
        motherName: "",
        maritalStatus: "",
        spouseName: "",
        children: "",
        homeAddress: "",
        currentAddress: "",
        city: "",
        country: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        occupation: "",
        companyName: "",
        companyAddress: "",
        jobTitle: "",
        monthlySalary: "",
        employerContact: "",
        noc: "",
        purposeOfVisit: "",
        destinationCountry: "",
        departureDate: "",
        returnDate: "",
        durationOfStay: "",
        travelHistory: "",
        visaRefusal: "",
        visaRefusalDetails: "",
        hotelName: "",
        flightBooking: "",
        travelInsurance: "",
        tripPayment: "",
        sponsorName: "",
        sponsorRelationship: "",
        sponsorContact: "",
        sponsorAddress: "",
        bankStatement: "",
        documentsChecklist: [],
        clientSignature: "",
        declarationDate: "",
      })
    } catch (err: any) {
      console.error("Submit failed:", err)
      toast({ title: "Error", description: err?.message || "Failed to submit", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const documentsChecklistItems = [
    "Passport Copy",
    "Passport-size Photo (white background)",
    "Emirates ID / Residence Visa Copy (for UAE residents)",
    "Bank Statement (last 3–6 months)",
    "NOC / Employment Letter",
    "Trade License (if self-employed)",
    "Hotel Booking",
    "Flight Booking",
    "Travel Insurance",
    "Invitation Letter (if family/friends visit)",
    "Old Visa Copies (if any)",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <Card className="rounded-3xl bg-white shadow-lg border-white/20">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-start gap-3">
              <FileText className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl text-slate-800">
                  Required Documents & Visa Information
                </CardTitle>
                <p className="text-slate-500 text-sm mt-2">
                  Fill in all fields below and submit your application to the admin.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Full Name (as per Passport)</label>
                    <input
                      className={inputClass}
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Gender</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="accent-blue-600"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="accent-blue-600"
                        />
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Date of Birth</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Place of Birth</label>
                    <input
                      className={inputClass}
                      placeholder="City, Country"
                      value={formData.placeOfBirth}
                      onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Nationality</label>
                    <input
                      className={inputClass}
                      placeholder="Nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange("nationality", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Passport Number</label>
                    <input
                      className={inputClass}
                      placeholder="Passport number"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Passport Issue Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.passportIssueDate}
                      onChange={(e) => handleInputChange("passportIssueDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Passport Expiry Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.passportExpiryDate}
                      onChange={(e) => handleInputChange("passportExpiryDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Place of Issue</label>
                    <input
                      className={inputClass}
                      placeholder="Issuing city"
                      value={formData.placeOfIssue}
                      onChange={(e) => handleInputChange("placeOfIssue", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Emirates ID / National ID (if applicable)</label>
                    <input
                      className={inputClass}
                      placeholder="ID number"
                      value={formData.emiratesId}
                      onChange={(e) => handleInputChange("emiratesId", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Family Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Father's Full Name</label>
                    <input
                      className={inputClass}
                      placeholder="Father's name"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Mother's Full Name</label>
                    <input
                      className={inputClass}
                      placeholder="Mother's name"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Marital Status</label>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                      {["Single", "Married", "Divorced", "Widowed"].map((status) => (
                        <label key={status} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value={status}
                            checked={formData.maritalStatus === status}
                            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                            className="accent-blue-600"
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Spouse's Full Name (if married)</label>
                    <input
                      className={inputClass}
                      placeholder="Spouse name"
                      value={formData.spouseName}
                      onChange={(e) => handleInputChange("spouseName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Children (if any)</label>
                    <textarea
                      className={`${inputClass} min-h-[96px]`}
                      placeholder="List children"
                      value={formData.children}
                      onChange={(e) => handleInputChange("children", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Address Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Home Address (Country)</label>
                    <input
                      className={inputClass}
                      placeholder="Home country address"
                      value={formData.homeAddress}
                      onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Current Residential Address (if different)</label>
                    <input
                      className={inputClass}
                      placeholder="Current address"
                      value={formData.currentAddress}
                      onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>City</label>
                    <input
                      className={inputClass}
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Country</label>
                    <input
                      className={inputClass}
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Mobile Number</label>
                    <input
                      className={inputClass}
                      placeholder="Mobile"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>WhatsApp Number</label>
                    <input
                      className={inputClass}
                      placeholder="WhatsApp"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Email Address</label>
                    <input
                      className={inputClass}
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Employment / Business Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Occupation</label>
                    <input
                      className={inputClass}
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Company Name</label>
                    <input
                      className={inputClass}
                      placeholder="Company"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Company Address</label>
                    <input
                      className={inputClass}
                      placeholder="Company address"
                      value={formData.companyAddress}
                      onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Position / Job Title</label>
                    <input
                      className={inputClass}
                      placeholder="Job title"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Monthly Salary</label>
                    <input
                      className={inputClass}
                      placeholder="Monthly salary"
                      value={formData.monthlySalary}
                      onChange={(e) => handleInputChange("monthlySalary", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Employer / Sponsor Contact Number</label>
                    <input
                      className={inputClass}
                      placeholder="Contact number"
                      value={formData.employerContact}
                      onChange={(e) => handleInputChange("employerContact", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>No Objection Certificate (NOC)</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="noc"
                          value="Yes"
                          checked={formData.noc === "Yes"}
                          onChange={(e) => handleInputChange("noc", e.target.value)}
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="noc"
                          value="No"
                          checked={formData.noc === "No"}
                          onChange={(e) => handleInputChange("noc", e.target.value)}
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Travel Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Purpose of Visit</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-700">
                      {["Tourism", "Family Visit", "Business", "Other"].map((purpose) => (
                        <label key={purpose} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="purposeOfVisit"
                            value={purpose}
                            checked={formData.purposeOfVisit === purpose}
                            onChange={(e) => handleInputChange("purposeOfVisit", e.target.value)}
                            className="accent-blue-600"
                          />
                          {purpose}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Destination Country</label>
                    <input
                      className={inputClass}
                      placeholder="Destination"
                      value={formData.destinationCountry}
                      onChange={(e) => handleInputChange("destinationCountry", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Intended Date of Travel (Departure)</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Return Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.returnDate}
                      onChange={(e) => handleInputChange("returnDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Duration of Stay (in days)</label>
                    <input
                      className={inputClass}
                      placeholder="Number of days"
                      value={formData.durationOfStay}
                      onChange={(e) => handleInputChange("durationOfStay", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Previous Travel History (Countries Visited)</label>
                    <textarea
                      className={`${inputClass} min-h-[80px]`}
                      placeholder="List countries"
                      value={formData.travelHistory}
                      onChange={(e) => handleInputChange("travelHistory", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Have you ever been refused a visa?</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visaRefusal"
                          value="Yes"
                          checked={formData.visaRefusal === "Yes"}
                          onChange={(e) => handleInputChange("visaRefusal", e.target.value)}
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="visaRefusal"
                          value="No"
                          checked={formData.visaRefusal === "No"}
                          onChange={(e) => handleInputChange("visaRefusal", e.target.value)}
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>If yes, details</label>
                    <textarea
                      className={`${inputClass} min-h-[80px]`}
                      placeholder="Provide details"
                      value={formData.visaRefusalDetails}
                      onChange={(e) => handleInputChange("visaRefusalDetails", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Accommodation & Flight Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Hotel Name / Address</label>
                    <input
                      className={inputClass}
                      placeholder="Hotel details"
                      value={formData.hotelName}
                      onChange={(e) => handleInputChange("hotelName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Flight Booking Reference (if any)</label>
                    <input
                      className={inputClass}
                      placeholder="Booking reference"
                      value={formData.flightBooking}
                      onChange={(e) => handleInputChange("flightBooking", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Travel Insurance</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="travelInsurance"
                          value="Yes"
                          checked={formData.travelInsurance === "Yes"}
                          onChange={(e) => handleInputChange("travelInsurance", e.target.value)}
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="travelInsurance"
                          value="No"
                          checked={formData.travelInsurance === "No"}
                          onChange={(e) => handleInputChange("travelInsurance", e.target.value)}
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Financial / Sponsorship Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass}>Who will pay for your trip?</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="tripPayment"
                          value="Self"
                          checked={formData.tripPayment === "Self"}
                          onChange={(e) => handleInputChange("tripPayment", e.target.value)}
                          className="accent-blue-600"
                        />
                        Self
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="tripPayment"
                          value="Sponsor"
                          checked={formData.tripPayment === "Sponsor"}
                          onChange={(e) => handleInputChange("tripPayment", e.target.value)}
                          className="accent-blue-600"
                        />
                        Sponsor
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Sponsor Name (if any)</label>
                    <input
                      className={inputClass}
                      placeholder="Sponsor name"
                      value={formData.sponsorName}
                      onChange={(e) => handleInputChange("sponsorName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Sponsor Relationship</label>
                    <input
                      className={inputClass}
                      placeholder="Relationship"
                      value={formData.sponsorRelationship}
                      onChange={(e) => handleInputChange("sponsorRelationship", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Sponsor Contact No</label>
                    <input
                      className={inputClass}
                      placeholder="Contact number"
                      value={formData.sponsorContact}
                      onChange={(e) => handleInputChange("sponsorContact", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Sponsor Address</label>
                    <input
                      className={inputClass}
                      placeholder="Address"
                      value={formData.sponsorAddress}
                      onChange={(e) => handleInputChange("sponsorAddress", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Bank Statement Provided</label>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="bankStatement"
                          value="Yes"
                          checked={formData.bankStatement === "Yes"}
                          onChange={(e) => handleInputChange("bankStatement", e.target.value)}
                          className="accent-blue-600"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="bankStatement"
                          value="No"
                          checked={formData.bankStatement === "No"}
                          onChange={(e) => handleInputChange("bankStatement", e.target.value)}
                          className="accent-blue-600"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className={sectionTitleClass}>Required Documents Checklist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  {documentsChecklistItems.map((item) => (
                    <label key={item} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={formData.documentsChecklist.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                        className="mt-1 accent-blue-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className={sectionTitleClass}>Declaration</h2>
                <p className="text-sm text-slate-700">
                  I hereby declare that all the information provided above is true and correct to the best of my knowledge.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>Client Signature</label>
                    <input
                      className={inputClass}
                      placeholder="Enter your name"
                      value={formData.clientSignature}
                      onChange={(e) => handleInputChange("clientSignature", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData.declarationDate}
                      onChange={(e) => handleInputChange("declarationDate", e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RequiredDocumentPage
