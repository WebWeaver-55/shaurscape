'use client';

import { ArrowLeft, Check, AlertCircle, Zap } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'

type BundleType = 'science_10' | 'pcm_12' | 'pcb_12' | 'pcmb_12' | 'commerce_12' | 'pe_12'

interface PricingPageProps {
  selectedClass: '10' | '12'
  selectedSubject: null
  isBundleMode: boolean
  bundleType?: BundleType
  onPhoneSubmit: (phoneNumber: string) => void
  onBack: () => void
  onPaymentClick: () => void
}

const bundleNames: Record<BundleType, string> = {
  science_10: 'Science + Maths Bundle',
  pcm_12: 'PCM Bundle',
  pcb_12: 'PCB Bundle',
  pcmb_12: 'PCMB Bundle',
  commerce_12: 'Commerce Bundle',
  pe_12: 'Physical Education Bundle',
}

const bundleDescriptions: Record<BundleType, string> = {
  science_10: 'Complete Class 10 — Physics, Chemistry, Biology & Maths with MCQs',
  pcm_12: 'Engineering Stream — Physics, Chemistry & Mathematics with MCQs',
  pcb_12: 'Medical Stream — Physics, Chemistry & Biology with MCQs',
  pcmb_12: 'Complete Class 12 — All 4 Science Subjects with MCQs',
  commerce_12: 'Complete Commerce — Accountancy, Business Studies, Economics with MCQs',
  pe_12: 'Physical Education — Theory, Important Questions & MCQs',
}

const bundleSubjects: Record<BundleType, string[]> = {
  science_10: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Physics MCQs', 'Chemistry MCQs', 'Biology MCQs', 'Maths MCQs'],
  pcm_12: ['Physics', 'Chemistry', 'Mathematics', 'Physics MCQs', 'Chemistry MCQs', 'Maths MCQs'],
  pcb_12: ['Physics', 'Chemistry', 'Biology', 'Physics MCQs', 'Chemistry MCQs', 'Biology MCQs'],
  pcmb_12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'All MCQs Included'],
  commerce_12: ['Accountancy', 'Business Studies', 'Economics', 'English', 'MCQs for all subjects'],
  pe_12: ['Theory Notes', 'Important Questions', 'Chapter-wise MCQs', 'Practical Guide'],
}

const features: Record<BundleType, string[]> = {
  science_10: [
    '500+ Important Questions from Past Papers',
    'Chapter-wise MCQ Bank included',
    'All Boards — CBSE, ICSE, State',
    'Last 10 Years Exam Patterns',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
  pcm_12: [
    '450+ Important Questions',
    'Chapter-wise MCQ Bank for PCM',
    'JEE & Board Pattern Questions',
    'All Major Boards Covered',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
  pcb_12: [
    '450+ Important Questions',
    'Chapter-wise MCQ Bank for PCB',
    'NEET & Board Pattern Questions',
    'All Major Boards Covered',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
  pcmb_12: [
    '600+ Important Questions',
    'Full MCQ Bank — All 4 Subjects',
    'JEE + NEET + Board Pattern',
    'All Major Boards Covered',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
  commerce_12: [
    '500+ Important Questions',
    'Chapter-wise MCQ Bank',
    'CA Foundation Aligned Content',
    'All Major Boards Covered',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
  pe_12: [
    '300+ Important Questions',
    'Complete MCQ Bank',
    'Practical File Guidance',
    'All Major Boards Covered',
    'Instant Google Drive Access',
    'Download & Study Offline',
  ],
}

export function PricingPage({
  selectedClass,
  isBundleMode,
  bundleType,
  onPhoneSubmit,
  onBack,
}: PricingPageProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const price = bundleType === 'science_10' || selectedClass === '10' ? 35 : 65
  const originalPrice = bundleType === 'pcmb_12' ? 199 : (bundleType === 'science_10' || selectedClass === '10') ? 65 : 149
  const packageName = bundleType ? bundleNames[bundleType] : 'Study Bundle'
  const packageDescription = bundleType ? bundleDescriptions[bundleType] : ''
  const subjects = bundleType ? bundleSubjects[bundleType] : []
  const featureList = bundleType ? features[bundleType] : []

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-amber-500/6 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-3">Class {selectedClass}</div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{packageName}</h1>
          <p className="text-white/40 text-sm">{packageDescription}</p>
        </div>

        {/* Pricing card */}
        <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden mb-6">
          {/* Price header */}
          <div className="bg-gradient-to-r from-violet-600/20 to-amber-600/10 border-b border-white/8 p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-5xl font-black text-white">₹{price}</span>
                  <span className="text-white/30 text-lg line-through">₹{originalPrice}</span>
                </div>
                <p className="text-amber-400 text-sm font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Save ₹{originalPrice - price} — One-time payment
                </p>
              </div>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-2 text-center">
                <p className="text-amber-300 text-xs font-black uppercase tracking-wider">Best</p>
                <p className="text-amber-300 text-xs font-black uppercase tracking-wider">Value</p>
              </div>
            </div>
            <p className="text-white/40 text-xs">Download instantly · All boards · Study offline forever</p>
          </div>

          {/* What's included */}
          <div className="p-6">
            <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-4">What's Included</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {subjects.map((s) => (
                <span key={s} className="text-xs bg-white/8 border border-white/10 text-white/70 px-3 py-1.5 rounded-lg">
                  {s}
                </span>
              ))}
            </div>

            <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-4">Bundle Features</p>
            <ul className="space-y-2.5 mb-8">
              {featureList.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Phone input */}
            <div className="border-t border-white/8 pt-6">
              <label className="text-sm font-bold text-white block mb-2">
                WhatsApp Number
              </label>
              <p className="text-xs text-white/40 mb-3">We'll send your download link to this number after payment</p>
              <div className="flex gap-2 mb-2">
                <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white/60 text-sm flex-shrink-0">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="flex-1 bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-violet-500/60 focus:bg-white/10 transition-all text-sm"
                />
              </div>
              {phoneError && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 mb-3">
                  <AlertCircle className="w-3 h-3" />
                  {phoneError}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={phoneNumber.length !== 10}
                className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0 text-white"
              >
                Continue to Payment — ₹{price}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs">
          🔒 Secure payment via Razorpay · Your link will never expire
        </p>
      </div>
    </div>
  )
}