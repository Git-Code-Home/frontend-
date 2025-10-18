import BaseUrl from "./BaseUrl";

// Helper to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return parsed.token;
      } catch (e) {
        console.error("Failed to parse userInfo:", e);
        return null;
      }
    }
  }
  return null;
};

export async function getAdminApplications() {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error("Not authenticated. Please log in.");
  }

  const res = await fetch(`${BaseUrl}/api/admin/applications`, { 
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to fetch applications:", errorText);
    throw new Error(`Failed to fetch applications: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function adminUpdateApplicationStatus(id: string, status: string) {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error("Not authenticated. Please log in.");
  }

  const res = await fetch(`${BaseUrl}/api/admin/applications/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to update status:", errorText);
    throw new Error(`Failed to update status: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}
