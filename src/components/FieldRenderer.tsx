import React from "react"

type Field = {
  key: string
  label: string
  type: string
  required?: boolean
  options?: string[]
}

type Props = {
  fields: Field[]
  formData: Record<string, any>
  setFormData: (v: Record<string, any>) => void
}

const FieldRenderer: React.FC<Props> = ({ fields, formData, setFormData }) => {
  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <div className="space-y-3">
      {fields.map((f) => {
        const value = formData[f.key] ?? ""
        if (f.type === "select") {
          return (
            <div key={f.key}>
              <label className="block text-sm font-medium">{f.label}</label>
              <select
                value={value}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="mt-1 block w-full rounded-md border px-2 py-1"
              >
                <option value="">Select</option>
                {(f.options || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        // fallback to text/date/number
        const inputType = f.type === "date" ? "date" : f.type === "number" ? "number" : "text"
        return (
          <div key={f.key}>
            <label className="block text-sm font-medium">{f.label}</label>
            <input
              type={inputType}
              value={value}
              onChange={(e) => handleChange(f.key, e.target.value)}
              className="mt-1 block w-full rounded-md border px-2 py-1"
            />
          </div>
        )
      })}
    </div>
  )
}

export default FieldRenderer
