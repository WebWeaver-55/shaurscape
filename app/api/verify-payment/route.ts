import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// ─── BUNDLE LINKS (Important Questions + Notes) ───────────────────────────────
const BUNDLE_LINKS: Record<string, string> = {
  science_10:  'https://drive.google.com/drive/folders/1_sOXS7x4878MzcbX2sTJ9s2Wxymd8iHY?usp=sharing',
  pcm_12:      'https://drive.google.com/drive/folders/1ke2mlyGd2GIAAQoAePAJg4M4MyaGGb8z?usp=sharing',
  pcb_12:      'https://drive.google.com/drive/folders/1BNNknDtnbQynURaQ0DluCFKAhZEuwF0e?usp=sharing',
  pcmb_12:     'https://drive.google.com/drive/folders/11s9el_br111RWZIH5ZeELKr9bTX3Zf1H?usp=sharing',
  commerce_12: 'https://drive.google.com/drive/folders/1pNzETo6rf8yxbNPozXJIAdVhER0x2OmS?usp=sharing',
  pe_12:       'https://drive.google.com/drive/folders/1sOwXakLBg-KyP1EcqjguWBJstWTC1du4?usp=sharing',
}

// ─── MCQ LINKS ────────────────────────────────────────────────────────────────
const MCQ_LINKS: Record<string, string> = {
  science_10:  'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  pcm_12:      'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  pcb_12:      'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  pcmb_12:     'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  commerce_12: 'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  pe_12:       'https://drive.google.com/drive/folders/1r9xd8ALU3sy4xg_S8W9900EdYhCQXFrr?usp=sharing',
}

// ─── DISPLAY NAMES ────────────────────────────────────────────────────────────
const BUNDLE_NAMES: Record<string, string> = {
  science_10:  '📚 Science + Maths — Important Questions & Notes',
  pcm_12:      '📚 PCM Bundle — Important Questions & Notes',
  pcb_12:      '📚 PCB Bundle — Important Questions & Notes',
  pcmb_12:     '📚 PCMB Bundle — Important Questions & Notes',
  commerce_12: '📚 Commerce Bundle — Important Questions & Notes',
  pe_12:       '📚 Physical Education — Important Questions & Notes',
}

const MCQ_NAMES: Record<string, string> = {
  science_10:  '🎯 Science + Maths — MCQ Bank',
  pcm_12:      '🎯 PCM — MCQ Bank',
  pcb_12:      '🎯 PCB — MCQ Bank',
  pcmb_12:     '🎯 PCMB — MCQ Bank',
  commerce_12: '🎯 Commerce — MCQ Bank',
  pe_12:       '🎯 Physical Education — MCQ Bank',
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      phoneNumber,
      selectedClass,
      isBundleMode,
      bundleType,
    } = await req.json()

    console.log('Payment verification request:', { phoneNumber, selectedClass, isBundleMode, bundleType })

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      console.error('Invalid payment signature')
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 })
    }

    console.log('✅ Signature verified')

    if (!isBundleMode || !bundleType) {
      return NextResponse.json({ success: false, error: 'No bundle specified' }, { status: 400 })
    }

    const bundleLink = BUNDLE_LINKS[bundleType]
    const mcqLink = MCQ_LINKS[bundleType]

    if (!bundleLink || !mcqLink) {
      console.error('Unknown bundle type:', bundleType)
      return NextResponse.json({ success: false, error: 'Invalid bundle type' }, { status: 400 })
    }

    const driveLinks: Record<string, string> = {
      [BUNDLE_NAMES[bundleType]]: bundleLink,
      [MCQ_NAMES[bundleType]]:    mcqLink,
    }

    console.log('✅ Payment verified! Returning links:', Object.keys(driveLinks))

    return NextResponse.json({ success: true, driveLinks })
  } catch (error) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 500 })
  }
}