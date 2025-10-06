import axios from "axios";
import BASE_URL from "../lib/BaseUrl"; // ✅ correct import name

const API_URL = `${BASE_URL}/api/employee`; // ✅ use correct variable

export const applicationService = {
  registerClient: (data) =>
    axios.post(`${API_URL}/clients`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
      },
    }),

  createApplication: (data) =>
    axios.post(`${API_URL}/applications`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
      },
    }),

  uploadDocuments: (applicationId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file));

    return axios.post(
      `${API_URL}/applications/${applicationId}/documents`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
