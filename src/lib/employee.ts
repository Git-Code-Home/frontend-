import BASE_URL from "./BaseUrl"

export type CreateApplicationInput = {
  clientId: string
  visaType: string
  visaDuration?: string
}

export type UploadDocsInput = {
  applicationId: string
  passport?: File | null
  photo?: File | null
  idCard?: File | null
  birthCertificate?: File | null
  bForm?: File | null
  passportFirstPage?: File | null
  passportCoverPage?: File | null
  paymentReceipt?: File | null
}

export type Client = {
  _id: string
  id?: string
  name: string
  email: string
  phone?: string
}

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("employeeToken")
}

export async function getMyClients(): Promise<Client[]> {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const res = await fetch(`${BASE_URL}/api/employee/my-clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to fetch clients")
  }

  return res.json()
}

export async function getMyApplications() {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/api/employee/my-applications`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch applications")
  }
  return res.json()
}

export async function getCountries() {
  const res = await fetch(`${BASE_URL}/api/countries`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to fetch countries")
  }
  return res.json()
}

export async function getTemplateByCountry(countrySlug: string) {
  const res = await fetch(`${BASE_URL}/api/templates/${encodeURIComponent(countrySlug)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || `Failed to fetch template for ${countrySlug}`)
  }
  return res.json()
}

export async function createApplication(input: CreateApplicationInput) {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const res = await fetch(`${BASE_URL}/api/employee/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      clientId: input.clientId,
      visaType: input.visaType,
      visaDuration: input.visaDuration,
      // allow optional country and formData to be passed for dynamic templates
      country: (input as any).country ?? undefined,
      formData: (input as any).formData ?? undefined,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to create application")
  }

  const data = await res.json()
  const appId = data?._id || data?.id
  return { application: data, applicationId: appId }
}

export async function uploadApplicationDocuments(input: UploadDocsInput) {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const form = new FormData()

  const maybe = (name: keyof UploadDocsInput) => {
    const f = input[name] as File | null | undefined
    if (f) form.append(name, f)
  }

  maybe("passport")
  maybe("photo")
  maybe("idCard")
  maybe("birthCertificate")
  maybe("bForm")
  maybe("passportFirstPage")
  maybe("passportCoverPage")
  maybe("paymentReceipt")

  const res = await fetch(`${BASE_URL}/api/employee/applications/${input.applicationId}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to upload documents")
  }

  return res.json()
}

export async function assignClientToAgent(params: { clientId: string; agentId: string }) {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const res = await fetch(`${BASE_URL}/api/employee/assign-client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ clientId: params.clientId, agentId: params.agentId }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || "Failed to assign client")
  }
  return data
}
