'use client';

import { ArrowLeft, Check, Zap } from 'lucide-react'

export type BundleType =
  | 'science_10'
  | 'pcm_12'
  | 'pcb_12'
  | 'pcmb_12'
  | 'commerce_12'
  | 'pe_12'

interface SubjectSelectionPageProps {
  selectedClass: '10' | '12'
  stream: 'science' | 'commerce' | 'physical_education' | null
  onBundleSelect: (bundleType: BundleType) => void
  onBack: () => void
}

const allBundles: Record<string, any[]> = {
  science_10: [
    {
      id: 'science_10',
      name: 'Science + Maths',
      tagline: 'Complete Class 10 Bundle',
      price: 35,
      originalPrice: 65,
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      mcqs: ['Physics MCQs', 'Chemistry MCQs', 'Biology MCQs', 'Maths MCQs'],
      highlights: [
        '500+ Important Questions',
        'Chapter-wise MCQ Bank',
        'All Boards (CBSE/ICSE/State)',
        'Last 10 Years Patterns',
        'Instant Google Drive Access',
      ],
      badge: 'Best Value',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      color: 'from-violet-600/12 to-blue-600/8',
      border: 'border-violet-500/25',
      accent: 'text-violet-400',
      glow: 'shadow-violet-500/10',
      recommended: true,
    },
  ],
  science_12: [
    {
      id: 'pcm_12',
      name: 'PCM Bundle',
      tagline: 'Engineering Stream',
      price: 65,
      originalPrice: 149,
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      mcqs: ['Physics MCQs', 'Chemistry MCQs', 'Maths MCQs'],
      highlights: [
        '450+ Important Questions',
        'Chapter-wise MCQ Bank',
        'JEE & Board Pattern',
        'All Major Boards',
        'Instant Google Drive Access',
      ],
      badge: 'Engineering',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      color: 'from-blue-600/12 to-cyan-600/8',
      border: 'border-blue-500/25',
      accent: 'text-blue-400',
      glow: 'shadow-blue-500/10',
      recommended: false,
    },
    {
      id: 'pcb_12',
      name: 'PCB Bundle',
      tagline: 'Medical Stream',
      price: 65,
      originalPrice: 149,
      subjects: ['Physics', 'Chemistry', 'Biology'],
      mcqs: ['Physics MCQs', 'Chemistry MCQs', 'Biology MCQs'],
      highlights: [
        '450+ Important Questions',
        'Chapter-wise MCQ Bank',
        'NEET & Board Pattern',
        'All Major Boards',
        'Instant Google Drive Access',
      ],
      badge: 'Medical',
      badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
      color: 'from-green-600/12 to-emerald-600/8',
      border: 'border-green-500/25',
      accent: 'text-green-400',
      glow: 'shadow-green-500/10',
      recommended: false,
    },
    {
      id: 'pcmb_12',
      name: 'PCMB Bundle',
      tagline: 'Complete Package',
      price: 65,
      originalPrice: 199,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      mcqs: ['Physics MCQs', 'Chemistry MCQs', 'Maths MCQs', 'Biology MCQs'],
      highlights: [
        '600+ Important Questions',
        'Full MCQ Bank — All 4 Subjects',
        'JEE + NEET + Board Pattern',
        'All Major Boards',
        'Instant Google Drive Access',
      ],
      badge: '⭐ Most Popular',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      color: 'from-amber-600/12 to-orange-600/8',
      border: 'border-amber-500/35',
      accent: 'text-amber-400',
      glow: 'shadow-amber-500/15',
      recommended: true,
    },
  ],
  commerce_12: [
    {
      id: 'commerce_12',
      name: 'Commerce Bundle',
      tagline: 'Complete Commerce Package',
      price: 65,
      originalPrice: 149,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English'],
      mcqs: ['Accountancy MCQs', 'Business Studies MCQs', 'Economics MCQs'],
      highlights: [
        '500+ Important Questions',
        'Chapter-wise MCQ Bank',
        'CA Foundation Aligned',
        'All Major Boards',
        'Instant Google Drive Access',
      ],
      badge: 'Commerce',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      color: 'from-emerald-600/12 to-teal-600/8',
      border: 'border-emerald-500/25',
      accent: 'text-emerald-400',
      glow: 'shadow-emerald-500/10',
      recommended: true,
    },
  ],
  pe_12: [
    {
      id: 'pe_12',
      name: 'Physical Education',
      tagline: 'Complete PE Package',
      price: 65,
      originalPrice: 99,
      subjects: ['Theory Notes', 'Important Questions', 'Practical Guide'],
      mcqs: ['Chapter-wise MCQs', 'Previous Year Questions'],
      highlights: [
        '300+ Important Questions',
        'Complete MCQ Bank',
        'Practical File Guide',
        'All Major Boards',
        'Instant Google Drive Access',
      ],
      badge: 'Physical Education',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      color: 'from-orange-600/12 to-amber-600/8',
      border: 'border-orange-500/25',
      accent: 'text-orange-400',
      glow: 'shadow-orange-500/10',
      recommended: true,
    },
  ],
}

