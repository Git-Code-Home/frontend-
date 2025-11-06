
// Read API base URL from Vite environment variable.
// Vite exposes env variables prefixed with VITE_ via import.meta.env
// Ensure you set VITE_API_BASE_URL in your .env.development and .env.production
// Read raw value from env (may be undefined in some builds)
const raw = import.meta.env.VITE_API_BASE_URL || "https://sherry-backend.vercel.app"

// Normalize: remove any trailing slash and remove a trailing '/api' segment if present.
// This ensures the rest of the app can append '/api/...' safely without duplicating '/api'.
const BASE_URL = raw.replace(/\/api\/?$/i, "").replace(/\/$/, "")

export default BASE_URL
