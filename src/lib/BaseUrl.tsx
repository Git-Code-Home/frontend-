
// Read API base URL from Vite environment variable.
// Vite exposes env variables prefixed with VITE_ via import.meta.env
// Ensure you set VITE_API_BASE_URL in your .env.development and .env.production
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://sherry-backend.vercel.app"

// NOTE: Decide whether BASE_URL includes the "/api" prefix or not. Project code
// currently appends "/api/..." in places, so prefer setting VITE_API_BASE_URL to the
// backend root (e.g. https://example.com) and let the client append /api paths.
export default BASE_URL
