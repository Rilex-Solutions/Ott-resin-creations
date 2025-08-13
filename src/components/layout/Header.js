'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import styles from './Header.module.scss'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink}>
              Ott Resin Creations
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <div className={styles.navList}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
              <Link href="/shop" className={styles.navLink}>
                Shop
              </Link>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
              <Link href="/cart" className={styles.cartButton}>
                <svg className={styles.cartIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 7M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h6a1 1 0 011 1v4" />
                </svg>
                <span>Cart{cart.itemCount > 0 ? ` (${cart.itemCount})` : ''}</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label="Toggle menu"
          >
            <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContainer}>
              <Link href="/" className={styles.mobileNavLink}>
                Home
              </Link>
              <Link href="/shop" className={styles.mobileNavLink}>
                Shop
              </Link>
              <Link href="/about" className={styles.mobileNavLink}>
                About
              </Link>
              <Link href="/contact" className={styles.mobileNavLink}>
                Contact
              </Link>
              <Link href="/cart" className={styles.mobileCartButton}>
                <svg className={styles.cartIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 7M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h6a1 1 0 011 1v4" />
                </svg>
                <span>Cart{cart.itemCount > 0 ? ` (${cart.itemCount})` : ''}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}