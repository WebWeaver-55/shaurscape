'use client';

import React from "react"

import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface PricingPageProps {
  selectedClass: '10' | '12'
  selectedSubject: 'physics' | 'chemistry' | 'maths' | null
  isBundleMode: boolean
  onPhoneSubmit: (phoneNumber: string) => void
  onBack: () => void
  onPaymentClick: () => void
}

const subjectNames = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  maths: 'Mathematics',
}

const features = [
  'Important Questions from Past Papers',
  'Complete Topic Wise Coverage',
  'Download from Google Drive',
  'Instant Access After Payment',
  'Latest Exam Pattern Questions',
  'CBSE Curriculum Aligned',
]

export function PricingPage({
  selectedClass,
  selectedSubject,
  isBundleMode,
  onPhoneSubmit,
  onBack,
  onPaymentClick,
}: PricingPageProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhoneNumber(value)
    if (value && value.length < 10) {
      setPhoneError('Phone number must be 10 digits')
    } else {
      setPhoneError('')
    }
  }

  const handleSubmit = () => {
    if (phoneNumber.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number')
      return
    }
    onPhoneSubmit(phoneNumber)
  }

  const subjectName = selectedSubject ? subjectNames[selectedSubject] : null
  const price = isBundleMode ? 129 : 49
  const allSubjects = ['physics', 'chemistry', 'maths']

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {isBundleMode ? `All Three Subjects - Class ${selectedClass}` : `${subjectName} - Class ${selectedClass}`}
          </h1>
          <p className="text-muted-foreground">Complete study materials with Google Drive access</p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-3">
              {isBundleMode ? 'Complete Bundle' : `${subjectName} Package`}
            </h2>
            <p className="text-primary-foreground/80 text-sm mb-6">
              {isBundleMode ? 'Physics + Chemistry + Mathematics' : `Complete study material for Class ${selectedClass}`}
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl font-bold text-primary-foreground">₹{price}</span>
              <span className="text-primary-foreground/80 text-sm">one-time</span>
            </div>
            {isBundleMode && (
              <p className="text-sm text-primary-foreground/80 mt-2">Save ₹18 vs buying separately</p>
            )}
          </div>

          {/* Features List */}
          <div className="px-6 py-8">
            <p className="text-sm font-semibold text-foreground mb-6">What's Included:</p>
            <ul className="space-y-4">
              {(isBundleMode ? ['Physics', 'Chemistry', 'Mathematics', 'Important Questions from Past Papers', 'Complete Topic Wise Coverage', 'Download from Google Drive', 'Instant Access After Payment', 'Latest Exam Pattern Questions', 'CBSE Curriculum Aligned'] : features).map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone Number Collection */}
          <div className="px-6 py-6 border-t border-border space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                WhatsApp Number (10 digits)
              </label>
              <input
                type="tel"
                placeholder="Enter your 10-digit number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="10"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {phoneError && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {phoneError}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                We'll send your {isBundleMode ? 'download links' : 'download link'} to this number on WhatsApp
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={phoneNumber.length !== 10}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
