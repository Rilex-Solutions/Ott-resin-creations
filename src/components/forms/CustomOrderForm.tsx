'use client'

import { useState } from 'react'
import styles from './CustomOrderForm.module.scss'

interface FormData {
  name: string
  email: string
  phone: string
  description: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  description: ''
}

const basePrices = [
  { category: 'Memorial', subcategory: 'Sleeping Puppy (Medium)', price: '$3' },
  { category: 'Memorial', subcategory: 'Sleeping Kitty (Medium)', price: '$3' },
  { category: 'Memorial', subcategory: 'Hanging Cloud w/Heart', price: '$10' },
  { category: 'Memorial', subcategory: 'German Shepherd', price: '$6' },
  { category: 'Memorial', subcategory: 'Paw Prints', price: '$5' },
  { category: 'Memorial', subcategory: 'Jumping Spider Keychain', price: '$5' },
  { category: 'Necklaces', subcategory: 'Necklace', price: '$5' },
  { category: 'Ornaments', subcategory: 'Mouse', price: '$2' },
  { category: 'Ornaments', subcategory: 'Large', price: '$5' },
  { category: 'Ornaments', subcategory: 'Small', price: '$2' },
  { category: 'Phone Stands', subcategory: 'Phone Stand', price: '$5' },
  { category: 'Recreational', subcategory: 'Tray', price: '$8' },
  { category: 'Recreational', subcategory: 'Ashtray', price: '$8' },
  { category: 'Teddy Bears', subcategory: 'Teddy Bear', price: '$5' },
  { category: 'Tea Light Holders', subcategory: 'Tea Light Holder', price: '$5' },
  { category: 'Trinket Boxes', subcategory: 'Shape', price: '$5' },
  { category: 'Trinket Boxes', subcategory: 'Coffin', price: '$8' },
  { category: 'Trinket Boxes', subcategory: 'Pumpkin', price: '$10' },
  { category: 'Trinket Trays', subcategory: 'Regular Shape', price: '$5' },
  { category: 'Trinket Trays', subcategory: 'Small Circle', price: '$2' },
  { category: 'Trinket Trays', subcategory: 'Tray and Dish Set', price: '$8' },
  { category: 'Magnets', subcategory: 'Magnet', price: '$2' },
  { category: 'Coasters', subcategory: 'Coasters', price: '$5' },
  { category: 'Dream Catchers', subcategory: 'Dream Catchers', price: '$5' },
  { category: 'Dragons', subcategory: 'Dragons', price: '$5' },
  { category: 'Runes', subcategory: 'Runes', price: '$10' },
  { category: 'Games', subcategory: 'Games', price: '$5' },
  { category: 'Earrings', subcategory: 'Earrings', price: '$2' },
  { category: 'Hanging Items', subcategory: 'Hanging Items', price: '$3' },
  { category: 'Home Decor', subcategory: 'Home Decor', price: '$3' }
]

export default function CustomOrderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Here you would normally send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData(initialFormData)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className={styles.successMessage}>
          <svg className="w-16 h-16 mx-auto mb-4 text-[#A8D5BA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-lg mb-4">
            Thank you for your custom order request. A member of our team will call you within 24 hours to discuss your ideas, finalize pricing, and arrange payment and delivery.
          </p>
          <p className="text-sm text-[#6B5B73]">
            Please keep your phone handy - we&apos;re excited to bring your vision to life!
          </p>
        </div>
        <button
          onClick={() => setSubmitStatus('idle')}
          className={styles.submitButton}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Pricing Reference */}
      <div className={styles.infoCard}>
        <h2 className={styles.infoTitle}>Starting Prices by Category</h2>
        
        <div className={styles.pricesTable}>
          <div className={styles.tableBody}>
            {Array.from({ length: Math.ceil(basePrices.length / 3) }, (_, rowIndex) => (
              <div key={rowIndex} className={`${styles.tableRow} ${rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow}`}>
                {Array.from({ length: 3 }, (_, colIndex) => {
                  const itemIndex = rowIndex * 3 + colIndex;
                  const item = basePrices[itemIndex];
                  return (
                    <div key={colIndex} className={styles.tableCell}>
                      {item ? (
                        <>
                          <div className={styles.categoryName}>{item.category}</div>
                          {item.subcategory !== item.category && (
                            <div className={styles.subcategoryName}>{item.subcategory}</div>
                          )}
                          <div className={styles.categoryPrice}>{item.price}</div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.warningCard}>
          <h3 className={styles.warningTitle}>Important Pricing Information</h3>
          <ul className={styles.warningList}>
            <li>• These are <strong>base prices</strong> for standard items in each category</li>
            <li>• Customizations, special materials, or complex designs may increase the price</li>
            <li>• Memorial pieces and items requiring special inclusions have additional costs</li>
            <li>• Rush orders (under 2 weeks) include expedite fees</li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className={styles.stepsCard}>
        <h2 className={styles.stepsTitle}>How Custom Orders Work</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={`${styles.stepIcon} ${styles.step1}`}>
              <span>1</span>
            </div>
            <h3 className={styles.stepTitle}>Submit Your Idea</h3>
            <p className={styles.stepDescription}>Fill out the form below with your vision and contact information</p>
          </div>
          
          <div className={styles.step}>
            <div className={`${styles.stepIcon} ${styles.step2}`}>
              <span>2</span>
            </div>
            <h3 className={styles.stepTitle}>We&apos;ll Call You</h3>
            <p className={styles.stepDescription}>Our team will call within 24 hours to discuss ideas and finalize pricing</p>
          </div>
          
          <div className={styles.step}>
            <div className={`${styles.stepIcon} ${styles.step3}`}>
              <span>3</span>
            </div>
            <h3 className={styles.stepTitle}>Create & Deliver</h3>
            <p className={styles.stepDescription}>Once approved and paid, we&apos;ll create your piece and arrange delivery</p>
          </div>
        </div>
      </div>

      {/* Custom Order Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>Request a Custom Piece</h2>
        
        <div className={styles.formGroup}>
          {/* Contact Information */}
          <div className={styles.formGrid}>
            <div>
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
            
            <div>
              <label htmlFor="phone" className={styles.label}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="(720) 805-5509"
              />
            </div>
          </div>
          
          <div>
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
          
          {/* Description */}
          <div>
            <label htmlFor="description" className={styles.label}>
              Describe Your Custom Piece *
            </label>
            <div className={styles.helperCard}>
              <p className={styles.helperText}>
                Please tell us about your custom piece idea. Include details like:
              </p>
              <ul className={styles.helperList}>
                <li>• What type of item you want (coaster, tray, wall art, etc.)</li>
                <li>• Size or dimensions you need</li>
                <li>• Colors or themes you prefer</li>
                <li>• Any special elements to include (flowers, glitter, photos, etc.)</li>
                <li>• When you need it completed</li>
                <li>• Any inspiration or reference ideas</li>
              </ul>
              <p className={styles.helperTextBold}>
                The more details you provide, the better we can understand your vision!
              </p>
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={8}
              className={styles.textarea}
              placeholder="Start describing your custom piece idea here..."
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
                  Submitting Request...
                </span>
              ) : (
                'Submit Custom Order Request'
              )}
            </button>
            
            {submitStatus === 'error' && (
              <p className={styles.errorText}>
                There was an error submitting your request. Please try again or contact us directly.
              </p>
            )}
            
            <p className={styles.disclaimerText}>
              By submitting this form, you&apos;re requesting a consultation. We&apos;ll call you within 24 hours to discuss your project, pricing, and timeline.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}