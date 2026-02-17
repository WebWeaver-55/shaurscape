'use client';

import { ArrowLeft, Lock, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

type BundleType = 'science_10' | 'pcm_12' | 'pcb_12' | 'pcmb_12' | 'commerce_12' | 'pe_12'

interface PaymentPageProps {
  selectedClass: '10' | '12'
  selectedSubject: null
  isBundleMode: boolean
  bundleType?: BundleType
  phoneNumber: string
  onPaymentComplete: (driveLinks: { [key: string]: string }) => void
  onBack: () => void
}

const bundleNames: Record<BundleType, string> = {
  science_10: 'Science + Maths Bundle',
  pcm_12: 'PCM Bundle (Engineering)',
  pcb_12: 'PCB Bundle (Medical)',
  pcmb_12: 'PCMB Bundle (Complete)',
  commerce_12: 'Commerce Bundle',
  pe_12: 'Physical Education Bundle',
}

const bundleSubjects: Record<BundleType, string[]> = {
  science_10: ['Physics', 'Chemistry', 'Biology', 'Maths', '+ All MCQs'],
  pcm_12: ['Physics', 'Chemistry', 'Mathematics', '+ All MCQs'],
  pcb_12: ['Physics', 'Chemistry', 'Biology', '+ All MCQs'],
  pcmb_12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', '+ All MCQs'],
  commerce_12: ['Accountancy', 'Business Studies', 'Economics', '+ All MCQs'],
  pe_12: ['Theory Notes', 'Important Questions', 'MCQs', 'Practical Guide'],
}

declare global {
  interface Window { Razorpay: any }
}

export function PaymentPage({
  selectedClass,
  isBundleMode,
  bundleType,
  phoneNumber,
  onPaymentComplete,
  onBack,
}: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const bundleName = bundleType ? bundleNames[bundleType] : 'Study Bundle'
  const subjects: string[] = bundleType ? bundleSubjects[bundleType] : []
  const amount = bundleType === 'science_10' ? 29 : 49

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  const handleRazorpayPayment = async () => {
    if (!scriptLoaded) {
      alert('Payment gateway is loading. Please try again in a moment.')
      return
    }
    setIsProcessing(true)
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phoneNumber, selectedClass, isBundleMode, bundleType }),
      })
      const order = await response.json()
      if (!order.id) throw new Error('Failed to create order')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'StudyHub',
        description: `Class ${selectedClass} - ${bundleName}`,
        order_id: order.id,
        prefill: { contact: phoneNumber },
        notes: { phoneNumber, bundleMode: isBundleMode, bundleType: bundleType || '', class: selectedClass },
        theme: { color: '#7c3aed' },
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                phoneNumber, selectedClass, isBundleMode, bundleType,
              }),
            })
            const verifyData = await verifyResponse.json()
            if (verifyData.success && verifyData.driveLinks) {
              onPaymentComplete(verifyData.driveLinks)
            } else {
              throw new Error(verifyData.error || 'Payment verification failed')
            }
          } catch (error) {
            alert('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id)
            setIsProcessing(false)
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
      }
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      alert('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-amber-500/6 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-10 group disabled:opacity-30"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-violet-400 text-sm mb-3">
            <Lock className="w-4 h-4" />
            <span>Secure Payment via Razorpay</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Complete Your Order</h1>
        </div>

        {/* Order summary card */}
        <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-violet-600/15 to-transparent border-b border-white/8 px-6 py-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Order Summary</p>
            <p className="font-bold text-white">{bundleName}</p>
            <p className="text-xs text-white/40 mt-0.5">Class {selectedClass}</p>
          </div>

          <div className="px-6 py-4 space-y-3">
            {/* Subjects */}
            <div>
              <p className="text-xs text-white/30 mb-2">Includes</p>
              <div className="flex flex-wrap gap-1.5">
                {subjects.map((s) => (
                  <span key={s} className="text-xs bg-white/8 border border-white/10 text-white/60 px-2.5 py-1 rounded-lg">{s}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/8 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Delivery</span>
                <span className="text-white/70">WhatsApp + Google Drive</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">WhatsApp</span>
                <span className="text-white/70">+91 {phoneNumber}</span>
              </div>
            </div>

            <div className="border-t border-white/8 pt-3 flex justify-between items-center">
              <span className="font-bold text-white">Total</span>
              <div className="text-right">
                <span className="text-3xl font-black text-white">₹{amount}</span>
                <p className="text-xs text-white/30">one-time payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-3 bg-violet-500/8 border border-violet-500/20 rounded-xl p-4 mb-6">
          <AlertCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/50 leading-relaxed">
            After payment, you'll receive <strong className="text-white/70">one Google Drive link</strong> on WhatsApp containing all materials in this bundle.
          </p>
        </div>

        {/* Payment methods */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5 mb-6">
          <p className="text-xs text-white/30 uppercase tracking-wider mb-3 font-bold">Accepted Payment Methods</p>
          <div className="grid grid-cols-4 gap-2">
            {['UPI', 'Card', 'Net Banking', 'Wallet'].map((m) => (
              <div key={m} className="bg-white/5 border border-white/8 rounded-lg py-2 text-center text-xs text-white/50">{m}</div>
            ))}
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handleRazorpayPayment}
          disabled={isProcessing || !scriptLoaded}
          className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 text-white"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              Processing...
            </>
          ) : !scriptLoaded ? (
            'Loading...'
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ₹{amount} with Razorpay
            </>
          )}
        </button>

        <p className="text-center text-white/20 text-xs mt-4">
          You'll be redirected to Razorpay's secure payment page
        </p>
      </div>
    </div>
  )
}