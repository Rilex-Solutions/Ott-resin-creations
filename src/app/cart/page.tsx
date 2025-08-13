'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useCart } from '@/contexts/CartContext'
import { CustomerInfo } from '@/types/cart'
import { getDirectImageUrl } from '@/lib/utils/image'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Cart' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.items.length === 0) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/cart/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerInfo,
          items: cart.items,
          total: cart.total,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        clearCart()
        setCustomerInfo({ name: '', email: '', phone: '' })
      } else {
        throw new Error('Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Error submitting cart inquiry:', error)
      alert('There was an error submitting your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Breadcrumb items={breadcrumbItems} />
          
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
                <svg className="w-16 h-16 mx-auto text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h1 className="text-3xl font-bold text-green-800 mb-4">Inquiry Submitted!</h1>
                <p className="text-lg text-green-700 mb-4">
                  Thank you for your purchase inquiry. Janet will be reaching out to you within 24 hours to confirm your order and take payment.
                </p>
                <p className="text-green-600">
                  You should receive a confirmation email shortly.
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb items={breadcrumbItems} />
        
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#2D1B36] mb-8 text-center">Your Cart</h1>
            
            {cart.items.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 7M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h6a1 1 0 011 1v4" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Browse our beautiful resin art pieces and add some to your cart!</p>
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Shop
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items ({cart.itemCount})</h2>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.productId} className="bg-white rounded-lg p-4 flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.imageUrl ? (
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                            <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-600 hover:text-red-800 p-2"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total: ${cart.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || cart.items.length === 0}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600 text-center">
                        <p>No payment required now.</p>
                        <p>Janet will contact you to arrange payment.</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}