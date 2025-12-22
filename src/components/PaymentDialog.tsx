import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign } from "lucide-react"
import StripePaymentComponent from "./StripePaymentForm"
import PayPalPaymentComponent from "./PayPalPaymentForm"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  applicationId: string
  amount?: string
  visaType?: string
  onPaymentSuccess?: (gateway: "stripe" | "paypal") => void
}

export default function PaymentDialog({
  open,
  onOpenChange,
  applicationId,
  amount = "100",
  visaType = "Visa Application",
  onPaymentSuccess,
}: PaymentDialogProps) {
  const [selectedGateway, setSelectedGateway] = useState<"stripe" | "paypal">("stripe")

  const handlePaymentSuccess = (gateway: "stripe" | "paypal") => {
    onPaymentSuccess?.(gateway)
    // Don't close automatically - let parent component decide
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Secure payment for your visa application
          </DialogDescription>
        </DialogHeader>

        {/* Payment Summary */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Application Type:</span>
              <Badge variant="outline">{visaType}</Badge>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-800">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">${amount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Tabs
          defaultValue="stripe"
          onValueChange={(value) => setSelectedGateway(value as "stripe" | "paypal")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stripe" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Credit Card
            </TabsTrigger>
            <TabsTrigger value="paypal" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              PayPal
            </TabsTrigger>
          </TabsList>

          {/* Stripe Payment */}
          <TabsContent value="stripe" className="mt-4">
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Enter your card details below. Your payment is secure and encrypted.
              </p>
              <StripePaymentComponent
                applicationId={applicationId}
                onSuccess={handlePaymentSuccess}
                amount={amount}
              />
            </div>
          </TabsContent>

          {/* PayPal Payment */}
          <TabsContent value="paypal" className="mt-4">
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                You will be redirected to PayPal to complete your payment securely.
              </p>
              <PayPalPaymentComponent
                applicationId={applicationId}
                onSuccess={handlePaymentSuccess}
                amount={amount}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Badge */}
        <div className="text-center text-xs text-slate-500">
          🔒 Your payment information is secure and encrypted
        </div>
      </DialogContent>
    </Dialog>
  )
}
