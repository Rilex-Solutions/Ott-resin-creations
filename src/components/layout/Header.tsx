'use client'

import { useState } from 'react'
import Link from 'next/link'
import { components, colorCombinations } from '@/constants/colors'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={colorCombinations.header.full}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className={`text-2xl font-bold text-${components.header.brand} hover:text-${components.header.brandHover} transition-colors`}>
              Ott Resin Creations
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={`text-${components.header.nav} hover:text-${components.header.navHover} px-3 py-2 text-sm font-medium transition-colors`}>
                Home
              </Link>
              <Link href="/shop" className={`text-${components.header.nav} hover:text-${components.header.navHover} px-3 py-2 text-sm font-medium transition-colors`}>
                Shop
              </Link>
              <Link href="/about" className={`text-${components.header.nav} hover:text-${components.header.navHover} px-3 py-2 text-sm font-medium transition-colors`}>
                About
              </Link>
              <Link href="/contact" className={`text-${components.header.nav} hover:text-${components.header.navHover} px-3 py-2 text-sm font-medium transition-colors`}>
                Contact
              </Link>
              <Link href="/cart" className={`bg-${components.header.cta} text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-${components.header.ctaHover} transition-colors`}>
                Cart (0)
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-${components.header.nav} hover:text-${components.header.navHover} focus:outline-none focus:text-${components.header.navHover}`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-${components.header.background} border-t border-${components.header.border}`}>
              <Link href="/" className={`text-${components.header.nav} hover:text-${components.header.navHover} block px-3 py-2 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/shop" className={`text-${components.header.nav} hover:text-${components.header.navHover} block px-3 py-2 text-sm font-medium`}>
                Shop
              </Link>
              <Link href="/about" className={`text-${components.header.nav} hover:text-${components.header.navHover} block px-3 py-2 text-sm font-medium`}>
                About
              </Link>
              <Link href="/contact" className={`text-${components.header.nav} hover:text-${components.header.navHover} block px-3 py-2 text-sm font-medium`}>
                Contact
              </Link>
              <Link href="/cart" className={`bg-${components.header.cta} text-white block px-3 py-2 rounded-md text-sm font-medium hover:bg-${components.header.ctaHover} transition-colors`}>
                Cart (0)
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}