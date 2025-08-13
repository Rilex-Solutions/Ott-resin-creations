import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  inquiryType: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      )
    }

    // Get inquiry type label
    const getInquiryTypeLabel = (type: string) => {
      const types: { [key: string]: string } = {
        'general': 'General Question',
        'custom': 'Custom Order Inquiry',
        'existing': 'Question About Existing Product',
        'shipping': 'Shipping & Delivery',
        'care': 'Care Instructions',
        'wholesale': 'Wholesale/Business',
        'other': 'Other'
      }
      return types[type] || type
    }

    // Create email content for Janet
    const janetEmailContent = `
New Contact Form Submission - Huberduberkid Resin Creations

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}
Inquiry Type: ${getInquiryTypeLabel(formData.inquiryType)}
Submitted: ${new Date(formData.timestamp).toLocaleString()}

Message:
${formData.message}

Please respond to this inquiry within 24 hours during business days.
    `.trim()

    // Create confirmation email content for customer
    const customerEmailContent = `
Thank you for contacting us!

Hi ${formData.name},

Thank you for reaching out to Huberduberkid Resin Creations! We've received your message and a member of our team will get back to you within 24 hours during business days.

Your inquiry details:
Subject: ${formData.subject}
Inquiry Type: ${getInquiryTypeLabel(formData.inquiryType)}
Submitted: ${new Date(formData.timestamp).toLocaleString()}

If you have any urgent questions, you can also reach us directly at huberduberkid@gmail.com or (720) 805-5509.

We look forward to speaking with you soon!

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
          from: 'Huberduberkid Resin Creations <contact@huberduberkid.com>',
          to: ['huberduberkid@gmail.com'],
          subject: `New Contact Form: ${formData.subject}`,
          text: janetEmailContent,
        })
        console.log('✅ Contact form email sent to Janet successfully')
      } catch (emailError) {
        console.error('❌ Failed to send contact email to Janet:', emailError)
        // Continue anyway - don't fail the whole request
      }

      // Send confirmation email to customer
      try {
        await resend.emails.send({
          from: 'Huberduberkid Resin Creations <contact@huberduberkid.com>',
          to: [formData.email],
          subject: 'Thank you for contacting Huberduberkid Resin Creations',
          text: customerEmailContent,
        })
        console.log('✅ Confirmation email sent to customer successfully')
      } catch (emailError) {
        console.error('❌ Failed to send contact confirmation email:', emailError)
        // Continue anyway - don't fail the whole request
      }
    }

    // Also log to console for debugging
    console.log('📧 Contact form email content sent to Janet:')
    console.log(janetEmailContent)
    console.log('\n---\n')
    console.log('📧 Contact confirmation email sent to customer:')
    console.log(customerEmailContent)

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}