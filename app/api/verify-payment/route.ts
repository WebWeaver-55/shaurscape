import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Single Google Drive link for each bundle
const DRIVE_LINKS = {
  // Class 10th Science + Maths - Single Link
  science_maths: 'https://drive.google.com/drive/folders/1_sOXS7x4878MzcbX2sTJ9s2Wxymd8iHY?usp=sharing',

  // PCM Bundle (Engineering) - Single Link
  pcm: 'https://drive.google.com/drive/folders/1ke2mlyGd2GIAAQoAePAJg4M4MyaGGb8z?usp=sharing',

  // PCB Bundle (Medical) - Single Link
  pcb: 'https://drive.google.com/drive/folders/1BNNknDtnbQynURaQ0DluCFKAhZEuwF0e?usp=sharing',

  // PCMB Bundle (Complete) - Single Link
  pcmb: 'https://drive.google.com/drive/folders/11s9el_br111RWZIH5ZeELKr9bTX3Zf1H?usp=sharing',

  // MCQ Bundle — Class 10 & 12 share the same link
  mcq_10: 'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
  mcq_12: 'https://drive.google.com/drive/folders/1XamwJ3cwK8pVLcAEdt8cVDieGStDMDOt?usp=sharing',
}

const BUNDLE_DISPLAY_NAMES: Record<string, string> = {
  science_maths: 'Science & Maths',
  pcm: 'PCM Bundle',
  pcb: 'PCB Bundle',
  pcmb: 'PCMB Bundle',
  mcq_10: 'MCQ Bundle (Class 10)',
  mcq_12: 'PCMB MCQ Bundle (Class 12)',
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      phoneNumber,
      selectedClass,
      selectedSubject,
      isBundleMode,
      bundleType,
    } = await req.json()

    console.log('Payment verification request:', {
      phoneNumber,
      selectedClass,
      selectedSubject,
      isBundleMode,
      bundleType,
    })

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      console.error('Invalid payment signature')
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    console.log('✅ Signature verified successfully')

    let driveLinks: { [key: string]: string } = {}

    if (isBundleMode && bundleType) {
      console.log('Bundle mode detected with bundleType:', bundleType)

      const link = DRIVE_LINKS[bundleType as keyof typeof DRIVE_LINKS]

      if (!link) {
        console.error('Invalid bundle type:', bundleType)
        return NextResponse.json(
          { success: false, error: 'Invalid bundle type' },
          { status: 400 }
        )
      }

      const linkName = BUNDLE_DISPLAY_NAMES[bundleType] ?? bundleType
      driveLinks = { [linkName]: link }
      console.log('✅ Bundle link generated:', linkName, '→', link)

    } else if (selectedSubject) {
      console.log('Individual subject mode:', selectedSubject)
      const subjectLowerCase = selectedSubject.toLowerCase()

      if (selectedClass === '10') {
        driveLinks = { [selectedSubject]: DRIVE_LINKS.science_maths }
        console.log('✅ Class 10 individual subject — using science_maths link')
      } else if (selectedClass === '12') {
        if (subjectLowerCase === 'biology') {
          driveLinks = { [selectedSubject]: DRIVE_LINKS.pcb }
          console.log('✅ Biology subject — using PCB link')
        } else {
          driveLinks = { [selectedSubject]: DRIVE_LINKS.pcm }
          console.log('✅ PCM subject — using PCM link')
        }
      }

    } else {
      console.error('❌ Neither bundle mode nor subject specified')
      return NextResponse.json(
        { success: false, error: 'No subject or bundle specified' },
        { status: 400 }
      )
    }

    if (Object.keys(driveLinks).length === 0) {
      console.error('❌ NO DRIVE LINKS GENERATED')
      return NextResponse.json(
        { success: false, error: 'Could not generate download links' },
        { status: 500 }
      )
    }

    console.log('✅ Payment verified! Generated links:', driveLinks)

    // TODO: Store payment details in database
    // TODO: Send WhatsApp message with links

    return NextResponse.json({ success: true, driveLinks })
  } catch (error) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}