'use client';

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubjectSelectionPageProps {
  selectedClass: '10' | '12'
  onSelectSubject: (subject: 'physics' | 'chemistry' | 'maths') => void
  onBundleSelect?: () => void
  onBack: () => void
}

const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    description: 'Mechanics, Thermodynamics, Electromagnetism & more',
    color: 'from-primary/20 to-primary/5',
    features: ['Mechanics', 'Waves', 'Optics', 'Electromagnetism'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    description: 'Organic, Inorganic, Physical Chemistry Topics',
    color: 'from-primary/10 to-primary/0',
    features: ['Organic', 'Inorganic', 'Physical', 'Periodic Table'],
  },
  {
    id: 'maths',
    name: 'Mathematics',
    icon: '📐',
    description: 'Algebra, Geometry, Calculus & Statistics',
    color: 'from-primary/20 to-primary/5',
    features: ['Algebra', 'Geometry', 'Calculus', 'Probability'],
  },
]

export function SubjectSelectionPage({
  selectedClass,
  onSelectSubject,
  onBundleSelect,
  onBack,
}: SubjectSelectionPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Back Button */}
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
            Select Subject
          </h1>
          <p className="text-muted-foreground">
            Class {selectedClass} - PCM Subjects
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject.id as 'physics' | 'chemistry' | 'maths')}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 text-center transition-all hover:shadow-2xl hover:border-primary active:scale-95 h-full"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{subject.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{subject.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-6 flex-grow">
                  {subject.description}
                </p>

                {/* Features tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {subject.features.slice(0, 2).map((feature) => (
                    <span key={feature} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold group-hover:shadow-lg transition-shadow mt-auto">
                  Get {subject.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bundle Option */}
        {onBundleSelect && (
          <div className="mt-12 w-full max-w-4xl">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-background text-muted-foreground text-sm font-medium">
                  Or get all three
                </span>
              </div>
            </div>

            <button
              onClick={onBundleSelect}
              className="w-full group relative overflow-hidden rounded-lg bg-primary/10 border border-primary p-8 text-center transition-all hover:shadow-xl hover:bg-primary/15 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/15 transition-all" />
              <div className="relative z-10">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Save Big Bundle</div>
                <h3 className="text-3xl font-bold text-primary mb-3">₹129</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All 3 Subjects - Physics, Chemistry & Mathematics
                </p>
                <div className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold group-hover:shadow-lg transition-shadow">
                  Get All Three
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl">
          <p>Each subject contains important questions and topics curated from latest exam patterns</p>
        </div>
      </div>
    </div>
  )
}
