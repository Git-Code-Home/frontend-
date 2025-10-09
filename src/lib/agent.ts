import BASE_URL from "./BaseUrl"

export type Employee = {
  _id: string
  name: string
  email: string
}

export type Client = {
  _id: string
  name: string
  email: string
  phone: string
  password?: string
  reminders?: any[]
  unqualified?: boolean
  assignedTo?: Employee | string
  createdAt: string
  updatedAt: string
  __v?: number
}

export type Application = {
  _id: string
  client: Client
  processedBy?: Employee
  agent?: string | Employee
  visaType: string
  processingPriority?: "high" | "normal" | "low" | "urgent"
  applicationStatus: "submitted" | "processing" | "approved" | "rejected" | "documents-required"
  invoice?: { paid: boolean; amount?: number }
  documents?: {
    idCard?: string
    passport?: string
    photo?: string
  }
  issueDate?: string
  expiryDate?: string
  commissionAmount?: number
  createdAt: string
  updatedAt: string
  __v?: number
}

export type Commission = {
  id: string
  amount: number
  status: "paid" | "pending"
  createdAt?: string
}

export type Withdrawal = {
  id: string
  amount: number
  status: "pending" | "processing" | "paid" | "failed"
  createdAt?: string
}

type FetchOptions = RequestInit & { auth?: boolean }

const authHeaders = () => {
  if (typeof window === "undefined") return {}
  const token = localStorage.getItem("agentToken") || localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ✅ FIXED: removed duplicated /api prefix
async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const cleanBase = BASE_URL.endsWith("/api") ? BASE_URL.replace(/\/api$/, "") : BASE_URL
  const url = `${cleanBase}/api/agent${path}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(opts.auth !== false ? authHeaders() : {}),
    ...(opts.headers || {}),
  }

  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Agent API ${res.status}: ${text || res.statusText}`)
  }
  return res.json() as Promise<T>
}

// --------------------------------------------------
// ✅ Auth
// --------------------------------------------------

export async function loginAgent(payload: { email: string; password: string }) {
  const data = await apiFetch<{ token: string; _id: string; name: string; email: string; role: string }>("/login", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: false,
  })
  if (typeof window !== "undefined") {
    localStorage.setItem("agentToken", data.token)
  }
  return data
}

export async function getAgentProfile() {
  return apiFetch("/profile", { method: "GET" })
}

export async function updateAgentProfile(payload: Partial<{ name: string; phone: string; bankInfo: any }>) {
  return apiFetch("/profile", { method: "PUT", body: JSON.stringify(payload) })
}

// --------------------------------------------------
// ✅ Core Data (admin/public/data)
// --------------------------------------------------

export async function getMyClients(): Promise<Client[]> {
  const res = await fetch(`${BASE_URL}/admin/public/data?type=clients`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`)
  const data = await res.json()
  return data?.clients || []
}

export async function getMyApplications(): Promise<Application[]> {
  const res = await fetch(`${BASE_URL}/admin/public/data?type=applications`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) throw new Error(`Failed to fetch applications: ${res.statusText}`)
  const data = await res.json()
  return data?.applications || []
}

// --------------------------------------------------
// ✅ Applications CRUD
// --------------------------------------------------

export async function createOrUpdateApplication(
  payload:
    | FormData
    | {
        clientId: string
        visaType?: string
        documents?: { idCard?: string; passport?: string; photo?: string }
        status?: Application["applicationStatus"]
        issueDate?: string
        expiryDate?: string
        commissionAmount?: number
      },
) {
  const cleanBase = BASE_URL.endsWith("/api") ? BASE_URL.replace(/\/api$/, "") : BASE_URL
  const url = `${cleanBase}/api/agent/application`

  // ✅ Handle both JSON and FormData cases
  const isFormData = payload instanceof FormData
  const res = await fetch(url, {
    method: "POST",
    headers: isFormData
      ? authHeaders() // no Content-Type header for FormData
      : { "Content-Type": "application/json", ...authHeaders() },
    body: isFormData ? payload : JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Upload failed: ${text || res.statusText}`)
  }

  return res.json() as Promise<Application>
}


export function buildDocumentsFormData(files: {
  passport?: File
  photo?: File
  idCard?: File
}) {
  const fd = new FormData()
  if (files.passport) fd.append("passport", files.passport)
  if (files.photo) fd.append("photo", files.photo)
  if (files.idCard) fd.append("idCard", files.idCard)
  return fd
}

export async function uploadApplicationDocuments(applicationId: string, formData: FormData) {
  const cleanBase = BASE_URL.endsWith("/api") ? BASE_URL.replace(/\/api$/, "") : BASE_URL
  const url = `${cleanBase}/api/agent/applications/${applicationId}/upload`

  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Upload failed: ${res.statusText}`)
  }
  return res.json()
}

// --------------------------------------------------
// ✅ Commissions & Withdrawals
// --------------------------------------------------

export async function getMyCommissions(): Promise<Commission[]> {
  try {
    const summary = await apiFetch<{ totalCommission: number; pending: number; paid: number }>("/commission", {
      method: "GET",
    })
    const out: Commission[] = []
    if (summary.paid > 0) out.push({ id: "paid", amount: summary.paid, status: "paid" })
    if (summary.pending > 0) out.push({ id: "pending", amount: summary.pending, status: "pending" })
    return out
  } catch {
    return []
  }
}

export async function getMyWithdrawals(): Promise<Withdrawal[]> {
  try {
    return await apiFetch<Withdrawal[]>("/withdrawals", { method: "GET" })
  } catch {
    return []
  }
}

export async function withdrawNow() {
  return apiFetch<{ message: string }>("/withdraw", { method: "POST" })
}

// --------------------------------------------------
// ✅ Notifications
// --------------------------------------------------

export async function getAgentNotifications() {
  return apiFetch<any[]>("/notifications", { method: "GET" })
}

// --------------------------------------------------
// ✅ Application helpers
// --------------------------------------------------

export async function updateApplicationStatus(applicationId: string, status: Application["applicationStatus"]) {
  return apiFetch<{ message: string; status: Application["applicationStatus"] }>(
    `/applications/${applicationId}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
    },
  )
}

export async function updateApplicationDetails(
  applicationId: string,
  payload: { visaType?: string; issueDate?: string; expiryDate?: string },
) {
  return apiFetch<Application>(`/applications/${applicationId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}
