import axios from "axios"
import BASE_URL from "./BaseUrl"

// Build API base: ensure there's exactly one trailing '/api' segment
const root = (BASE_URL || "https://sherry-backend.vercel.app").replace(/\/$/, "")
const apiBase = root.replace(/\/api\/?$/i, "") + "/api"

console.log(`🔗 API Base URL: ${apiBase}`)

const api = axios.create({
  baseURL: apiBase,
  // CRITICAL: withCredentials must be true for CORS with cookies/auth headers
  withCredentials: true,
  // VERCEL FIX: Set explicit timeout for serverless cold starts
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

// Add request interceptor for debugging CORS issues
api.interceptors.request.use(
  (config) => {
    // Log request details for debugging
    const origin = typeof window !== "undefined" ? window.location.origin : "server";
    console.log(`📤 API Request:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      origin: origin,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });
    
    return config;
  },
  (error) => {
    console.error("❌ Request Setup Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response:`, {
      status: response.status,
      url: response.config.url,
      headers: {
        "Access-Control-Allow-Origin": response.headers["access-control-allow-origin"],
        "Access-Control-Allow-Credentials": response.headers["access-control-allow-credentials"],
      },
    });
    return response;
  },
  (error) => {
    const errorInfo = {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
    };

    if (error.response) {
      // Server responded with error status
      console.error("❌ API Error (Server Response):", {
        ...errorInfo,
        data: error.response.data,
        corsHeaders: {
          "Access-Control-Allow-Origin": error.response.headers["access-control-allow-origin"],
          "Access-Control-Allow-Methods": error.response.headers["access-control-allow-methods"],
          "Access-Control-Allow-Headers": error.response.headers["access-control-allow-headers"],
        },
      });
    } else if (error.request) {
      // Request made but no response (CORS or network issue)
      console.error("❌ Network/CORS Error (No Response):", {
        ...errorInfo,
        isCorsError: !error.response?.headers["access-control-allow-origin"],
      });
    } else {
      // Error in request setup
      console.error("❌ Request Setup Error:", errorInfo);
    }
    
    return Promise.reject(error);
  }
);

export default api


