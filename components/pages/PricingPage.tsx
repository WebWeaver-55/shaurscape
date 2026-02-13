'use client';

import React from "react"
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface PricingPageProps {
  selectedClass: '10' | '12'
  selectedSubject: 'physics' | 'chemistry' | 'maths' | 'biology' | null
  isBundleMode: boolean
  bundleType?: 'science_maths' | 'pcm' | 'pcb' | 'pcmb' | 'mcq_10' | 'mcq_12' | 'physical_education' | 'pe_mcq_12'
  onPhoneSubmit: (phoneNumber: string) => void
  onBack: () => void
  onPaymentClick: () => void
}

const subjectNames: Record<string, string> = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  maths: 'Mathematics',
  biology: 'Biology',
}

const bundleNames: Record<string, string> = {
  science_maths: 'Science + Maths',
  pcm: 'PCM Bundle',
  pcb: 'PCB Bundle',
  pcmb: 'PCMB Bundle',
  mcq_10: 'MCQ Bundle',
  mcq_12: 'PCMB MCQ Bundle',
  physical_education: 'Physical Education',
  pe_mcq_12: 'Physical Education MCQ',
}

const bundlePrices: Record<string, number> = {
  science_maths: 25,
  pcm: 35,
  pcb: 35,
  pcmb: 39,
  mcq_10: 9,
  mcq_12: 19,
  physical_education: 45,
  pe_mcq_12: 19,
}

const bundleSubjects: Record<string, string[]> = {
  science_maths: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
  pcm: ['Physics', 'Chemistry', 'Mathematics'],
  pcb: ['Physics', 'Chemistry', 'Biology'],
  pcmb: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  mcq_10: ['Physics MCQs', 'Chemistry MCQs', 'Biology MCQs', 'Mathematics MCQs'],
  mcq_12: ['Physics MCQs', 'Chemistry MCQs', 'Mathematics MCQs', 'Biology MCQs'],
  physical_education: ['Theory Notes', 'Important Questions', 'Practical Guide'],
  pe_mcq_12: ['Chapter-wise MCQs', 'Important Questions', 'Exam Ready Practice'],
}

const bundleDescriptions: Record<string, string> = {
  science_maths: 'Complete Science + Maths for Class 10',
  pcm: 'Engineering Stream — Physics, Chemistry & Mathematics',
  pcb: 'Medical Stream — Physics, Chemistry & Biology',
  pcmb: 'Complete Package — All 4 Subjects',
  mcq_10: 'Chapter-wise MCQ Practice for Class 10 PCMB',
  mcq_12: 'Chapter-wise MCQ Practice for Class 12 PCMB',
  physical_education: 'Complete Physical Education for Class 12 — All Boards',
  pe_mcq_12: 'Physical Education MCQ Practice for Class 12 — All Boards',
}

const features = [
  'Important Questions from Past Papers',
  'Complete Topic Wise Coverage',
  'Download from Google Drive',
  'Instant Access After Payment',
  'Latest Exam Pattern Questions',
  'All Boards Aligned',
]

const mcqFeatures = [
  'Hundreds of MCQs per Subject',
  'Chapter-wise Organised',
  'Download from Google Drive',
  'Instant Access After Payment',
  'Latest Exam Pattern MCQs',
  'All Boards Aligned',
]

export function PricingPage({
  selectedClass,
  selectedSubject,
  isBundleMode,
  bundleType,
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

  let price = 35
  let packageName = 'Package'
  let packageDescription = 'Complete study materials'
  let subjects: string[] = []
  const isMcqMode = bundleType?.startsWith('mcq')

  if (isBundleMode && bundleType) {
    price = bundlePrices[bundleType]
    packageName = bundleNames[bundleType]
    packageDescription = bundleDescriptions[bundleType]
    subjects = bundleSubjects[bundleType]
  } else if (selectedSubject) {
    price = selectedClass === '10' ? 25 : 35
    packageName = subjectNames[selectedSubject]
    packageDescription = `Complete ${subjectNames[selectedSubject]} for Class ${selectedClass}`
    subjects = [subjectNames[selectedSubject]]
  }

  const featureList = isMcqMode ? mcqFeatures : features

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
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 px-2">
            {packageName} — Class {selectedClass}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            {isMcqMode
              ? 'Chapter-wise MCQ practice with Google Drive access'
              : 'Complete study materials with Google Drive access'}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-4 sm:px-6 py-8 sm:py-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-2 sm:mb-3">
              {packageName} Package
            </h2>
            <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4 sm:mb-6 px-2">
              {packageDescription}
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-4xl sm:text-5xl font-bold text-primary-foreground">₹{price}</span>
              <span className="text-primary-foreground/80 text-xs sm:text-sm">one-time</span>
            </div>
          </div>

          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <p className="text-sm font-semibold text-foreground mb-4 sm:mb-6">What's Included:</p>
            <ul className="space-y-3 sm:space-y-4">
              {isBundleMode && subjects.length > 0 && subjects.map((subject, index) => (
                <li key={`subject-${index}`} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground font-medium">{subject}</span>
                </li>
              ))}
              {featureList.map((feature, index) => (
                <li key={`feature-${index}`} className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-6 border-t border-border space-y-3 sm:space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">
                WhatsApp Number (10 digits)
              </label>
              <input
                type="tel"
                placeholder="Enter your 10-digit number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
              {phoneError && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {phoneError}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                We'll send your download link to this number on WhatsApp
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full h-11 sm:h-12"
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