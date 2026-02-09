'use client';

import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onStartClick: () => void
}

export function LandingPage({ onStartClick }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            StudyHub
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-2 text-balance">
          Premium Study Materials for Class 10 & 12
        </p>
        <p className="text-sm md:text-base text-muted-foreground text-balance">
          PCM Subjects - Physics, Chemistry & Mathematics
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 w-full">
        {[
          {
            title: 'Important Questions',
            description: 'Curated questions from past papers and exams',
          },
          {
            title: 'Topic Coverage',
            description: 'Complete coverage of all topics in PCM',
          },
          {
            title: 'Google Drive Access',
            description: 'Instant download links after payment',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-card rounded-lg p-6 border border-border text-center hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Preview */}
      <div className="bg-card border border-border rounded-lg p-8 max-w-3xl w-full mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Unbeatable Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Single Subject</p>
            <p className="text-4xl font-bold text-primary">₹35</p>
            <p className="text-xs text-muted-foreground mt-2">Physics, Chemistry or Maths</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-16 w-px bg-border" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">All Three Subjects</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-lg text-muted-foreground line-through opacity-60">₹499</p>
              <p className="text-4xl font-bold text-primary">₹35</p>
            </div>
            <p className="text-xs text-primary font-semibold mt-2">Save ₹18!</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onStartClick}
        size="lg"
        className="gap-2 px-8 py-6 text-base"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </Button>

      {/* Footer */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Select your class and subject to browse available materials</p>
      </div>
    </div>
  )
}
