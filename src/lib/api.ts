import axios from "axios"
import BASE_URL from "./BaseUrl"

// Build API base: ensure there's exactly one trailing '/api' segment
const root = (BASE_URL || "https://sherry-backend.vercel.app").replace(/\/$/, "")
const apiBase = root.replace(/\/api\/?$/i, "") + "/api"

const api = axios.create({
  baseURL: apiBase,
  // Set withCredentials to true to support CORS with credentials
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

// Add request interceptor for better error handling
api.interceptors.request.use(
  (config) => {
    // Log request for debugging CORS issues
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response (CORS or network issue)
      console.error("Network/CORS Error:", error.message);
    } else {
      // Error in request setup
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api

