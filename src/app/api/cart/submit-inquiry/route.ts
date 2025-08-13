import { NextRequest, NextResponse } from 'next/server'
import { CartInquiry } from '@/types/cart'

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
New Purchase Inquiry - Ott Resin Creations

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
Ott Resin Creations
    `.trim()

    // In a real application, you would send emails here using a service like:
    // - SendGrid
    // - Mailgun
    // - Nodemailer with SMTP
    // - AWS SES
    
    // For now, we'll simulate email sending and log the content
    console.log('Email to Janet (huberduberkid@gmail.com):')
    console.log(janetEmailContent)
    console.log('\n---\n')
    console.log(`Email to Customer (${inquiry.customer.email}):`)
    console.log(customerEmailContent)

    // TODO: Replace this console.log with actual email sending
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'huberduberkid@gmail.com',
      subject: 'New Purchase Inquiry - Ott Resin Creations',
      text: janetEmailContent
    })
    
    await emailService.send({
      to: inquiry.customer.email,
      subject: 'Your Purchase Inquiry - Ott Resin Creations',
      text: customerEmailContent
    })
    */

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