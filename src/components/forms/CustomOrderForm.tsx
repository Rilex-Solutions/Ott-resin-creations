'use client'

import { useState } from 'react'
import { colorCombinations } from '@/constants/colors'
import { styleCombinations } from '@/constants/styles'

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
  { category: 'Coasters', price: '$30' },
  { category: 'Trays', price: '$75' },
  { category: 'Dragons', price: '$42' },
  { category: 'Home Decor', price: '$55' },
  { category: 'Phone Stands', price: '$25' },
  { category: 'Spooky', price: '$35' },
  { category: 'Tea Lights', price: '$20' },
  { category: 'Bookmarks', price: '$20' },
  { category: 'Earrings', price: '$22' },
  { category: 'Teddy Bears', price: '$40' },
  { category: 'Celestial', price: '$55' },
  { category: 'Dream Catchers', price: '$52' },
  { category: 'Memory Pieces', price: '$55' },
  { category: 'Ornaments', price: '$18' },
  { category: 'Keychains', price: '$12' },
  { category: 'Games', price: '$25' },
  { category: 'Necklaces', price: '$42' },
  { category: 'Skulls', price: '$45' },
  { category: 'Magnets', price: '$18' },
  { category: 'Recreational', price: '$28' },
  { category: 'Hanging Items', price: '$35' }
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
        <div className={`${styleCombinations.formSuccessBox} ${colorCombinations.form.successBox}`}>
          <svg className="w-16 h-16 mx-auto mb-4 text-[#A8D5BA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
          <p className="text-lg mb-4">
            Thank you for your custom order request. A member of our team will call you within 24-48 hours to discuss your ideas, finalize pricing, and arrange payment and delivery.
          </p>
          <p className="text-sm text-[#6B5B73]">
            Please keep your phone handy - we&apos;re excited to bring your vision to life!
          </p>
        </div>
        <button
          onClick={() => setSubmitStatus('idle')}
          className={`${colorCombinations.primaryButton.full} px-6 py-3 rounded-lg font-semibold`}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className={styleCombinations.formContainer}>
      {/* Pricing Reference */}
      <div className={`${styleCombinations.formInfoBox} ${colorCombinations.form.infoBox}`}>
        <h2 className={`text-xl font-bold mb-4 ${colorCombinations.form.label}`}>Starting Prices by Category</h2>
        
        <div className={`${styleCombinations.priceGrid} ${colorCombinations.form.priceGrid}`}>
          {basePrices.map((item, index) => {
            const totalItems = basePrices.length
            const isRightmostMobile = (index + 1) % 2 === 0 // Every 2nd item on mobile (2 columns)
            const isRightmostDesktop = (index + 1) % 3 === 0 // Every 3rd item on desktop (3 columns)  
            const isLastRow = index >= totalItems - (totalItems % 3 === 0 ? 3 : totalItems % 3) // Items in last row
            
            // Determine border classes
            let borderClass = styleCombinations.priceItemBorders
            if (isRightmostMobile && !isRightmostDesktop) {
              borderClass = `${styleCombinations.priceItemNoRightBorder} md:${styleCombinations.priceItemBorders}`
            } else if (isRightmostDesktop) {
              borderClass = styleCombinations.priceItemNoRightBorder
            }
            if (isLastRow) {
              borderClass = borderClass.replace('border-b', '')
            }
            
            // Determine background color - alternating rows
            const rowNumber = Math.floor(index / 3) // Desktop row number
            const isEvenRow = rowNumber % 2 === 0
            const backgroundClass = isEvenRow ? colorCombinations.form.priceItemEven : colorCombinations.form.priceItemOdd
            
            return (
              <div 
                key={item.category} 
                className={`${styleCombinations.priceItemBase} ${borderClass} ${backgroundClass}`}
              >
                <span className={colorCombinations.form.priceCategory}>{item.category}</span>
                <span className={colorCombinations.form.priceValue}>{item.price}</span>
              </div>
            )
          })}
        </div>
        
        <div className={`${styleCombinations.formWarningBox} ${colorCombinations.form.warningBox}`}>
          <h3 className={`font-semibold mb-2 ${colorCombinations.form.label}`}>Important Pricing Information</h3>
          <ul className={`text-sm space-y-1 ${colorCombinations.form.helperText}`}>
            <li>• These are <strong>base prices</strong> for standard items in each category</li>
            <li>• Customizations, special materials, or complex designs may increase the price</li>
            <li>• Memorial pieces and items requiring special inclusions have additional costs</li>
            <li>• Rush orders (under 2 weeks) include expedite fees</li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#FFFFFF] rounded-lg p-6 mb-8 border border-[#E8E3E8] shadow-sm">
        <h2 className="text-xl font-bold text-[#2D1B36] mb-4">How Custom Orders Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-[#EFEDFF] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-[#7A73D7]">1</span>
            </div>
            <h3 className="font-semibold text-[#2D1B36] mb-2">Submit Your Idea</h3>
            <p className="text-sm text-[#6B5B73]">Fill out the form below with your vision and contact information</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#E8F7F3] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-[#7CD3BD]">2</span>
            </div>
            <h3 className="font-semibold text-[#2D1B36] mb-2">We&apos;ll Call You</h3>
            <p className="text-sm text-[#6B5B73]">Our team will call within 24-48 hours to discuss ideas and finalize pricing</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#FCF0F8] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-[#EFB7DB]">3</span>
            </div>
            <h3 className="font-semibold text-[#2D1B36] mb-2">Create & Deliver</h3>
            <p className="text-sm text-[#6B5B73]">Once approved and paid, we&apos;ll create your piece and arrange delivery</p>
          </div>
        </div>
      </div>

      {/* Custom Order Form */}
      <form onSubmit={handleSubmit} className={`${styleCombinations.formSection} ${colorCombinations.form.sectionBackground}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${colorCombinations.form.label}`}>Request a Custom Piece</h2>
        
        <div className={styleCombinations.formGroup}>
          {/* Contact Information */}
          <div className={styleCombinations.formGrid}>
            <div>
              <label htmlFor="name" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
              placeholder="your.email@example.com"
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
              Describe Your Custom Piece *
            </label>
            <div className={`mb-3 p-3 rounded-lg ${colorCombinations.form.infoBox}`}>
              <p className={`text-sm ${colorCombinations.form.helperText} mb-2`}>
                Please tell us about your custom piece idea. Include details like:
              </p>
              <ul className={`text-sm ${colorCombinations.form.helperText} space-y-1 ml-4`}>
                <li>• What type of item you want (coaster, tray, wall art, etc.)</li>
                <li>• Size or dimensions you need</li>
                <li>• Colors or themes you prefer</li>
                <li>• Any special elements to include (flowers, glitter, photos, etc.)</li>
                <li>• When you need it completed</li>
                <li>• Any inspiration or reference ideas</li>
              </ul>
              <p className={`text-sm ${colorCombinations.form.helperText} mt-2 font-medium`}>
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
              className={`${styleCombinations.textareaField} ${colorCombinations.form.input}`}
              placeholder="Start describing your custom piece idea here..."
            />
          </div>
          
          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${colorCombinations.primaryButton.full} px-8 py-4 rounded-lg text-lg font-bold ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
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
              <p className={`${colorCombinations.form.errorText}`}>
                There was an error submitting your request. Please try again or contact us directly.
              </p>
            )}
            
            <p className={`${colorCombinations.form.helperText}`}>
              By submitting this form, you&apos;re requesting a consultation. We&apos;ll call you within 24-48 hours to discuss your project, pricing, and timeline.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}