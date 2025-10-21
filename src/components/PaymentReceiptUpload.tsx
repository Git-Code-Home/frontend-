// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/hooks/use-toast"
// import BASE_URL from "@/lib/BaseUrl"

// interface PaymentReceiptUploadProps {
//   userId: string
//   role: "employee" | "agent" | "user"
// }

// const PaymentReceiptUpload = ({ userId, role }: PaymentReceiptUploadProps) => {
//   const [file, setFile] = useState<File | null>(null)
//   const [uploading, setUploading] = useState(false)
//   const { toast } = useToast()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0])
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) {
//       toast({ title: "No file selected", variant: "destructive" })
//       return
//     }

//     const formData = new FormData()
//     formData.append("receipt", file)
//     formData.append("userId", userId)
//     formData.append("role", role)

//     try {
//       setUploading(true)
//       const res = await fetch(`${BASE_URL}/payments/upload-receipt`, {
//         method: "POST",
//         body: formData,
//       })
//       const data = await res.json()

//       if (res.ok) {
//         toast({ title: "Receipt uploaded successfully", description: data.message })
//         setFile(null)
//       } else {
//         toast({
//           title: "Upload failed",
//           description: data.message || "Something went wrong.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Unable to upload receipt",
//         variant: "destructive",
//       })
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div className="space-y-3 border rounded-2xl p-4 bg-white/70 shadow-sm">
//       <h3 className="text-lg font-semibold text-slate-800">Upload Payment Receipt</h3>
//       <Input type="file" onChange={handleFileChange} />
//       <Button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl w-full"
//       >
//         {uploading ? "Uploading..." : "Upload Receipt"}
//       </Button>
//     </div>
//   )
// }

// export default PaymentReceiptUpload





"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import BASE_URL from "@/lib/BaseUrl"

interface PaymentReceiptUploadProps {
  userId: string
  role: "employee" | "agent" | "user"
  applicationId?: string // Optional: link receipt to specific application
  onUploadSuccess?: () => void // Optional: callback after successful upload
}

const PaymentReceiptUpload = ({ userId, role, applicationId, onUploadSuccess }: PaymentReceiptUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({ title: "No file selected", variant: "destructive" })
      return
    }

    const formData = new FormData()
    formData.append("receipt", file)
    formData.append("uploadedBy", userId)
    formData.append("role", role)
    formData.append("amount", amount || "0")
    formData.append("description", description || "Payment receipt")
    
    // If applicationId is provided, include it to link the receipt to the application
    if (applicationId) {
      formData.append("applicationId", applicationId)
    }

    try {
      setUploading(true)
      const res = await fetch(`${BASE_URL}/api/payments/upload-receipt`, {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (res.ok) {
        toast({ 
          title: "Receipt uploaded successfully", 
          description: applicationId ? "Application payment status updated" : data.message 
        })
        setFile(null)
        setAmount("")
        setDescription("")
        
        // Clear file input
        const fileInput = document.getElementById('receipt-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        // Call success callback if provided
        if (onUploadSuccess) {
          onUploadSuccess()
        }
      } else {
        toast({
          title: "Upload failed",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[PaymentReceiptUpload] Error:", error)
      toast({
        title: "Error",
        description: "Unable to upload receipt",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3 border rounded-2xl p-4 bg-white/70 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Upload Payment Receipt</h3>
      
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700">
          Amount (optional)
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description (optional)
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Payment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="receipt-upload" className="text-sm font-medium text-slate-700">
          Receipt File *
        </label>
        <Input 
          id="receipt-upload"
          type="file" 
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="w-full"
        />
      </div>
      
      <Button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl w-full"
      >
        {uploading ? "Uploading..." : "Upload Receipt"}
      </Button>
    </div>
  )
}

export default PaymentReceiptUpload