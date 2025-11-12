import BASE_URL from "./BaseUrl"

// Central admin API helper
// - reads token from localStorage key `adminToken`
// - attaches Authorization header to all requests
// - redirects to /admin/login when token is missing

const apiRoot = (BASE_URL || "").replace(/\/$/, "")
const adminBase = apiRoot + "/api/admin"

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminToken")
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    // use replace to avoid back-button returning to protected page
    window.location.replace("/admin/login")
  }
}

async function request(path: string, opts: RequestInit = {}) {
  const token = getToken()
  if (!token) {
    redirectToLogin()
    throw new Error("No admin token; redirecting to login")
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
    Authorization: `Bearer ${token}`,
  }

  const res = await fetch(`${adminBase}${path.startsWith("/") ? path : "/" + path}`, {
    ...opts,
    headers,
    credentials: opts.credentials ?? "omit",
  })

  // If unauthorized, clear token and redirect
  if (res.status === 401 || res.status === 403) {
    try { localStorage.removeItem("adminToken") } catch (e) {}
    redirectToLogin()
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || res.statusText || `HTTP ${res.status}`)
  }

  // attempt to parse json, otherwise return text
  const ct = res.headers.get("content-type") || ""
  if (ct.includes("application/json")) {
    return res.json()
  }
  return res.text()
}

export default {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, body?: any, options: RequestInit = {}) =>
    request(path, { method: "POST", body: body ? JSON.stringify(body) : undefined, ...options }),
  put: (path: string, body?: any, options: RequestInit = {}) =>
    request(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined, ...options }),
  patch: (path: string, body?: any, options: RequestInit = {}) =>
    request(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined, ...options }),
  del: (path: string, options: RequestInit = {}) => request(path, { method: "DELETE", ...options }),
}
