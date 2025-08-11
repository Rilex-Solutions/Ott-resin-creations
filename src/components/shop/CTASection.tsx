'use client'

import Link from 'next/link'
import { colorCombinations } from '@/constants/colors'

export default function CTASection() {
  return (
    <section className="py-16 bg-[#9BB5FF] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Let's create something custom just for you. Every piece tells a story - what's yours?
        </p>
        <Link 
          href="/contact" 
          className="bg-white text-[#9BB5FF] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Request Custom Piece
        </Link>
      </div>
    </section>
  )
}