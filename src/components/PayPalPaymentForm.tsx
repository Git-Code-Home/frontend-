import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import BASE_URL from "@/lib/BaseUrl"

declare global {
  interface Window {
    paypal: any
  }
}

export default function PayPalPaymentComponent({ applicationId, onSuccess, amount = "100" }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [paypalLoaded, setPaypalLoaded] = useState(false)

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${
      import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb_placeholder"
    }`
    script.async = true
    script.onload = () => {
      setPaypalLoaded(true)
      setLoading(false)
    }
    script.onerror = () => {
      setError("Failed to load PayPal SDK")
      setLoading(false)
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (!paypalLoaded || success) return

    const token = localStorage.getItem("clientToken")

    // Render PayPal button
    window.paypal
      ?.Buttons({
        createOrder: async (data: any, actions: any) => {
          try {
            // Create PayPal order on backend
            const response = await fetch(
              `${BASE_URL}/api/payments/paypal/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ visaApplicationId: applicationId }),
              }
            )

            if (!response.ok) {
              throw new Error("Failed to create PayPal order")
            }

            const { orderId } = await response.json()
            return orderId
          } catch (err: any) {
            setError(err.message)
            throw err
          }
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const token = localStorage.getItem("clientToken")

            // Capture order on backend
            const response = await fetch(
              `${BASE_URL}/api/payments/paypal/capture-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId: data.orderID }),
              }
            )

            if (!response.ok) {
              throw new Error("Failed to capture PayPal order")
            }

            setSuccess(true)
            onSuccess && onSuccess("paypal")
          } catch (err: any) {
            setError(err.message)
            console.error("PayPal capture error:", err)
          }
        },
        onError: (err: any) => {
          setError(err.message || "An error occurred during payment")
          console.error("PayPal error:", err)
        },
      })
      .render("#paypal-button-container")
  }, [paypalLoaded, applicationId, success])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
        <span className="text-green-700 font-medium">Payment successful!</span>
      </div>
    )
  }

  return (
    <Card className="border border-slate-200">
      <CardContent className="pt-6">
        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        <div id="paypal-button-container"></div>
      </CardContent>
    </Card>
  )
}
