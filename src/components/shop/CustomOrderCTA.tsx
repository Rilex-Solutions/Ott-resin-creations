'use client'

import Link from 'next/link'

interface CustomOrderCTAProps {
  categoryName: string
}

export default function CustomOrderCTA({ categoryName }: CustomOrderCTAProps) {
  return (
    <section className="py-16 bg-[#9BB5FF] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Want Something Different?</h2>
        <p className="text-xl mb-8 opacity-90">
          Don't see exactly what you're looking for in our {categoryName.toLowerCase()} collection? 
          Let's create a custom piece just for you!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop/custom-orders" 
            className="bg-white text-[#9BB5FF] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Custom Options
          </Link>
          <Link 
            href="/contact" 
            className="bg-[#7B9AFF] text-white px-8 py-3 rounded-lg text-lg font-semibold border-2 border-[#5F85E6] hover:bg-[#5F85E6] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}