import axios from "axios"
import BASE_URL from "./BaseUrl"

// Build API base: ensure there's exactly one trailing '/api' segment
const root = (BASE_URL || "https://sherry-backend.vercel.app").replace(/\/$/, "")
const apiBase = root.replace(/\/api\/?$/i, "") + "/api"

const api = axios.create({
  baseURL: apiBase,
  // Do not send cookies by default. If you need cookie auth, set withCredentials
  // and configure backend CORS accordingly.
  withCredentials: false,
})

export default api
