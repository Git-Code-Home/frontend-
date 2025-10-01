import axios from "axios";

const API_URL = "http://localhost:5000/api/employee"; // 👈 adjust to your backend prefix

export const applicationService = {
  registerClient: (data) =>
    axios.post(`${API_URL}/clients`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("employeeToken")}` }
    }),

  createApplication: (data) =>
    axios.post(`${API_URL}/applications`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("employeeToken")}` }
    }),

  uploadDocuments: (applicationId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));

    return axios.post(`${API_URL}/applications/${applicationId}/documents`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
