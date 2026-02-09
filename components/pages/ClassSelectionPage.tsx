'use client';

import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ClassSelectionPageProps {
  onSelectClass: (classLevel: '10' | '12') => void
}

export function ClassSelectionPage({ onSelectClass }: ClassSelectionPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Select Your Class
        </h1>
        <p className="text-muted-foreground">Choose your class to view available study materials</p>
      </div>

      {/* Class Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
        {/* Class 10 Card */}
        <button
          onClick={() => onSelectClass('10')}
          className="group relative overflow-hidden rounded-lg bg-card border border-border p-8 text-center transition-all hover:shadow-xl hover:border-primary hover:bg-primary/5 active:scale-95"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all" />

          <div className="relative z-10">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Class 10</h2>
            <p className="text-muted-foreground text-sm">CBSE/ICSE Class 10 Study Materials</p>

            {/* Button inside card */}
            <div className="mt-6">
              <div className="inline-block px-8 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold group-hover:shadow-lg transition-shadow">
                Select Class 10
              </div>
            </div>
          </div>
        </button>

        {/* Class 12 Card */}
        <button
          onClick={() => onSelectClass('12')}
          className="group relative overflow-hidden rounded-lg bg-card border border-border p-8 text-center transition-all hover:shadow-xl hover:border-primary hover:bg-primary/5 active:scale-95"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all" />

          <div className="relative z-10">
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Class 12</h2>
            <p className="text-muted-foreground text-sm">CBSE/ISE Class 12 Study Materials</p>

            {/* Button inside card */}
            <div className="mt-6">
              <div className="inline-block px-8 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold group-hover:shadow-lg transition-shadow">
                Select Class 12
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-2xl text-center text-sm text-muted-foreground">
        <p>Both classes offer PCM subjects: Physics, Chemistry & Mathematics</p>
      </div>
    </div>
  )
}