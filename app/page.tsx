'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/pages/LandingPage'
import { ClassSelectionPage } from '@/components/pages/ClassSelectionPage'
import { SubjectSelectionPage } from '@/components/pages/SubjectSelectionPage'
import { PricingPage } from '@/components/pages/PricingPage'
import { PaymentPage } from '@/components/pages/PaymentPage'
import { SuccessPage } from '@/components/pages/SuccessPage'

type PageStep =
  | 'landing'
  | 'stream-selection'
  | 'subject-selection'
  | 'pricing'
  | 'payment'
  | 'success'

export type BundleType =
  | 'science_10'
  | 'pcm_12'
  | 'pcb_12'
  | 'pcmb_12'
  | 'commerce_12'
  | 'pe_12'

interface AppState {
  currentStep: PageStep
  selectedClass: '10' | '12' | null
  selectedStream: 'science' | 'commerce' | 'physical_education' | null
  bundleType?: BundleType
  phoneNumber: string | null
  driveLinks: { [key: string]: string }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'landing',
    selectedClass: null,
    selectedStream: null,
    bundleType: undefined,
    phoneNumber: null,
    driveLinks: {},
  })

  const handleClassSelect = (classLevel: '10' | '12') => {
    if (classLevel === '10') {
      // Class 10 only has one stream — go straight to bundle selection
      setAppState((prev) => ({
        ...prev,
        selectedClass: classLevel,
        selectedStream: 'science',
        currentStep: 'subject-selection',
      }))
    } else {
      // Class 12 — pick stream first
      setAppState((prev) => ({
        ...prev,
        selectedClass: classLevel,
        currentStep: 'stream-selection',
      }))
    }
  }

  const handleStreamSelect = (stream: 'science' | 'commerce' | 'physical_education') => {
    setAppState((prev) => ({
      ...prev,
      selectedStream: stream,
      currentStep: 'subject-selection',
    }))
  }

  const handleBundleSelect = (bundleType: BundleType) => {
    setAppState((prev) => ({
      ...prev,
      bundleType,
      currentStep: 'pricing',
    }))
  }

  const handlePhoneSubmit = (phoneNumber: string) => {
    setAppState((prev) => ({
      ...prev,
      phoneNumber,
      currentStep: 'payment',
    }))
  }

  const handlePaymentComplete = (driveLinks: { [key: string]: string }) => {
    setAppState((prev) => ({
      ...prev,
      driveLinks,
      currentStep: 'success',
    }))
  }

  const handleReset = () => {
    setAppState({
      currentStep: 'landing',
      selectedClass: null,
      selectedStream: null,
      bundleType: undefined,
      phoneNumber: null,
      driveLinks: {},
    })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {appState.currentStep === 'landing' && (
        <LandingPage onClassSelect={handleClassSelect} />
      )}

      {appState.currentStep === 'stream-selection' && (
        <ClassSelectionPage
          onStreamSelect={handleStreamSelect}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'landing' }))}
        />
      )}

      {appState.currentStep === 'subject-selection' && (
        <SubjectSelectionPage
          selectedClass={appState.selectedClass!}
          stream={appState.selectedStream}
          onBundleSelect={handleBundleSelect}
          onBack={() =>
            setAppState((prev) => ({
              ...prev,
              currentStep: appState.selectedClass === '10' ? 'landing' : 'stream-selection',
            }))
          }
        />
      )}

      {appState.currentStep === 'pricing' && (
        <PricingPage
          selectedClass={appState.selectedClass!}
          selectedSubject={null}
          isBundleMode={true}
          bundleType={appState.bundleType}
          onPhoneSubmit={handlePhoneSubmit}
          onBack={() =>
            setAppState((prev) => ({
              ...prev,
              currentStep: 'subject-selection',
              bundleType: undefined,
            }))
          }
          onPaymentClick={() => {}}
        />
      )}

      {appState.currentStep === 'payment' && (
        <PaymentPage
          selectedClass={appState.selectedClass!}
          selectedSubject={null}
          isBundleMode={true}
          bundleType={appState.bundleType}
          phoneNumber={appState.phoneNumber!}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'pricing' }))}
        />
      )}

      {appState.currentStep === 'success' && (
        <SuccessPage
          driveLinks={appState.driveLinks}
          phoneNumber={appState.phoneNumber!}
          isBundleMode={true}
          bundleType={appState.bundleType}
          onStartOver={handleReset}
        />
      )}
    </main>
  )
}