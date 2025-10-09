"use client"

import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { buildDocumentsFormData, uploadApplicationDocuments } from "@/lib/agent"

export default function ApplicationUpload() {
  const [applicationId, setApplicationId] = useState("")
  const [passport, setPassport] = useState<File | undefined>()
  const [photo, setPhoto] = useState<File | undefined>()
  const [idCard, setIdCard] = useState<File | undefined>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    if (!applicationId) {
      setError("Please enter an application ID")
      return
    }
    setError(null)
    setMessage(null)
    try {
      setLoading(true)
      const form = buildDocumentsFormData({ passport, photo, idCard })
      const res = await uploadApplicationDocuments(applicationId, form)
      setMessage(res?.message || "Documents uploaded successfully")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout userRole="agent" userName="Agent User">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 rounded-3xl">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Application ID</Label>
              <Input
                placeholder="Enter application ID"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Passport</Label>
              <Input type="file" accept="image/*,application/pdf" onChange={(e) => setPassport(e.target.files?.[0])} />
            </div>
            <div className="grid gap-2">
              <Label>Photo</Label>
              <Input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0])} />
            </div>
            <div className="grid gap-2">
              <Label>ID Card</Label>
              <Input type="file" accept="image/*,application/pdf" onChange={(e) => setIdCard(e.target.files?.[0])} />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={onSubmit} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
              {message ? <span className="text-sm text-success">{message}</span> : null}
              {error ? <span className="text-sm text-destructive">{error}</span> : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
