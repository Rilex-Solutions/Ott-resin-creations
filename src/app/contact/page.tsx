'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'
import styles from './contact.module.scss'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  inquiryType: 'general'
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(initialFormData)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.mainContent}>
          <Breadcrumb items={breadcrumbItems} />
          <PageHero 
            title="Thank You!"
            subtitle="Your message has been sent successfully. We'll get back to you within 24 hours."
          />
          <div className={styles.successSection}>
            <div className={styles.successContainer}>
              <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className={styles.successTitle}>Message Sent Successfully!</h2>
              <p className={styles.successDescription}>
                Thank you for reaching out to us. A member of our team will review your message and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className={styles.backButton}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <Breadcrumb items={breadcrumbItems} />
        
        <PageHero 
          title="Contact Us"
          subtitle="Have questions about our resin art pieces or want to discuss a custom order? We'd love to hear from you!"
        />

        <div className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              
              {/* Contact Information */}
              <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Get In Touch</h2>
                <p className={styles.sectionDescription}>
                  Whether you're interested in our existing pieces, want to commission something custom, 
                  or just have questions about resin art, we're here to help!
                </p>

                <div className={styles.contactMethods}>
                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <h3>Email</h3>
                      <p>huberduberkid@gmail.com</p>
                    </div>
                  </div>

                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <h3>Phone</h3>
                      <p>(720) 805-5509</p>
                    </div>
                  </div>

                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <h3>Response Time</h3>
                      <p>Within 24 hours</p>
                    </div>
                  </div>

                  <div className={styles.contactMethod}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className={styles.contactDetails}>
                      <h3>Location</h3>
                      <p>Serving customers nationwide</p>
                    </div>
                  </div>
                </div>

                <div className={styles.businessHours}>
                  <h3 className={styles.hoursTitle}>Business Hours</h3>
                  <div className={styles.hoursGrid}>
                    <div className={styles.hoursDay}>
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className={styles.hoursDay}>
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className={styles.hoursDay}>
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={styles.contactForm}>
                <h2 className={styles.formTitle}>Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                  
                  {/* Inquiry Type */}
                  <div className={styles.formGroup}>
                    <label htmlFor="inquiryType" className={styles.label}>
                      What can we help you with? *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className={styles.select}
                    >
                      <option value="general">General Question</option>
                      <option value="custom">Custom Order Inquiry</option>
                      <option value="existing">Question About Existing Product</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="care">Care Instructions</option>
                      <option value="wholesale">Wholesale/Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Personal Information */}
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="(720) 805-5509"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="Brief subject line"
                    />
                  </div>
                  
                  {/* Message */}
                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Message *
                    </label>
                    <div className={styles.helperText}>
                      <p>Please provide as much detail as possible. For custom orders, include:</p>
                      <ul>
                        <li>• Type of piece you're interested in</li>
                        <li>• Size requirements</li>
                        <li>• Color preferences</li>
                        <li>• Any special elements or themes</li>
                        <li>• Timeline needs</li>
                      </ul>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={styles.textarea}
                      placeholder="Tell us about your inquiry or custom order idea..."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <div className={styles.submitSection}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${styles.submitButton} ${
                        isSubmitting ? styles.submitButtonDisabled : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className={styles.loadingSpinner}>
                          <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <p className={styles.errorText}>
                        There was an error sending your message. Please try again or contact us directly.
                      </p>
                    )}
                    
                    <p className={styles.disclaimerText}>
                      By submitting this form, you agree to be contacted by our team regarding your inquiry. 
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>How long do custom orders take?</h3>
                <p>Most custom pieces take 2-4 weeks to complete, depending on complexity and current order volume. Rush orders may be available for an additional fee.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you ship nationwide?</h3>
                <p>Yes! We carefully package all pieces and ship nationwide. Shipping costs are calculated based on size, weight, and destination.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Can I see my custom piece before it's finished?</h3>
                <p>Absolutely! We provide progress photos for all custom orders and welcome your feedback throughout the creation process.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What's your return policy?</h3>
                <p>Due to the custom nature of our work, we don't accept returns on custom pieces. However, we guarantee your satisfaction and will work with you to make it right.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}