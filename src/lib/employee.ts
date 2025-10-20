// // import BASE_URL from "./BaseUrl"

// // export type CreateApplicationInput = {
// //   clientId: string
// //   visaType: string
// // }

// // export type UploadDocsInput = {
// //   applicationId: string
// //   passport?: File | null
// //   photo?: File | null
// //   idCard?: File | null
// // }

// // export type Client = {
// //   _id: string
// //   id?: string
// //   name: string
// //   email: string
// //   phone?: string
// //   // Add other client fields as needed based on your backend model
// // }

// // function getToken() {
// //   if (typeof window === "undefined") return null
// //   return localStorage.getItem("employeeToken")
// // }

// // export async function getMyClients(): Promise<Client[]> {
// //   const token = getToken()
// //   if (!token) throw new Error("Not authenticated")

// //   const res = await fetch(`${BASE_URL}/employee/my-clients`, {
// //     method: "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //   })

// //   if (!res.ok) {
// //     const err = await res.json().catch(() => ({}))
// //     throw new Error(err?.message || "Failed to fetch clients")
// //   }

// //   const data = await res.json()
// //   return data
// // }
// // export async function getMyApplications() {
// //      const token = getToken()
// //   const res = await fetch(`${BASE_URL}/employee/my-applications`, {
// //     method: "GET",
// //     credentials: "include",
// //         headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //   })
// //   if (!res.ok) {
// //     const error = await res.json()
// //     throw new Error(error.message || "Failed to fetch applications")
// //   }
// //   return res.json()
// // }


// // export async function createApplication(input: CreateApplicationInput) {
// //   const token = getToken()
// //   if (!token) throw new Error("Not authenticated")

// //   const res = await fetch(`${BASE_URL}/employee/applications`, {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: JSON.stringify({
// //       clientId: input.clientId,
// //       visaType: input.visaType,
// //     }),
// //   })

// //   if (!res.ok) {
// //     const err = await res.json().catch(() => ({}))
// //     throw new Error(err?.message || "Failed to create application")
// //   }

// //   const data = await res.json()
// //   // returns Application doc; support both _id and id
// //   const appId = data?._id || data?.id
// //   return { application: data, applicationId: appId }
// // }

// // export async function uploadApplicationDocuments(input: UploadDocsInput) {
// //   const token = getToken()
// //   if (!token) throw new Error("Not authenticated")

// //   const form = new FormData()
// //   if (input.passport) form.append("passport", input.passport)
// //   if (input.photo) form.append("photo", input.photo)
// //   if (input.idCard) form.append("idCard", input.idCard)

// //   const res = await fetch(`${BASE_URL}/employee/applications/${input.applicationId}/upload`, {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: form,
// //   })

// //   if (!res.ok) {
// //     const err = await res.json().catch(() => ({}))
// //     throw new Error(err?.message || "Failed to upload documents")
// //   }

// //   return res.json()
// // }






// import BASE_URL from "./BaseUrl"

// export type CreateApplicationInput = {
//   clientId: string
//   visaType: string
// }

// export type UploadDocsInput = {
//   applicationId: string
//   passport?: File | null
//   photo?: File | null
//   idCard?: File | null
// }

// export type Client = {
//   _id: string
//   id?: string
//   name: string
//   email: string
//   phone?: string
//   // Add other client fields as needed based on your backend model
// }

// function getToken() {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("employeeToken")
// }

// export async function getMyClients(): Promise<Client[]> {
//   const token = getToken()
//   if (!token) throw new Error("Not authenticated")

//   const res = await fetch(`${BASE_URL}/api/employee/my-clients`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}))
//     throw new Error(err?.message || "Failed to fetch clients")
//   }

//   const data = await res.json()
//   return data
// }

// export async function getMyApplications() {
//   const token = getToken()
//   const res = await fetch(`${BASE_URL}/api/employee/my-applications`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   if (!res.ok) {
//     const error = await res.json()
//     throw new Error(error.message || "Failed to fetch applications")
//   }
//   return res.json()
// }

// export async function createApplication(input: CreateApplicationInput) {
//   const token = getToken()
//   if (!token) throw new Error("Not authenticated")

//   const res = await fetch(`${BASE_URL}/api/employee/applications`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       clientId: input.clientId,
//       visaType: input.visaType,
//     }),
//   })

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}))
//     throw new Error(err?.message || "Failed to create application")
//   }

//   const data = await res.json()
//   // returns Application doc; support both _id and id
//   const appId = data?._id || data?.id
//   return { application: data, applicationId: appId }
// }

// export async function uploadApplicationDocuments(input: UploadDocsInput) {
//   const token = getToken()
//   if (!token) throw new Error("Not authenticated")

//   const form = new FormData()
//   if (input.passport) form.append("passport", input.passport)
//   if (input.photo) form.append("photo", input.photo)
//   if (input.idCard) form.append("idCard", input.idCard)

//   const res = await fetch(`${BASE_URL}/api/employee/applications/${input.applicationId}/upload`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: form,
//   })

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}))
//     throw new Error(err?.message || "Failed to upload documents")
//   }

//   return res.json()
// }

import BASE_URL from "./BaseUrl"

export type CreateApplicationInput = {
  clientId: string
  visaType: string
  visaDuration?: string
}

export type UploadDocsInput = {
  applicationId: string
  passport?: File | null
  photo?: File | null
  idCard?: File | null
  birthCertificate?: File | null
  bForm?: File | null
  passportFirstPage?: File | null
  passportCoverPage?: File | null
  paymentReceipt?: File | null
}

export type Client = {
  _id: string
  id?: string
  name: string
  email: string
  phone?: string
}

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("employeeToken")
}

export async function getMyClients(): Promise<Client[]> {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const res = await fetch(`${BASE_URL}/api/employee/my-clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to fetch clients")
  }

  return res.json()
}

export async function getMyApplications() {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/api/employee/my-applications`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Failed to fetch applications")
  }
  return res.json()
}

export async function createApplication(input: CreateApplicationInput) {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const res = await fetch(`${BASE_URL}/api/employee/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      clientId: input.clientId,
      visaType: input.visaType,
      visaDuration: input.visaDuration,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to create application")
  }

  const data = await res.json()
  const appId = data?._id || data?.id
  return { application: data, applicationId: appId }
}

export async function uploadApplicationDocuments(input: UploadDocsInput) {
  const token = getToken()
  if (!token) throw new Error("Not authenticated")

  const form = new FormData()

  // Helper to append if provided
  const maybe = (name: keyof UploadDocsInput) => {
    const f = input[name] as File | null | undefined
    if (f) form.append(name, f)
  }

  // existing
  maybe("passport")
  maybe("photo")
  maybe("idCard")
  // new
  maybe("passportFirstPage")
  maybe("passportCoverPage")
  maybe("birthCertificate")
  maybe("bForm")
  maybe("paymentReceipt")

  const res = await fetch(`${BASE_URL}/api/employee/applications/${input.applicationId}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || "Failed to upload documents")
  }

  return res.json()
}