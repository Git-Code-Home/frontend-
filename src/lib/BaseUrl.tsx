
// Read API base URL from Vite environment variable.
// Vite exposes env variables prefixed with VITE_ via import.meta.env
// Ensure you set VITE_API_BASE_URL in your .env.development and .env.production
// Read raw value from env (may be undefined in some builds)
let raw = import.meta.env.VITE_API_BASE_URL || "https://sherry-backend.vercel.app"

// Normalize: remove any trailing '/api' and any trailing slash so code can append '/api/...'
// IMPORTANT: Vite env vars are baked at build time. Set VITE_API_BASE_URL in your
// Vercel project (Production) and rebuild to propagate the correct value.
const BASE_URL = raw.replace(/\/api\/?$/i, "").replace(/\/$/, "")

export default BASE_URL
