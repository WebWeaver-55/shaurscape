'use client';

import { ArrowRight, BookOpen, Zap, Target, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onBundleClick: () => void
  onMcqClick: () => void
}

export function LandingPage({ onBundleClick, onMcqClick }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Brand Header */}
      <div className="text-center mb-10 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-5">
          <BookOpen className="w-9 h-9 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">StudyHub</h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-1">
          Premium Study Materials for Class 10 &amp; 12
        </p>
        <p className="text-sm text-muted-foreground">
          Physics · Chemistry · Maths · Biology — CBSE aligned, exam-ready
        </p>
      </div>

      {/* Two Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mb-10">

        {/* Card 1 — Subject Bundle */}
        <div className="bg-card border-2 border-border rounded-2xl p-7 flex flex-col gap-4 hover:shadow-xl hover:border-primary/60 transition-all group">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Subject Bundle</p>
              <h2 className="text-xl font-bold text-foreground">Important Questions</h2>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Curated important questions &amp; topic-wise notes for PCM / PCB / Science+Maths — exactly what exams ask.
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              'Topic-wise important questions',
              'Past paper patterns covered',
              'Class 10 &amp; 12 available',
              'Instant Google Drive access',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <Button
            onClick={onBundleClick}
            className="mt-auto gap-2 group-hover:gap-3 transition-all"
          >
            Get Subject Bundle
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Card 2 — MCQ Bundle */}
        <div className="bg-card border-2 border-primary/40 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-xl hover:border-primary transition-all group relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
              <Zap className="w-3 h-3" /> New
            </span>
          </div>

          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">MCQ Bundle</p>
              <h2 className="text-xl font-bold text-foreground">Multiple Choice Questions</h2>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Comprehensive MCQ bank for all PCMB subjects — perfect for NEET, JEE, and board exam prep with quick practice.
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              'Hundreds of MCQs per subject',
              'Chapter-wise organised',
              'Class 10 &amp; 12 available',
              'Instant Google Drive access',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <Button
            onClick={onMcqClick}
            className="mt-auto gap-2 group-hover:gap-3 transition-all"
          >
            Get MCQ Bundle
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground mb-6">
        {[
          '✅ CBSE Curriculum Aligned',
          '⚡ Instant Download',
          '📱 Works on Any Device',
          '🔒 Secure Payment',
        ].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-center">
        Choose your package above · Pay once · Download instantly via Google Drive
      </p>
    </div>
  )
}