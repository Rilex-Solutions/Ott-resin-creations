'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useCart } from '@/contexts/CartContext'
import { CustomerInfo } from '@/types/cart'
import styles from './cart.module.scss'

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
      <div className={styles.pageContainer}>
        <Header />
        
        <main className={styles.mainContent}>
          <Breadcrumb items={breadcrumbItems} />
          
          <section className={styles.cartSection}>
            <div className={styles.container}>
              <div className={styles.successContainer}>
                <div className={styles.successBox}>
                  <svg className={styles.successIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h1 className={styles.successTitle}>Inquiry Submitted!</h1>
                  <p className={styles.successMessage}>
                    Thank you for your purchase inquiry. Janet will be reaching out to you within 24 hours to confirm your order and take payment.
                  </p>
                  <p className={styles.successNote}>
                    You should receive a confirmation email shortly.
                  </p>
                </div>
                
                <button
                  onClick={() => window.location.href = '/shop'}
                  className={styles.continueShoppingButton}
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
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <Breadcrumb items={breadcrumbItems} />
        
        <section className={styles.cartSection}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Your Cart</h1>
            
            {cart.items.length === 0 ? (
              <div className={styles.emptyCartContainer}>
                <svg className={styles.emptyCartIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 7M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h6a1 1 0 011 1v4" />
                </svg>
                <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
                <p className={styles.emptyCartDescription}>Browse our beautiful resin art pieces and add some to your cart!</p>
                <button
                  onClick={() => window.location.href = '/shop'}
                  className={styles.browseShopButton}
                >
                  Browse Shop
                </button>
              </div>
            ) : (
              <div className={styles.cartGrid}>
                {/* Cart Items */}
                <div className={styles.cartItemsContainer}>
                  <h2 className={styles.cartItemsTitle}>Cart Items ({cart.itemCount})</h2>
                  <div className={styles.cartItemsList}>
                    {cart.items.map((item) => (
                      <div key={item.productId} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name}
                            />
                          ) : (
                            <div className={styles.noImagePlaceholder}>
                              No Image
                            </div>
                          )}
                        </div>
                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <p className={styles.itemDescription}>{item.description}</p>
                          <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className={styles.removeButton}
                          aria-label="Remove item"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.cartTotal}>
                    <div className={styles.totalRow}>
                      <span>Total: ${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className={styles.customerFormContainer}>
                  <h2 className={styles.formTitle}>Contact Information</h2>
                  <form onSubmit={handleSubmit} className={styles.customerForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                      />
                    </div>
                    
                    <div className={styles.submitButtonContainer}>
                      <button
                        type="submit"
                        disabled={isSubmitting || cart.items.length === 0}
                        className={styles.submitButton}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                      </button>
                    </div>
                    
                    <div className={styles.formNote}>
                      <p>No payment required now.</p>
                      <p>Janet will contact you to arrange payment.</p>
                    </div>
                  </form>
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