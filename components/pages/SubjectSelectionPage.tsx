'use client';

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubjectSelectionPageProps {
  selectedClass: '10' | '12'
  pageMode: 'bundle' | 'mcq'
  onBundleSelect: (bundleType: 'science_maths' | 'pcm' | 'pcb' | 'pcmb' | 'mcq_10' | 'mcq_12' | 'physical_education' | 'pe_mcq_12') => void
  onBack: () => void
}

const class10Bundles = [
  {
    id: 'science_maths',
    name: 'Science + Maths',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
    price: 25,
    badge: 'Complete Class 10 Package',
    color: 'from-blue-500/10 to-purple-500/5',
    icon: '📚',
  },
]

const class12Bundles = [
  {
    id: 'pcm',
    name: 'PCM Bundle',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    price: 35,
    badge: 'Engineering Stream',
    color: 'from-blue-500/10 to-blue-500/5',
    icon: '🎯',
  },
  {
    id: 'pcb',
    name: 'PCB Bundle',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    price: 35,
    badge: 'Medical Stream',
    color: 'from-green-500/10 to-green-500/5',
    icon: '🏥',
  },
  {
    id: 'pcmb',
    name: 'PCMB Bundle',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    price: 39,
    badge: 'Complete Package',
    color: 'from-purple-500/10 to-purple-500/5',
    icon: '⭐',
  },
  {
    id: 'physical_education',
    name: 'Physical Education',
    subjects: ['Theory Notes', 'Important Questions', 'Practical Guide'],
    price: 45,
    badge: 'Class 12 Only',
    color: 'from-emerald-500/10 to-teal-500/5',
    icon: '🏃',
  },
]

const mcqBundles = {
  '10': [
    {
      id: 'mcq_10',
      name: 'MCQ Bundle',
      subjects: ['Physics MCQs', 'Chemistry MCQs', 'Biology MCQs', 'Mathematics MCQs'],
      price: 9,
      badge: 'Class 10 MCQ Practice',
      color: 'from-orange-500/10 to-yellow-500/5',
      icon: '🎯',
    },
  ],
  '12': [
    {
      id: 'mcq_12',
      name: 'PCMB MCQ Bundle',
      subjects: ['Physics MCQs', 'Chemistry MCQs', 'Mathematics MCQs', 'Biology MCQs'],
      price: 19,
      badge: 'Class 12 MCQ Practice',
      color: 'from-orange-500/10 to-yellow-500/5',
      icon: '🎯',
    },
    {
      id: 'pe_mcq_12',
      name: 'Physical Education MCQ',
      subjects: ['Chapter-wise MCQs', 'Important Questions', 'Exam Ready Practice'],
      price: 19,
      badge: 'Class 12 PE MCQ',
      color: 'from-emerald-500/10 to-teal-500/5',
      icon: '🏃',
    },
  ],
}

export function SubjectSelectionPage({
  selectedClass,
  pageMode,
  onBundleSelect,
  onBack,
}: SubjectSelectionPageProps) {
  const isMcqMode = pageMode === 'mcq'

  // Pick the right bundles
  let bundles: any[]
  if (isMcqMode) {
    bundles = mcqBundles[selectedClass]
  } else {
    bundles = selectedClass === '10' ? class10Bundles : class12Bundles
  }

  const gridCols =
    bundles.length === 1
      ? 'md:grid-cols-1 max-w-md'
      : bundles.length === 2
      ? 'md:grid-cols-2 max-w-2xl'
      : 'md:grid-cols-3'

  const pageTitle = isMcqMode ? 'Choose Your MCQ Package' : 'Choose Your Study Package'
  const pageSubtitle = isMcqMode
    ? `Class ${selectedClass} — Multiple Choice Question Bundles`
    : `Class ${selectedClass} — Complete Subject Bundles`

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Back Button */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex items-center">
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
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">{pageSubtitle}</p>
        </div>

        {/* Bundle Options */}
        <div className="w-full max-w-6xl">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6 sm:mb-8 text-center">
            Available Bundles
          </h2>

          <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-6 mx-auto`}>
            {bundles.map((bundle) => (
              <button
                key={bundle.id}
                onClick={() =>
                  onBundleSelect(
                    bundle.id as
                      | 'science_maths'
                      | 'pcm'
                      | 'pcb'
                      | 'pcmb'
                      | 'mcq_10'
                      | 'mcq_12'
                      | 'physical_education'
                      | 'pe_mcq_12'
                  )
                }
                className="group relative overflow-hidden rounded-xl bg-card border-2 border-border p-6 sm:p-8 text-center transition-all hover:shadow-xl hover:border-primary active:scale-95"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bundle.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-block mb-4">
                    <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                      {bundle.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {bundle.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    {bundle.name}
                  </h3>

                  {/* Price */}
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-4">
                    ₹{bundle.price}
                  </div>

                  {/* Subjects List */}
                  <div className="text-sm sm:text-base text-muted-foreground mb-6 space-y-1">
                    {bundle.subjects.map((subject: string) => (
                      <div key={subject} className="flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-block px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg text-sm sm:text-base font-semibold group-hover:shadow-lg transition-shadow">
                    Get {bundle.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground max-w-2xl px-4">
          {isMcqMode
            ? 'Chapter-wise MCQ practice questions aligned with all major board exam patterns'
            : 'Each subject contains important questions and topics curated from all major board exam patterns'}
        </div>
      </div>
    </div>
  )
}