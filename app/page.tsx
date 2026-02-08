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

interface AppState {
  currentStep: PageStep
  selectedClass: '10' | '12' | null
  selectedSubject: 'physics' | 'chemistry' | 'maths' | null
  isBundleMode: boolean
  phoneNumber: string | null
  driveLinks: { [key: string]: string }
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'landing',
    selectedClass: null,
    selectedSubject: null,
    isBundleMode: false,
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

  const handleSubjectSelect = (subject: 'physics' | 'chemistry' | 'maths') => {
    setAppState((prev) => ({
      ...prev,
      selectedSubject: subject,
      currentStep: 'pricing',
    }))
  }

  const handleProceedToPayment = () => {
    setAppState((prev) => ({
      ...prev,
      currentStep: 'payment',
    }))
  }

  const handleBundleSelect = () => {
    setAppState((prev) => ({
      ...prev,
      isBundleMode: true,
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
      selectedSubject: null,
      isBundleMode: false,
      phoneNumber: null,
      driveLinks: {},
    })
  }

  return (
    <main className="min-h-screen bg-background">
      {appState.currentStep === 'landing' && (
        <LandingPage onStartClick={() => setAppState((prev) => ({ ...prev, currentStep: 'class-selection' }))} />
      )}

      {appState.currentStep === 'class-selection' && (
        <ClassSelectionPage onSelectClass={handleClassSelect} />
      )}

      {appState.currentStep === 'subject-selection' && (
        <SubjectSelectionPage
          selectedClass={appState.selectedClass!}
          onSelectSubject={handleSubjectSelect}
          onBundleSelect={handleBundleSelect}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'class-selection' }))}
        />
      )}

      {appState.currentStep === 'pricing' && (
        <PricingPage
          selectedClass={appState.selectedClass!}
          selectedSubject={appState.isBundleMode ? null : appState.selectedSubject!}
          isBundleMode={appState.isBundleMode}
          onPhoneSubmit={handlePhoneSubmit}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'subject-selection', isBundleMode: false }))}
        />
      )}

      {appState.currentStep === 'payment' && (
        <PaymentPage
          selectedClass={appState.selectedClass!}
          selectedSubject={appState.isBundleMode ? null : appState.selectedSubject!}
          isBundleMode={appState.isBundleMode}
          phoneNumber={appState.phoneNumber!}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setAppState((prev) => ({ ...prev, currentStep: 'pricing' }))}
        />
      )}

      {appState.currentStep === 'success' && (
        <SuccessPage
          driveLinks={appState.driveLinks}
          phoneNumber={appState.phoneNumber!}
          isBundleMode={appState.isBundleMode}
          onStartOver={handleReset}
        />
      )}
    </main>
  )
}
