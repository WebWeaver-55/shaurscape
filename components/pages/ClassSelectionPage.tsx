'use client';

import { ArrowLeft, ChevronRight } from 'lucide-react'

interface StreamSelectionPageProps {
  onStreamSelect: (stream: 'science' | 'commerce' | 'physical_education') => void
  onBack: () => void
}

const streams = [
  {
    id: 'science',
    emoji: '🔬',
    label: 'Stream',
    name: 'Science',
    tagline: 'PCM · PCB · PCMB',
    desc: 'Physics, Chemistry, Maths & Biology — choose your stream and get the complete bundle with MCQs',
    bundles: '3 bundles available',
    color: 'from-blue-600/15 to-cyan-600/8',
    border: 'border-blue-500/25',
    hoverBorder: 'hover:border-blue-400/60',
    accent: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    glow: 'hover:shadow-blue-500/10',
  },
  {
    id: 'commerce',
    emoji: '📊',
    label: 'Stream',
    name: 'Commerce',
    tagline: 'Accounts · Business · Economics',
    desc: 'Complete Commerce bundle with all important questions, MCQs and notes — everything in one place',
    bundles: '1 complete bundle',
    color: 'from-emerald-600/15 to-teal-600/8',
    border: 'border-emerald-500/25',
    hoverBorder: 'hover:border-emerald-400/60',
    accent: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    glow: 'hover:shadow-emerald-500/10',
  },
  {
    id: 'physical_education',
    emoji: '🏃',
    label: 'Subject',
    name: 'Physical Education',
    tagline: 'Theory · MCQs · Practicals',
    desc: 'Complete PE bundle — theory notes, important questions and MCQs for all boards',
    bundles: '1 complete bundle',
    color: 'from-orange-600/15 to-amber-600/8',
    border: 'border-orange-500/25',
    hoverBorder: 'hover:border-orange-400/60',
    accent: 'text-orange-400',
    badge: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
    glow: 'hover:shadow-orange-500/10',
  },
]

export function ClassSelectionPage({ onStreamSelect, onBack }: StreamSelectionPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
          <div className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-3">Class 12</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Choose Your Stream</h1>
          <p className="text-white/40 text-base">
            Every bundle includes Important Questions + MCQs + Notes — <span className="text-white/70 font-semibold">all in one download</span>
          </p>
        </div>

        {/* Stream cards */}
        <div className="grid grid-cols-1 gap-4">
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => onStreamSelect(stream.id as 'science' | 'commerce' | 'physical_education')}
              className={`group relative overflow-hidden rounded-2xl border ${stream.border} ${stream.hoverBorder} bg-gradient-to-br ${stream.color} p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl ${stream.glow} active:scale-[0.99]`}
            >
              <div className="flex items-start gap-5">
                {/* Emoji */}
                <div className="text-4xl sm:text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {stream.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${stream.badge}`}>
                        {stream.label}
                      </span>
                    </div>
                    <div className={`text-xs font-medium ${stream.accent} opacity-70 flex-shrink-0`}>
                      {stream.bundles}
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white mb-1">{stream.name}</h2>
                  <p className={`text-sm font-semibold ${stream.accent} mb-2`}>{stream.tagline}</p>
                  <p className="text-white/45 text-sm leading-relaxed">{stream.desc}</p>
                </div>

                {/* Arrow */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-full border ${stream.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <ChevronRight className={`w-4 h-4 ${stream.accent}`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Price note */}
        <div className="mt-8 text-center">
          <p className="text-white/25 text-xs">One-time payment · Instant Google Drive access</p>
        </div>
      </div>
    </div>
  )
}