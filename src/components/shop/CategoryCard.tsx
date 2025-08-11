'use client'

import Link from 'next/link'
import { Category, Product } from '@/types/shop'
import { getDirectImageUrl } from '@/lib/utils/image'
import { colorCombinations, text, primary, components } from '@/constants/colors'

interface CategoryCardProps {
  category: Category
  products: Product[]
  variant?: 'featured' | 'compact'
}

export default function CategoryCard({ 
  category, 
  products, 
  variant = 'compact' 
}: CategoryCardProps) {
  const categoryProducts = products.filter(p => p.categorySlug === category.slug)
  const productCount = categoryProducts.length
  const featuredProduct = categoryProducts.find(p => p.featured)
  
  const isFeatured = variant === 'featured'

  return (
    <Link 
      href={`/shop/${category.slug}`}
      className={`group bg-white overflow-hidden border transition-all duration-300 ${
        isFeatured 
          ? 'rounded-xl shadow-md hover:shadow-xl border-gray-100' 
          : 'rounded-lg shadow-sm hover:shadow-md border-gray-100'
      }`}
    >
      {/* Image Section */}
      <div className={`relative flex items-center justify-center overflow-hidden ${
        isFeatured 
          ? 'aspect-[4/3] bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200' 
          : 'aspect-square bg-gradient-to-br from-purple-100 to-blue-100'
      }`}>
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          isFeatured
            ? 'bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30'
            : 'bg-gradient-to-br from-purple-200/50 to-blue-200/50 group-hover:from-purple-300/60 group-hover:to-blue-300/60'
        }`} />
        
        {/* Product Image */}
        {featuredProduct?.imageUrl ? (
          <img 
            src={getDirectImageUrl(featuredProduct.imageUrl) || featuredProduct.imageUrl} 
            alt={isFeatured ? `${category.name} Collection` : category.name}
            className="w-full h-full object-cover z-10"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              fallback?.classList.remove('hidden')
            }}
          />
        ) : null}
        
        {/* Fallback Text */}
        <span className={`z-10 font-medium text-center px-2 ${
          featuredProduct?.imageUrl ? 'hidden' : ''
        } ${
          isFeatured 
            ? 'text-lg text-[#2D1B36]' 
            : 'text-sm text-[#2D1B36]'
        }`}>
          {isFeatured ? `${category.name} Collection` : category.name}
        </span>
        
        {/* Featured Badge */}
        {category.featured && (
          <div className="absolute top-4 right-4 bg-[#9BB5FF] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={isFeatured ? 'p-6' : 'p-4'}>
        <h3 className={`font-bold mb-2 transition-colors group-hover:text-[#9BB5FF] ${
          isFeatured 
            ? 'text-xl text-[#2D1B36]' 
            : 'text-lg text-[#2D1B36]'
        }`}>
          {category.name}
        </h3>
        
        <p className={`text-[#4A3B52] mb-3 ${
          isFeatured 
            ? 'text-sm leading-relaxed mb-4' 
            : 'text-sm line-clamp-2'
        }`}>
          {category.description}
        </p>
        
        <div className={`flex justify-between items-center ${
          isFeatured ? 'text-sm' : 'text-xs'
        }`}>
          <span className={`font-${isFeatured ? 'semibold' : 'medium'} text-[#9BB5FF]`}>
            {productCount === 0 ? 'Coming Soon' : `${productCount} item${productCount !== 1 ? 's' : ''}`}
          </span>
          <span className="text-[#A69BAA]">
            {isFeatured ? 'View Collection' : 'Browse'}
          </span>
        </div>
        
        {/* Shop Now Button (Featured Only) */}
        {isFeatured && (
          <div className="mt-4 flex items-center font-semibold transition-colors text-[#9BB5FF] group-hover:text-[#7B9AFF]">
            <span>Shop Now</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  )
}