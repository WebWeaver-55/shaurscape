'use client';

import { CheckCircle, Copy, Download, Home, MessageCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SuccessPageProps {
  driveLinks: { [key: string]: string }
  phoneNumber: string
  isBundleMode: boolean
  onStartOver: () => void
}

export function SuccessPage({
  driveLinks,
  phoneNumber,
  isBundleMode,
  onStartOver,
}: SuccessPageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLinks = () => {
    const linksText = Object.entries(driveLinks)
      .map(([subject, link]) => `${subject.toUpperCase()}: ${link}`)
      .join('\n')
    navigator.clipboard.writeText(linksText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendToWhatsApp = () => {
    let message = ''
    if (isBundleMode) {
      message = `📚 StudyHub - All 3 Subjects Bundle\n\nYour Links:\n\n`
      message += Object.entries(driveLinks)
        .map(([subject, link]) => `📖 ${subject.toUpperCase()}:\n${link}`)
        .join('\n\n')
      message += `\n\n⚠️ IMPORTANT: This message will ONLY be shown once!\nAll data will be deleted after you close this page.\nSave these links immediately! You won't be able to access them again.`
    } else {
      const subject = Object.keys(driveLinks)[0]
      const link = Object.values(driveLinks)[0]
      message = `📚 StudyHub - ${subject.toUpperCase()}\n\nYour Download Link:\n${link}\n\n⚠️ IMPORTANT: This message will ONLY be shown once!\nAll data will be deleted after you close this page.\nSave this link immediately! You won't be able to access it again.`
    }
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank')
  }

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
          {isBundleMode ? 'All 3 subjects are ready for download' : 'Your study material is ready'}
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
                  <p className="text-sm font-bold text-primary">CRITICAL: Save These Links NOW!</p>
                  <p className="text-xs text-muted-foreground mt-1.5 sm:mt-2">
                    Your {isBundleMode ? 'links will NEVER be shown again' : 'link will NEVER be shown again'}. All data will be deleted after you close this page. Save {isBundleMode ? 'them' : 'it'} to yourself via WhatsApp immediately, or you will lose access permanently.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Links Display */}
            <div className="mt-4 sm:mt-6 space-y-3">
              {Object.entries(driveLinks).map(([subject, link]) => (
                <div key={subject} className="bg-secondary/50 border border-border rounded-lg p-3 sm:p-4">
                  <div className="space-y-3">
                    {/* Subject Name */}
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground mb-1">Subject</p>
                      <p className="text-sm sm:text-base font-semibold text-foreground capitalize">{subject}</p>
                    </div>
                    
                    {/* Link Input with Copy Button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={link}
                        readOnly
                        className="flex-1 px-3 py-2.5 sm:py-3 rounded-lg border border-border bg-secondary text-foreground text-xs sm:text-sm w-full overflow-hidden text-ellipsis"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(link);
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
              ))}
            </div>

            {/* Next Steps */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3 sm:p-4 text-left">
              <p className="text-sm font-semibold text-foreground mb-2 sm:mb-3">Next Steps:</p>
              <ol className="text-xs sm:text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Check your WhatsApp for the direct download link</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Click the link to open Google Drive</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Download the study materials to your device</span>
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
            {copied ? 'Copied!' : 'Copy Links'}
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