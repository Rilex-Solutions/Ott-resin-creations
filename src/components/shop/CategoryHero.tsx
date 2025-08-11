'use client'

import Link from 'next/link'
import { Category } from '@/types/shop'
import { colorCombinations } from '@/constants/colors'

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-[#6B5B73] hover:text-[#2D1B36] transition-colors">
              Home
            </Link>
            <span className="mx-2 text-[#A69BAA]">/</span>
            <Link href="/shop" className="text-[#6B5B73] hover:text-[#2D1B36] transition-colors">
              Shop
            </Link>
            <span className="mx-2 text-[#A69BAA]">/</span>
            <span className="text-[#2D1B36] font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`${colorCombinations.heroGradient.full} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D1B36] mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-[#4A3B52] max-w-3xl mx-auto mb-8">
            {category.hero}
          </p>
        </div>
      </section>
    </>
  )
}