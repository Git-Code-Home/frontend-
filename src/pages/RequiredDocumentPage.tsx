import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

const inputClass =
  "w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
const labelClass = "text-sm font-medium text-slate-700"
const sectionTitleClass = "text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2"

const RequiredDocumentPage = () => {
  const navigate = useNavigate()

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
                  Read-only reference form. Please complete your official submission in your account.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-8">
            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Full Name (as per Passport)</label>
                  <input className={inputClass} placeholder="Enter full name" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Gender</label>
                  <div className="flex items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Male
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Female
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Place of Birth</label>
                  <input className={inputClass} placeholder="City, Country" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Nationality</label>
                  <input className={inputClass} placeholder="Nationality" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Passport Number</label>
                  <input className={inputClass} placeholder="Passport number" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Passport Issue Date</label>
                  <input type="date" className={inputClass} disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Passport Expiry Date</label>
                  <input type="date" className={inputClass} disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Place of Issue</label>
                  <input className={inputClass} placeholder="Issuing city" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Emirates ID / National ID (if applicable)</label>
                  <input className={inputClass} placeholder="ID number" disabled />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Family Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Father’s Full Name</label>
                  <input className={inputClass} placeholder="Father's name" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Mother’s Full Name</label>
                  <input className={inputClass} placeholder="Mother's name" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Marital Status</label>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                    {[
                      "Single",
                      "Married",
                      "Divorced",
                      "Widowed",
                    ].map((status) => (
                      <label key={status} className="flex items-center gap-2">
                        <input type="radio" disabled className="accent-blue-600" /> {status}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Spouse’s Full Name (if married)</label>
                  <input className={inputClass} placeholder="Spouse name" disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className={labelClass}>Children (if any)</label>
                  <textarea
                    className={`${inputClass} min-h-[96px]`}
                    placeholder="List children"
                    disabled
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Address Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Home Address (Country)</label>
                  <input className={inputClass} placeholder="Home country address" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Current Residential Address (if different)</label>
                  <input className={inputClass} placeholder="Current address" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>City</label>
                  <input className={inputClass} placeholder="City" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Country</label>
                  <input className={inputClass} placeholder="Country" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Mobile Number</label>
                  <input className={inputClass} placeholder="Mobile" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>WhatsApp Number</label>
                  <input className={inputClass} placeholder="WhatsApp" disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className={labelClass}>Email Address</label>
                  <input className={inputClass} placeholder="email@example.com" disabled />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Employment / Business Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Occupation</label>
                  <input className={inputClass} placeholder="Occupation" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Company Name</label>
                  <input className={inputClass} placeholder="Company" disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className={labelClass}>Company Address</label>
                  <input className={inputClass} placeholder="Company address" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Position / Job Title</label>
                  <input className={inputClass} placeholder="Job title" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Monthly Salary</label>
                  <input className={inputClass} placeholder="Monthly salary" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Employer / Sponsor Contact Number</label>
                  <input className={inputClass} placeholder="Contact number" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>No Objection Certificate (NOC)</label>
                  <div className="flex items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> No
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
                        <input type="radio" disabled className="accent-blue-600" /> {purpose}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Destination Country</label>
                  <input className={inputClass} placeholder="Destination" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Intended Date of Travel (Departure)</label>
                  <input type="date" className={inputClass} disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Return Date</label>
                  <input type="date" className={inputClass} disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Duration of Stay (in days)</label>
                  <input className={inputClass} placeholder="Number of days" disabled />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className={labelClass}>Previous Travel History (Countries Visited)</label>
                  <textarea
                    className={`${inputClass} min-h-[80px]`}
                    placeholder="List countries"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Have you ever been refused a visa?</label>
                  <div className="flex items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> No
                    </label>
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className={labelClass}>If yes, details</label>
                  <textarea
                    className={`${inputClass} min-h-[80px]`}
                    placeholder="Provide details"
                    disabled
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Accommodation & Flight Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Hotel Name / Address</label>
                  <input className={inputClass} placeholder="Hotel details" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Flight Booking Reference (if any)</label>
                  <input className={inputClass} placeholder="Booking reference" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Travel Insurance</label>
                  <div className="flex items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> No
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
                      <input type="radio" disabled className="accent-blue-600" /> Self
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Sponsor
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Sponsor Name (if any)</label>
                  <input className={inputClass} placeholder="Sponsor name" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Sponsor Relationship</label>
                  <input className={inputClass} placeholder="Relationship" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Sponsor Contact No</label>
                  <input className={inputClass} placeholder="Contact number" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Sponsor Address</label>
                  <input className={inputClass} placeholder="Address" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Bank Statement Provided</label>
                  <div className="flex items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" disabled className="accent-blue-600" /> No
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={sectionTitleClass}>Required Documents Checklist</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {[
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
                ].map((item) => (
                  <label key={item} className="flex items-start gap-2">
                    <input type="checkbox" disabled className="mt-1 accent-blue-600" />
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
                  <input className={inputClass} placeholder="Signature" disabled />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Date</label>
                  <input type="date" className={inputClass} disabled />
                </div>
              </div>
            </section>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">This page is for reference only. Fields are disabled.</p>
              <p className="text-xs text-slate-500 mt-1">Submit your application in your client portal when ready.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RequiredDocumentPage                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section: Travel Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
                Travel Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Purpose of Travel *</label>
                  <select disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed">
                    <option>Select purpose</option>
                    <option>Tourism</option>
                    <option>Business</option>
                    <option>Study</option>
                    <option>Family Visit</option>
                    <option>Work</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Travel Date *</label>
                  <input
                    type="date"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Travel History</label>
                  <textarea
                    placeholder="List any previous visa stamps or travel history..."
                    disabled
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section: Employment Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
                Employment Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Occupation</label>
                  <input
                    type="text"
                    placeholder="Your job title"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Organization/Company</label>
                  <input
                    type="text"
                    placeholder="Your employer name"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Trade License Number</label>
                  <input
                    type="text"
                    placeholder="License number (if applicable)"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section: Additional Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Family Details</label>
                  <textarea
                    placeholder="Spouse, children, parents, or other family members details..."
                    disabled
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">FRC/MRC Reference</label>
                  <input
                    type="text"
                    placeholder="Free Returnable Certificate / Monetary Return Certificate number"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Additional Documents/Notes</label>
                  <textarea
                    placeholder="Any additional information or supporting documents to attach..."
                    disabled
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Declaration:</span> I hereby declare that the information provided in this form is true and correct to the best of my knowledge.
              </p>
            </div>

            {/* Footer Note */}
            <div className="text-center pt-4">
              <p className="text-xs text-slate-500">
                This is a read-only reference form. All fields are disabled.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                To submit your visa application, please fill out the actual form in your client portal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RequiredDocumentPage
