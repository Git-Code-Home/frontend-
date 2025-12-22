import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import BASE_URL from "@/lib/BaseUrl"

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
)

// Inner component using Stripe hooks
function StripePaymentForm({ applicationId, onSuccess, amount }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("clientToken")

      // Step 1: Create payment intent on backend
      const intentResponse = await fetch(
        `${BASE_URL}/api/payments/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visaApplicationId: applicationId }),
        }
      )

      if (!intentResponse.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret } = await intentResponse.json()

      // Step 2: Confirm payment with Stripe
      if (!stripe || !elements) {
        throw new Error("Stripe not loaded")
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      if (result.paymentIntent.status === "succeeded") {
        // Step 3: Confirm on backend
        const confirmResponse = await fetch(
          `${BASE_URL}/api/payments/stripe/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId: result.paymentIntent.id,
            }),
          }
        )

        if (confirmResponse.ok) {
          setSuccess(true)
          onSuccess && onSuccess("stripe")
        } else {
          throw new Error("Failed to confirm payment")
        }
      }
    } catch (err) {
      setError(err.message)
      console.error("Stripe payment error:", err)
    } finally {
      setLoading(false)
    }
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
    <form onSubmit={handlePayment} className="space-y-4">
      <Card className="border border-slate-200">
        <CardContent className="pt-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pay ${amount} with Stripe
          </>
        )}
      </Button>
    </form>
  )
}

// Outer component with Stripe provider
export default function StripePaymentComponent({ applicationId, onSuccess, amount = "100" }) {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        applicationId={applicationId}
        onSuccess={onSuccess}
        amount={amount}
      />
    </Elements>
  )
}
