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
  | 'class-selection'
  | 'subject-selection'
  | 'pricing'
  | 'payment'
  | 'success'

type BundleType = 'science_maths' | 'pcm' | 'pcb' | 'pcmb' | 'mcq_10' | 'mcq_12' | 'physical_education'

interface AppState {
  currentStep: PageStep
  selectedClass: '10' | '12' | null
  pageMode: 'bundle' | 'mcq'
  bundleType?: BundleType
  phoneNumber: string | null
  driveLinks: { [key: string]: string }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'landing',
    selectedClass: null,
    pageMode: 'bundle',
    bundleType: undefined,
    phoneNumber: null,
    driveLinks: {},
  })

  const handleClassSelect = (classLevel: '10' | '12') => {
    setAppState((prev) => ({
      ...prev,
      selectedClass: classLevel,
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
      pageMode: 'bundle',
      bundleType: undefined,
      phoneNumber: null,
      driveLinks: {},
    })
  }

  return (
    <main className="min-h-screen bg-background">
      {appState.currentStep === 'landing' && (
        <LandingPage
          onBundleClick={() =>
            setAppState((prev) => ({ ...prev, pageMode: 'bundle', currentStep: 'class-selection' }))
          }
          onMcqClick={() =>
            setAppState((prev) => ({ ...prev, pageMode: 'mcq', currentStep: 'class-selection' }))
          }
        />
      )}

      {appState.currentStep === 'class-selection' && (
        <ClassSelectionPage
          onSelectClass={handleClassSelect}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'landing' }))}
        />
      )}

      {appState.currentStep === 'subject-selection' && (
        <SubjectSelectionPage
          selectedClass={appState.selectedClass!}
          pageMode={appState.pageMode}
          onBundleSelect={handleBundleSelect}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'class-selection' }))}
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