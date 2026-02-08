import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: NextRequest) {
  try {
    // Check if environment variables are set
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials missing:', {
        keyId: keyId ? 'present' : 'missing',
        keySecret: keySecret ? 'present' : 'missing'
      })
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please check environment variables.' },
        { status: 500 }
      )
    }

    // Initialize Razorpay inside the handler
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const { amount, phoneNumber, selectedClass, selectedSubject, isBundleMode, bundleType } = await req.json()

    console.log('Creating order:', {
      amount,
      phoneNumber,
      selectedClass,
      selectedSubject,
      isBundleMode,
      bundleType
    })

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        phoneNumber,
        selectedClass,
        selectedSubject: selectedSubject || 'bundle',
        isBundleMode: isBundleMode.toString(),
        bundleType: bundleType || 'none',
      },
    }

    const order = await razorpay.orders.create(options)

    console.log('Order created successfully:', order.id)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}