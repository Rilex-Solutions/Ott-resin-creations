#!/usr/bin/env node

// Test Cart Email - Simulate Customer Purchase
// This shows exactly what email Janet would receive

const sampleCartInquiry = {
  customer: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com", 
    phone: "(720) 805-5509"
  },
  items: [
    {
      id: 1,
      name: "Ocean Wave Coaster Set",
      price: 32.00,
      description: "Set of 4 ocean-themed coasters with blue and teal waves, finished with gold accents"
    },
    {
      id: 15,
      name: "Dragon Eye Dice Set",
      price: 45.00,
      description: "7-piece RPG dice set with dragon eye design in purple and silver"
    },
    {
      id: 23,
      name: "Celestial Phone Stand",
      price: 28.00,
      description: "Phone stand with galaxy design featuring stars and nebula in deep blue and purple"
    }
  ],
  total: 105.00,
  timestamp: new Date().toISOString()
}

// Create the exact email content that would be sent to Janet
const janetEmailContent = `
New Purchase Inquiry - Huberduberkid Resin Creations

Customer Information:
Name: ${sampleCartInquiry.customer.name}
Email: ${sampleCartInquiry.customer.email}
Phone: ${sampleCartInquiry.customer.phone}
Inquiry Date: ${new Date(sampleCartInquiry.timestamp).toLocaleString()}

Items Requested:
${sampleCartInquiry.items.map(item => `
- ${item.name}
  Price: $${item.price.toFixed(2)}
  Description: ${item.description}
`).join('')}

Total: $${sampleCartInquiry.total.toFixed(2)}

Please contact the customer within 24 hours to confirm the order and arrange payment.
`.trim()

// Create the customer confirmation email
const customerEmailContent = `
Thank you for your purchase inquiry!

Hi ${sampleCartInquiry.customer.name},

Thank you for your interest in our resin art pieces! We've received your inquiry for the following items:

${sampleCartInquiry.items.map(item => `
- ${item.name} - $${item.price.toFixed(2)}
  ${item.description}
`).join('')}

Total: $${sampleCartInquiry.total.toFixed(2)}

Janet will be reaching out to you within 24 hours to confirm your order and take payment.

If you have any questions, please don't hesitate to reach out!

Best regards,
Huberduberkid Resin Creations
`.trim()

console.log('='.repeat(80))
console.log('CART EMAIL SIMULATION')
console.log('='.repeat(80))
console.log()

console.log('📧 EMAIL TO JANET (huberduberkid@gmail.com):')
console.log('-'.repeat(50))
console.log(janetEmailContent)

console.log()
console.log('='.repeat(80))
console.log()

console.log('📧 CONFIRMATION EMAIL TO CUSTOMER:')
console.log('-'.repeat(50))
console.log(customerEmailContent)

console.log()
console.log('='.repeat(80))
console.log('✅ This is exactly what the emails would contain!')
console.log('✅ To implement real emails, configure SendGrid/Mailgun in the API route')
console.log('='.repeat(80))