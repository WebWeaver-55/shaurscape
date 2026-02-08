'use client';

import { CheckCircle, Copy, Download, Home, MessageCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SuccessPageProps {
  driveLinks: { [key: string]: string }
  phoneNumber: string
  isBundleMode: boolean
  bundleType?: 'science_maths' | 'pcm' | 'pcb' | 'pcmb'
  onStartOver: () => void
}

const bundleNames: { [key: string]: string } = {
  science_maths: 'Science + Maths (Class 10)',
  pcm: 'PCM Bundle (Engineering)',
  pcb: 'PCB Bundle (Medical)',
  pcmb: 'PCMB Bundle (Complete)',
}

export function SuccessPage({
  driveLinks,
  phoneNumber,
  isBundleMode,
  bundleType,
  onStartOver,
}: SuccessPageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLinks = () => {
    const linksText = Object.entries(driveLinks)
      .map(([subject, link]) => `${subject}: ${link}`)
      .join('\n')
    navigator.clipboard.writeText(linksText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendToWhatsApp = () => {
    let message = ''
    const link = Object.values(driveLinks)[0]
    const bundleName = Object.keys(driveLinks)[0]
    
    if (isBundleMode && bundleType) {
      const fullBundleName = bundleNames[bundleType] || 'Bundle'
      message = `📚 StudyHub - ${fullBundleName}\n\n📖 Your Download Link:\n${link}\n\n⚠️ IMPORTANT: This message will ONLY be shown once!\nAll data will be deleted after you close this page.\nSave this link immediately! You won't be able to access it again.`
    } else {
      message = `📚 StudyHub - ${bundleName}\n\nYour Download Link:\n${link}\n\n⚠️ IMPORTANT: This message will ONLY be shown once!\nAll data will be deleted after you close this page.\nSave this link immediately! You won't be able to access it again.`
    }
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank')
  }

  // Get the single link
  const mainLink = Object.values(driveLinks)[0]
  const linkName = Object.keys(driveLinks)[0]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 bg-background py-8 sm:py-12">
      {/* Success Animation */}
      <div className="mb-6 sm:mb-8">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-bounce" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 px-2">
          Payment Successful!
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-2">
          {isBundleMode && bundleType
            ? `${bundleNames[bundleType]} - Ready for download` 
            : 'Your study material is ready'}
        </p>

        {/* Success Card */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          {/* Status Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Important Warning */}
            <div className="bg-secondary/80 border border-primary rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-bold text-primary">CRITICAL: Save This Link NOW!</p>
                  <p className="text-xs text-muted-foreground mt-1.5 sm:mt-2">
                    Your link will NEVER be shown again. All data will be deleted after you close this page. Save it to yourself via WhatsApp immediately, or you will lose access permanently.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Link Display */}
            <div className="mt-4 sm:mt-6">
              <div className="bg-secondary/50 border border-border rounded-lg p-3 sm:p-4">
                <div className="space-y-3">
                  {/* Bundle/Subject Name */}
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground mb-1">Your Download</p>
                    <p className="text-sm sm:text-base font-semibold text-foreground capitalize">{linkName}</p>
                  </div>
                  
                  {/* Link Input with Copy Button */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={mainLink}
                      readOnly
                      className="flex-1 px-3 py-2.5 sm:py-3 rounded-lg border border-border bg-secondary text-foreground text-xs sm:text-sm w-full overflow-hidden text-ellipsis"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(mainLink);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-4 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3 sm:p-4 text-left">
              <p className="text-sm font-semibold text-foreground mb-2 sm:mb-3">Next Steps:</p>
              <ol className="text-xs sm:text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Send the link to yourself via WhatsApp (use button below)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Click the link to open Google Drive</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Download all study materials to your device</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Start preparing with the materials</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 mt-6 sm:mt-8">
          <Button
            onClick={handleCopyLinks}
            variant="outline"
            className="gap-2 w-full bg-transparent h-11 sm:h-auto"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button
            onClick={handleSendToWhatsApp}
            className="gap-2 w-full h-11 sm:h-auto"
          >
            <MessageCircle className="w-4 h-4" />
            Send to WhatsApp
          </Button>
          <Button
            onClick={onStartOver}
            variant="outline"
            className="gap-2 w-full bg-transparent h-11 sm:h-auto"
          >
            <Home className="w-4 h-4" />
            Buy More
          </Button>
        </div>

        {/* Support Info */}
        <div className="bg-secondary/50 border border-border rounded-lg p-4 sm:p-6 text-xs sm:text-sm text-muted-foreground">
          <p className="mb-2 sm:mb-3">
            <span className="font-semibold text-foreground">What to do next:</span>
          </p>
          <ul className="space-y-2 text-left">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Copy the link above immediately</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Send it to yourself via WhatsApp (use the button above)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Save the message so you never lose the link</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>After closing this page, the link will be permanently deleted</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 text-center text-xs text-muted-foreground px-4">
        <p>Thank you for using StudyHub. Happy studying!</p>
      </div>
    </div>
  )
}