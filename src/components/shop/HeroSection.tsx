'use client'

import Link from 'next/link'
import { colorCombinations, text, primary, background } from '@/constants/colors'

export default function HeroSection() {
  return (
    <section className={`${colorCombinations.heroGradient.full} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D1B36] mb-6">
          Shop Resin Art
        </h1>
        <p className="text-xl text-[#4A3B52] max-w-3xl mx-auto mb-8">
          Discover our collection of handcrafted resin art pieces. Each category offers 
          unique designs that blend functionality with artistic beauty.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#featured" 
            className={colorCombinations.primaryButton.full}
          >
            Browse Categories
          </Link>
          <Link 
            href="/shop/custom-orders" 
            className={colorCombinations.tertiaryButton.full}
          >
            Custom Orders
          </Link>
        </div>
      </div>
    </section>
  )
}