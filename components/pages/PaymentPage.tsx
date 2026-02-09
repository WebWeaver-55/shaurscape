'use client';

import { ArrowLeft, Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface PaymentPageProps {
  selectedClass: '10' | '12'
  selectedSubject: 'physics' | 'chemistry' | 'maths' | 'biology' | null
  isBundleMode: boolean
  bundleType?: 'pcm' | 'pcb' | 'pcmb' | 'science_maths'
  phoneNumber: string
  onPaymentComplete: (driveLinks: { [key: string]: string }) => void
  onBack: () => void
}

const subjectNames = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  maths: 'Mathematics',
  biology: 'Biology',
}

const bundleNames = {
  science_maths: 'Science + Maths Bundle',
  pcm: 'PCM Bundle (Engineering)',
  pcb: 'PCB Bundle (Medical)',
  pcmb: 'PCMB Bundle (Complete)',
}

const bundlePrices = {
  science_maths: 25,
  pcm: 35,
  pcb: 35,
  pcmb: 39,
}

const bundleSubjects = {
  science_maths: ['Science', 'Mathematics'],
  pcm: ['Physics', 'Chemistry', 'Mathematics'],
  pcb: ['Physics', 'Chemistry', 'Biology'],
  pcmb: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentPage({
  selectedClass,
  selectedSubject,
  isBundleMode,
  bundleType,
  phoneNumber,
  onPaymentComplete,
  onBack,
}: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const subjectName = selectedSubject ? subjectNames[selectedSubject] : null
  const bundleName = bundleType ? bundleNames[bundleType] : null
  const amount = isBundleMode && bundleType ? bundlePrices[bundleType] : 35

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleRazorpayPayment = async () => {
    if (!scriptLoaded) {
      alert('Payment gateway is loading. Please try again in a moment.')
      return
    }

    setIsProcessing(true)

    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          phoneNumber,
          selectedClass,
          selectedSubject,
          isBundleMode,
          bundleType,
        }),
      })

      const order = await response.json()

      if (!order.id) {
        throw new Error('Failed to create order')
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'StudyHub',
        description: isBundleMode 
          ? `Class ${selectedClass} - ${bundleName}` 
          : `Class ${selectedClass} - ${subjectName}`,
        order_id: order.id,
        prefill: {
          contact: phoneNumber,
        },
        notes: {
          phoneNumber: phoneNumber,
          bundleMode: isBundleMode,
          bundleType: bundleType || '',
          subject: selectedSubject,
          class: selectedClass,
        },
        theme: {
          color: '#3b82f6',
        },
        handler: async function (response: any) {
          // Payment successful
          try {
            console.log('Payment successful, verifying...')
            
            // Verify payment on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                phoneNumber,
                selectedClass,
                selectedSubject,
                isBundleMode,
                bundleType,
              }),
            })

            const verifyData = await verifyResponse.json()

            console.log('Verification response:', verifyData)

            if (verifyData.success && verifyData.driveLinks) {
              // Payment verified, redirect to success page with drive links
              console.log('Payment verified! Links:', verifyData.driveLinks)
              onPaymentComplete(verifyData.driveLinks)
            } else {
              throw new Error(verifyData.error || 'Payment verification failed')
            }
          } catch (error) {
            console.error('Verification error:', error)
            alert('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id)
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2 bg-transparent h-9 sm:h-auto"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Complete Payment
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Secure payment powered by Razorpay</p>
        </div>

        {/* Payment Card */}
        <div className="max-w-lg w-full">
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-primary">
            <Lock className="w-4 h-4" />
            <span>Secure Payment Gateway</span>
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-3 sm:mb-4">Order Summary</h2>

            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
              {isBundleMode && bundleType ? (
                <>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground font-medium">{bundleName}</span>
                    <span className="text-muted-foreground text-xs">Class {selectedClass}</span>
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Includes: {bundleSubjects[bundleType].join(', ')}
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Class {selectedClass} - {subjectName}</span>
                  <span className="font-medium text-foreground">₹35</span>
                </div>
              )}
              <div className="flex justify-between text-xs sm:text-sm pt-2">
                <span className="text-muted-foreground">Delivery Method</span>
                <span className="font-medium text-foreground text-xs sm:text-sm">WhatsApp + Drive</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">WhatsApp Number</span>
                <span className="font-medium text-foreground">+91{phoneNumber}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold text-foreground">Total Amount</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">₹{amount}</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-secondary/50 border border-border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-muted-foreground">
              {isBundleMode && bundleType
                ? `After payment, you will receive ONE Google Drive link containing all ${bundleSubjects[bundleType].length} subjects on your WhatsApp.` 
                : 'After payment, you will receive the Google Drive link on WhatsApp.'}
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Payment Methods Accepted</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
              {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
                <div key={method} className="bg-secondary px-2 sm:px-3 py-2 rounded text-center text-muted-foreground">
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleRazorpayPayment}
            className="w-full gap-2 h-11 sm:h-12"
            size="lg"
            disabled={isProcessing || !scriptLoaded}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                Processing...
              </>
            ) : !scriptLoaded ? (
              'Loading...'
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ₹{amount} with Razorpay
              </>
            )}
          </Button>

          {/* Note */}
          <p className="text-xs text-center text-muted-foreground mt-3 sm:mt-4">
            You will be redirected to Razorpay secure payment gateway
          </p>
        </div>
      </div>
    </div>
  )
}