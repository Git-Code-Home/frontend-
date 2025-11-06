
// Read API base URL from Vite environment variable.
// Vite exposes env variables prefixed with VITE_ via import.meta.env
// Ensure you set VITE_API_BASE_URL in your .env.development and .env.production
// Read raw value from env (may be undefined in some builds)
let raw = import.meta.env.VITE_API_BASE_URL || "https://visa-management-backend.vercel.app"

// If the env was accidentally left pointing to localhost in a deployed build,
// try to correct it at runtime: when running in the browser and the resolved
// raw value points to localhost but the page is not being served from localhost,
// replace with the production backend host. This is a safety fallback only —
// the correct fix is to set VITE_API_BASE_URL in your Vercel project and rebuild.
if (typeof window !== "undefined") {
	try {
		const hostname = window.location.hostname
		if (/localhost|127\.0\.0\.1/.test(raw) && hostname && !/localhost|127\.0\.0\.1/.test(hostname)) {
			// override to the production backend domain
			raw = "https://visa-management-backend.vercel.app"
			console.warn("[BaseUrl] runtime override: replacing localhost env with production backend")
		}
	} catch (err) {
		// ignore
	}
}

// Normalize: remove any trailing '/api' and any trailing slash so code can append '/api/...'
const BASE_URL = raw.replace(/\/api\/?$/i, "").replace(/\/$/, "")

export default BASE_URL
