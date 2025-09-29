import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface CustomOrderFormData {
  name: string
  email: string
  phone: string
  description: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: CustomOrderFormData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      return NextResponse.json(
        { error: 'Name, email, phone, and description are required' },
        { status: 400 }
      )
    }

    // Create email content for Janet
    const janetEmailContent = `
New Custom Order Request - Huberduberkid Resin Creations

Customer Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Submitted: ${new Date(formData.timestamp).toLocaleString()}

Custom Order Description:
${formData.description}

Please contact the customer within 24 hours to discuss their custom order request, pricing, and timeline.
    `.trim()

    // Create confirmation email content for customer
    const customerEmailContent = `
Thank you for your custom order request!

Hi ${formData.name},

Thank you for your interest in a custom resin art piece! We've received your request and a member of our team will call you within 24 hours to discuss your ideas, finalize pricing, and arrange payment and delivery.

Your custom order request:
Submitted: ${new Date(formData.timestamp).toLocaleString()}

Description:
${formData.description}

Please keep your phone handy - we're excited to bring your vision to life!

If you have any questions in the meantime, you can reach us at huberduberkid@gmail.com or (720) 805-5509.

Best regards,
The Huberduberkid Resin Creations Team
    `.trim()

    // Initialize Resend (check if API key exists)
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY not found - emails will only be logged to console')
    }

    const resend = resendApiKey ? new Resend(resendApiKey) : null

    // Send email to Janet
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Huberduberkid Resin Creations <onboarding@resend.dev>',
          to: ['huberduberkid@gmail.com'],
          subject: 'New Custom Order Request - Huberduberkid Resin Creations',
          text: janetEmailContent,
        })
        console.log('✅ Custom order email sent to Janet successfully')
      } catch (emailError) {
        console.error('❌ Failed to send custom order email to Janet:', emailError)
        // Continue anyway - don't fail the whole request
      }

      // Send confirmation email to customer
      try {
        await resend.emails.send({
          from: 'Huberduberkid Resin Creations <onboarding@resend.dev>',
          to: [formData.email],
          subject: 'Thank you for your custom order request - Huberduberkid Resin Creations',
          text: customerEmailContent,
        })
        console.log('✅ Custom order confirmation email sent to customer successfully')
      } catch (emailError) {
        console.error('❌ Failed to send custom order confirmation email:', emailError)
        // Continue anyway - don't fail the whole request
      }
    }

    // Also log to console for debugging
    console.log('📧 Custom order email content sent to Janet:')
    console.log(janetEmailContent)
    console.log('\n---\n')
    console.log('📧 Custom order confirmation email sent to customer:')
    console.log(customerEmailContent)

    return NextResponse.json({
      success: true,
      message: 'Custom order request submitted successfully'
    })

  } catch (error) {
    console.error('Error processing custom order request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}