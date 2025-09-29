import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Starting email test...')

    // Check if API key exists
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.log('❌ No RESEND_API_KEY found')
      return NextResponse.json({
        error: 'RESEND_API_KEY not configured',
        step: 'api_key_check'
      }, { status: 500 })
    }

    console.log('✅ API key found:', resendApiKey.substring(0, 10) + '...')

    // Initialize Resend
    const resend = new Resend(resendApiKey)
    console.log('✅ Resend initialized')

    // Try to send a simple test email
    console.log('📧 Attempting to send test email...')

    const emailResult = await resend.emails.send({
      from: 'Test Email <onboarding@resend.dev>',
      to: ['huberduberkid@gmail.com'],
      subject: 'Resend API Test - ' + new Date().toISOString(),
      text: `This is a test email sent at ${new Date().toLocaleString()}.

If you receive this, the Resend API is working correctly.

Test details:
- API Key: ${resendApiKey.substring(0, 10)}...
- From: onboarding@resend.dev
- To: tiffanycodes.co@gmail.com
- Time: ${new Date().toISOString()}`,
    })

    console.log('✅ Email sent successfully!')
    console.log('📧 Email result:', emailResult)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      emailResult: emailResult,
      apiKey: resendApiKey.substring(0, 10) + '...',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Email test failed:', error)

    return NextResponse.json({
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      step: 'email_send',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}