import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RequiredDocumentPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Main Form Card */}
        <Card className="rounded-3xl bg-white shadow-lg border-white/20">
          <CardHeader className="border-b border-slate-200">
            <div className="flex items-start gap-3">
              <FileText className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl text-slate-800">
                  Visa Application Form
                </CardTitle>
                <p className="text-slate-500 text-sm mt-2">
                  This is a read-only reference form. Please fill out the actual application form in your account.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 py-8">
            {/* Section: Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date of Birth *</label>
                  <input
                    type="date"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nationality *</label>
                  <input
                    type="text"
                    placeholder="Your country of citizenship"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Passport Number *</label>
                  <input
                    type="text"
                    placeholder="Your passport number"
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section: Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address *</label>
                  <input
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