function getBundleKey(selectedClass: '10' | '12', stream: string | null) {
  if (selectedClass === '10') return 'science_10'
  if (stream === 'commerce') return 'commerce_12'
  if (stream === 'physical_education') return 'pe_12'
  return 'science_12'
}

export function SubjectSelectionPage({
  selectedClass,
  stream,
  onBundleSelect,
  onBack,
}: SubjectSelectionPageProps) {
  const bundleKey = getBundleKey(selectedClass, stream)
  const bundles = allBundles[bundleKey] ?? []

  const streamLabel =
    selectedClass === '10'
      ? 'Science + Maths'
      : stream === 'commerce'
      ? 'Commerce'
      : stream === 'physical_education'
      ? 'Physical Education'
      : 'Science'

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-500/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-3">
            Class {selectedClass} · {streamLabel}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {bundles.length === 1 ? 'Your Study Bundle' : 'Choose Your Bundle'}
          </h1>
          <p className="text-white/40 text-base">
            Every bundle includes <span className="text-white/70 font-semibold">Important Questions + MCQs + Notes</span> — download once, study forever
          </p>
        </div>

        {/* Bundle cards */}
        <div className={`grid grid-cols-1 ${bundles.length === 3 ? 'lg:grid-cols-3' : bundles.length === 2 ? 'sm:grid-cols-2' : 'max-w-xl mx-auto'} gap-5`}>
          {bundles.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => onBundleSelect(bundle.id as BundleType)}
              className={`group relative overflow-hidden rounded-2xl border-2 ${bundle.border} bg-gradient-to-br ${bundle.color} p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:${bundle.glow} active:scale-[0.99] ${bundle.recommended ? 'ring-1 ring-white/10' : ''}`}
            >
              {/* Recommended glow overlay */}
              {bundle.recommended && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />
              )}

              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold border rounded-full px-3 py-1 ${bundle.badgeColor}`}>
                    {bundle.badge}
                  </span>
                  {bundle.recommended && (
                    <Zap className={`w-4 h-4 ${bundle.accent} opacity-70`} />
                  )}
                </div>

                {/* Name & tagline */}
                <h3 className="text-xl font-black text-white mb-1">{bundle.name}</h3>
                <p className={`text-xs font-semibold ${bundle.accent} mb-5`}>{bundle.tagline}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-4xl font-black text-white">₹{bundle.price}</span>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-xs line-through">₹{bundle.originalPrice}</span>
                    <span className={`text-xs font-bold ${bundle.accent}`}>
                      Save ₹{bundle.originalPrice - bundle.price}
                    </span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-4">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2 font-medium">Subjects Included</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bundle.subjects.map((s: string) => (
                      <span key={s} className="text-xs bg-white/8 border border-white/10 text-white/70 px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* MCQs */}
                <div className="mb-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2 font-medium">MCQs Included</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bundle.mcqs.map((m: string) => (
                      <span key={m} className={`text-xs border px-2.5 py-1 rounded-lg ${bundle.badgeColor}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6">
                  {bundle.highlights.map((h: string) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-white/60">
                      <Check className={`w-3.5 h-3.5 ${bundle.accent} flex-shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className={`w-full py-3 rounded-xl text-sm font-bold text-center text-white bg-white/10 group-hover:bg-white/15 border border-white/10 transition-colors`}>
                  Get This Bundle →
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-white/20 text-xs">One-time payment · No subscription · Download stays yours forever</p>
        </div>
      </div>
    </div>
  )
}