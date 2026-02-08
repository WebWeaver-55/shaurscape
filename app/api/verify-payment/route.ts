import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

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
    } = await req.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Payment is verified - now generate/retrieve Google Drive links
    // TODO: Replace these with actual Google Drive links from your database
    let driveLinks: { [key: string]: string } = {}

    if (isBundleMode) {
      driveLinks = {
        physics: `https://drive.google.com/file/d/PHYSICS_CLASS${selectedClass}_${phoneNumber}/view`,
        chemistry: `https://drive.google.com/file/d/CHEMISTRY_CLASS${selectedClass}_${phoneNumber}/view`,
        maths: `https://drive.google.com/file/d/MATHS_CLASS${selectedClass}_${phoneNumber}/view`,
      }
    } else {
      driveLinks = {
        [selectedSubject]: `https://drive.google.com/file/d/${selectedSubject?.toUpperCase()}_CLASS${selectedClass}_${phoneNumber}/view`,
      }
    }

    // TODO: Store payment details in database
    // await db.payments.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   phoneNumber,
    //   selectedClass,
    //   selectedSubject,
    //   isBundleMode,
    //   driveLinks,
    //   createdAt: new Date(),
    // })

    // TODO: Send WhatsApp message with links
    // await sendWhatsAppMessage(phoneNumber, driveLinks, isBundleMode)

    return NextResponse.json({
      success: true,
      driveLinks,
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}