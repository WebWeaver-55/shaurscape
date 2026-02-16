'use client';

import { useState } from 'react'
import { ArrowRight, BookOpen, Star, Zap, Shield, Trophy, ChevronRight } from 'lucide-react'

interface LandingPageProps {
  onClassSelect: (classLevel: '10' | '12') => void
}

export function LandingPage({ onClassSelect }: LandingPageProps) {
  const [hoveredClass, setHoveredClass] = useState<'10' | '12' | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-blue-500/6 blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-amber-400 font-medium tracking-wider uppercase">
            <Zap className="w-3 h-3" />
            India's Most Affordable Study Materials
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">Hub</span>
            </h1>
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-4 leading-tight">
            Stop Wasting Time.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-300">Start Scoring Higher.</span>
          </p>

          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10">
            Complete bundles of Important Questions + MCQs + Notes for Class 10 & 12 — curated from past papers, exam-ready, all boards.
          </p>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
            {[
              { icon: '🎯', text: '10,000+ Questions' },
              { icon: '📚', text: 'All Boards Covered' },
              { icon: '⚡', text: 'Instant Download' },
              { icon: '✅', text: '100% Exam Relevant' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value proposition cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto">
          {[
            {
              icon: <Trophy className="w-5 h-5" />,
              title: 'Past Paper Questions',
              desc: 'Most repeated, highest-weightage questions from the last 10 years',
              color: 'from-amber-500/20 to-orange-500/10',
              border: 'border-amber-500/20',
              iconColor: 'text-amber-400',
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: 'MCQs + Theory',
              desc: 'Chapter-wise MCQs combined with important theory questions in one bundle',
              color: 'from-violet-500/20 to-purple-500/10',
              border: 'border-violet-500/20',
              iconColor: 'text-violet-400',
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: 'All Boards',
              desc: 'CBSE, ICSE, State boards — patterns covered across all major boards',
              color: 'from-blue-500/20 to-cyan-500/10',
              border: 'border-blue-500/20',
              iconColor: 'text-blue-400',
            },
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 text-left`}>
              <div className={`${card.iconColor} mb-3`}>{card.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{card.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CLASS SELECTION — the main CTA */}
        <div className="text-center mb-8">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-6 font-medium">Choose Your Class to Get Started</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* Class 10 */}
            <button
              onClick={() => onClassSelect('10')}
              onMouseEnter={() => setHoveredClass('10')}
              onMouseLeave={() => setHoveredClass(null)}
              className="group relative overflow-hidden rounded-3xl border-2 border-white/10 bg-white/5 p-8 text-left transition-all duration-300 hover:border-violet-500/60 hover:bg-white/8 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">📘</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider bg-violet-400/10 px-2 py-0.5 rounded-full">Science + Maths</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Class 10</h2>
                <p className="text-white/50 text-sm mb-5">Complete bundle — Physics, Chemistry, Biology & Maths with MCQs included</p>
                <div className="flex items-center justify-end">
                  <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-violet-400" />
                  </div>
                </div>
              </div>
            </button>

            {/* Class 12 */}
            <button
              onClick={() => onClassSelect('12')}
              onMouseEnter={() => setHoveredClass('12')}
              onMouseLeave={() => setHoveredClass(null)}
              className="group relative overflow-hidden rounded-3xl border-2 border-amber-500/30 bg-amber-500/5 p-8 text-left transition-all duration-300 hover:border-amber-500/70 hover:bg-amber-500/8 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              {/* Popular badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Popular
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🎓</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded-full">Science · Commerce · PE</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Class 12</h2>
                <p className="text-white/50 text-sm mb-5">Science, Commerce & Physical Education — subject bundles with MCQs included</p>
                <div className="flex items-center justify-end">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Testimonial / trust */}
        <div className="text-center mt-16 pt-8 border-t border-white/5">
          <p className="text-white/25 text-xs">
            Secure payment via Razorpay · Instant Google Drive access · Used by students across India
          </p>
        </div>
      </div>
    </div>
  )
}