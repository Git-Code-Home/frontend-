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

  // Decide whether to call single-document endpoint (when exactly one file provided)
  const filesMap: Record<string, File> = {}
  const keys: (keyof UploadDocsInput)[] = [
    "passport",
    "photo",
    "idCard",
    "birthCertificate",
    "bForm",
    "passportFirstPage",
    "passportCoverPage",
    "paymentReceipt",
  ]

  for (const k of keys) {
    const f = input[k] as File | null | undefined
    if (f) filesMap[k as string] = f
  }

  const fileKeys = Object.keys(filesMap)
  if (fileKeys.length === 0) return { message: "No files to upload" }

  if (fileKeys.length === 1) {
    // Single-file upload: use the lighter endpoint which does NOT validate full requiredDocs
    const singleKey = fileKeys[0]
    const singleFile = filesMap[singleKey]
    const form = new FormData()
    form.append("file", singleFile)
    form.append("fieldName", singleKey)

    const res = await fetch(`${BASE_URL}/api/employee/applications/${input.applicationId}/upload-document`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.message || "Failed to upload document")
    }

    return res.json()
  }

  // Multiple files: use the full upload endpoint which performs requiredDocs validation
  const form = new FormData()
  for (const k of fileKeys) {
    form.append(k, filesMap[k])
  }

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
