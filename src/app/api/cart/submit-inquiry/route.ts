import { NextRequest, NextResponse } from 'next/server'
import { CartInquiry } from '@/types/cart'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const inquiry: CartInquiry = await request.json()
    
    // Validate required fields
    if (!inquiry.customer.name || !inquiry.customer.email || !inquiry.customer.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }
    
    if (!inquiry.items || inquiry.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart cannot be empty' },
        { status: 400 }
      )
    }

    // Create email content for Janet
    const janetEmailContent = `
New Purchase Inquiry - Huber Duber Resin Creations

Customer Information:
Name: ${inquiry.customer.name}
Email: ${inquiry.customer.email}
Phone: ${inquiry.customer.phone}
Inquiry Date: ${new Date(inquiry.timestamp).toLocaleString()}

Items Requested:
${inquiry.items.map(item => `
- ${item.name}
  Price: $${item.price.toFixed(2)}
  Description: ${item.description}
`).join('')}

Total: $${inquiry.total.toFixed(2)}

Please contact the customer within 24 hours to confirm the order and arrange payment.
    `.trim()

    // Create confirmation email content for customer
    const customerEmailContent = `
Thank you for your purchase inquiry!

Hi ${inquiry.customer.name},

Thank you for your interest in our resin art pieces! We've received your inquiry for the following items:

${inquiry.items.map(item => `
- ${item.name} - $${item.price.toFixed(2)}
  ${item.description}
`).join('')}

Total: $${inquiry.total.toFixed(2)}

Janet will be reaching out to you within 24 hours to confirm your order and take payment.

If you have any questions, please don't hesitate to reach out!

Best regards,
Huber Duber Resin Creations
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
          from: 'Huber Duber Resin Creations <orders@huberduberkid.com>',
          to: ['huberduberkid@gmail.com'],
          subject: 'New Purchase Inquiry - Huber Duber Resin Creations',
          text: janetEmailContent,
        })
        console.log('✅ Email sent to Janet successfully')
      } catch (emailError) {
        console.error('❌ Failed to send email to Janet:', emailError)
        // Continue anyway - don't fail the whole request
      }
    }

    // Send confirmation email to customer
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Huber Duber Resin Creations <orders@huberduberkid.com>',
          to: [inquiry.customer.email],
          subject: 'Your Purchase Inquiry - Huber Duber Resin Creations',
          text: customerEmailContent,
        })
        console.log('✅ Confirmation email sent to customer successfully')
      } catch (emailError) {
        console.error('❌ Failed to send confirmation email:', emailError)
        // Continue anyway - don't fail the whole request
      }
    }

    // Also log to console for debugging
    console.log('📧 Email content sent to Janet:')
    console.log(janetEmailContent)
    console.log('\n---\n')
    console.log('📧 Email content sent to customer:')
    console.log(customerEmailContent)

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully' 
    })

  } catch (error) {
    console.error('Error processing cart inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}