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
      bundleType, // Optional - may or may not be present
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

    // Payment is verified - generate Google Drive links
    let driveLinks: { [key: string]: string } = {}
    let linkName = ''

    if (isBundleMode && bundleType) {
      console.log('Bundle mode detected with bundleType:', bundleType)
      
      // Get the link based on bundleType
      const link = DRIVE_LINKS[bundleType as keyof typeof DRIVE_LINKS]
      
      if (!link) {
        console.error('Invalid bundle type:', bundleType)
        return NextResponse.json(
          { success: false, error: 'Invalid bundle type' },
          { status: 400 }
        )
      }

      // Set display name based on bundle type
      if (bundleType === 'science_maths') {
        linkName = 'Science & Maths'
      } else if (bundleType === 'pcm') {
        linkName = 'PCM Bundle'
      } else if (bundleType === 'pcb') {
        linkName = 'PCB Bundle'
      } else if (bundleType === 'pcmb') {
        linkName = 'PCMB Bundle'
      }
      
      driveLinks = {
        [linkName]: link
      }
      
      console.log('✅ Bundle link generated:', linkName, '→', link)
    } else if (selectedSubject) {
      console.log('Individual subject mode:', selectedSubject)
      
      // Individual subject purchase - map to appropriate bundle link
      const subjectLowerCase = selectedSubject.toLowerCase()
      
      if (selectedClass === '10') {
        // Class 10 subjects use science_maths bundle
        driveLinks = {
          [selectedSubject]: DRIVE_LINKS.science_maths
        }
        console.log('✅ Class 10 individual subject - using science_maths link')
      } else if (selectedClass === '12') {
        // Class 12 individual subjects map to their bundles
        if (subjectLowerCase === 'biology') {
          driveLinks = {
            [selectedSubject]: DRIVE_LINKS.pcb
          }
          console.log('✅ Biology subject - using PCB link')
        } else {
          // Physics, Chemistry, Maths use PCM bundle
          driveLinks = {
            [selectedSubject]: DRIVE_LINKS.pcm
          }
          console.log('✅ PCM subject - using PCM link')
        }
      }
    } else {
      console.error('❌ Neither bundle mode nor subject specified')
      return NextResponse.json(
        { success: false, error: 'No subject or bundle specified' },
        { status: 400 }
      )
    }

    // Validate that we have links
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

    return NextResponse.json({
      success: true,
      driveLinks,
    })
  } catch (error) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}