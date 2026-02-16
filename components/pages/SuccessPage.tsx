'use client';

import { CheckCircle, Copy, MessageCircle, AlertCircle, Home, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface SuccessPageProps {
  driveLinks: { [key: string]: string }
  phoneNumber: string
  isBundleMode: boolean
  bundleType?: string
  onStartOver: () => void
}

export function SuccessPage({
  driveLinks,
  phoneNumber,
  onStartOver,
}: SuccessPageProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const entries = Object.entries(driveLinks)

  const handleCopy = (key: string, link: string) => {
    navigator.clipboard.writeText(link)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSendToWhatsApp = () => {
    const lines = entries
      .map(([name, link]) => `${name}:\n${link}`)
      .join('\n\n')

    const message =
      `📚 StudyHub — Your Downloads\n\n` +
      `${lines}\n\n` +
      `⚠️ IMPORTANT: Save these links NOW!\n` +
      `They will ONLY be shown once. After closing the page, you cannot retrieve them again.`

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCopyAll = () => {
    const text = entries.map(([name, link]) => `${name}:\n${link}`).join('\n\n')
    navigator.clipboard.writeText(text)
    setCopiedKey('__all__')
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Determine if a link is MCQ or Bundle by checking the key
  const isMcqLink = (key: string) => key.includes('MCQ') || key.includes('🎯')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[600px] h-[300px] rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Success header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Payment Successful!</h1>
          <p className="text-white/40 text-base">Your study materials are ready to download</p>
        </div>

        {/* Warning banner */}
        <div className="flex gap-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-300 mb-1">Save your links right now!</p>
            <p className="text-xs text-white/40 leading-relaxed">
              These links are shown <strong className="text-white/60">only once</strong>. Once you close this page, they cannot be retrieved. Copy them or send to WhatsApp immediately.
            </p>
          </div>
        </div>

        {/* Links cards */}
        <div className="space-y-4 mb-6">
          {entries.map(([name, link]) => {
            const isMcq = isMcqLink(name)
            return (
              <div
                key={name}
                className={`rounded-2xl border p-5 ${
                  isMcq
                    ? 'bg-violet-500/5 border-violet-500/20'
                    : 'bg-blue-500/5 border-blue-500/20'
                }`}
              >
                {/* Label */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    isMcq
                      ? 'bg-violet-500/15 text-violet-300 border-violet-500/25'
                      : 'bg-blue-500/15 text-blue-300 border-blue-500/25'
                  }`}>
                    {isMcq ? '🎯 MCQ Bank' : '📚 Study Bundle'}
                  </span>
                </div>

                {/* Name */}
                <p className="text-sm font-semibold text-white/80 mb-3 leading-snug">{name}</p>

                {/* Link row */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={link}
                    readOnly
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/50 text-xs truncate focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(name, link)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      copiedKey === name
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isMcq
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 hover:bg-violet-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedKey === name ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      isMcq
                        ? 'bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20'
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-white"
          >
            <MessageCircle className="w-5 h-5" />
            Send Both Links to WhatsApp
          </button>

          <button
            onClick={handleCopyAll}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-white/5 border border-white/10 hover:bg-white/8 transition-all flex items-center justify-center gap-2 text-white/70"
          >
            <Copy className="w-4 h-4" />
            {copiedKey === '__all__' ? '✅ All Links Copied!' : 'Copy All Links'}
          </button>

          <button
            onClick={onStartOver}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-white/3 border border-white/8 hover:bg-white/6 transition-all flex items-center justify-center gap-2 text-white/40"
          >
            <Home className="w-4 h-4" />
            Buy More Materials
          </button>
        </div>

        {/* Steps */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-4">Next Steps</p>
          <ol className="space-y-3">
            {[
              { step: '1', text: 'Click "Send Both Links to WhatsApp" to save them to your phone' },
              { step: '2', text: 'Open the 📚 Study Bundle link — download important questions & notes' },
              { step: '3', text: 'Open the 🎯 MCQ Bank link — download chapter-wise MCQ practice sheets' },
              { step: '4', text: 'Study the notes first, then practice with MCQs for best results' },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-3 text-sm text-white/50">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white/70 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step}
                </span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          Thank you for using StudyHub. Happy studying! 🎓
        </p>
      </div>
    </div>
  )
}