#!/usr/bin/env node

// Test Contact Email - Simulate Contact Form Submission
// This shows exactly what emails Janet and the customer would receive

const sampleContactForm = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com", 
  phone: "(720) 805-5509",
  subject: "Custom Resin Coaster Set Inquiry",
  message: "Hi! I'm interested in ordering a set of 6 custom coasters for my dining room. I'd like them to have ocean wave designs with blue and teal colors, and maybe some gold accents. What would the pricing be and how long would it take? Thank you!",
  inquiryType: "custom",
  timestamp: new Date().toISOString()
}

// Helper function to get inquiry type labels
const getInquiryTypeLabel = (type) => {
  const types = {
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

// Create the exact email content that would be sent to Janet
const janetEmailContent = `
New Contact Form Submission - Huberduberkid Resin Creations

Contact Information:
Name: ${sampleContactForm.name}
Email: ${sampleContactForm.email}
Phone: ${sampleContactForm.phone || 'Not provided'}
Subject: ${sampleContactForm.subject}
Inquiry Type: ${getInquiryTypeLabel(sampleContactForm.inquiryType)}
Submitted: ${new Date(sampleContactForm.timestamp).toLocaleString()}

Message:
${sampleContactForm.message}

Please respond to this inquiry within 24 hours during business days.
`.trim()

// Create the customer confirmation email
const customerEmailContent = `
Thank you for contacting us!

Hi ${sampleContactForm.name},

Thank you for reaching out to Huberduberkid Resin Creations! We've received your message and a member of our team will get back to you within 24 hours during business days.

Your inquiry details:
Subject: ${sampleContactForm.subject}
Inquiry Type: ${getInquiryTypeLabel(sampleContactForm.inquiryType)}
Submitted: ${new Date(sampleContactForm.timestamp).toLocaleString()}

If you have any urgent questions, you can also reach us directly at huberduberkid@gmail.com or (555) 123-4567.

We look forward to speaking with you soon!

Best regards,
The Huberduberkid Resin Creations Team
`.trim()

console.log('='.repeat(80))
console.log('CONTACT FORM EMAIL SIMULATION')
console.log('='.repeat(80))
console.log()

console.log('📧 EMAIL TO JANET (huberduberkid@gmail.com):')
console.log('Subject: New Contact Form: ' + sampleContactForm.subject)
console.log('-'.repeat(50))
console.log(janetEmailContent)

console.log()
console.log('='.repeat(80))
console.log()

console.log('📧 CONFIRMATION EMAIL TO CUSTOMER:')
console.log('Subject: Thank you for contacting Huberduberkid Resin Creations')
console.log('-'.repeat(50))
console.log(customerEmailContent)

console.log()
console.log('='.repeat(80))
console.log('✅ This is exactly what the contact form emails would contain!')
console.log('✅ API endpoint: POST /api/contact/submit')
console.log('✅ Page route: /contact')
console.log('✅ Uses Resend for email delivery')
console.log('='.repeat(80))