'use client'

import { Category, Product } from '@/types/shop'
import CategoryCard from './CategoryCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { text } from '@/constants/colors'

interface CategoriesSectionProps {
  title: string
  subtitle: string
  categories: Category[]
  products: Product[]
  loading: boolean
  variant?: 'featured' | 'compact'
  sectionId?: string
  backgroundColor?: 'white' | 'gray'
}

export default function CategoriesSection({ 
  title, 
  subtitle,
  categories, 
  products, 
  loading, 
  variant = 'compact',
  sectionId,
  backgroundColor = 'white'
}: CategoriesSectionProps) {
  const isFeatured = variant === 'featured'
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-gray-50'
  const gridClass = isFeatured 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'

  return (
    <section 
      id={sectionId}
      className={`py-16 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D1B36] mb-4">
            {title}
          </h2>
          <p className="text-lg text-[#4A3B52]">
            {subtitle}
          </p>
        </div>
        
        {/* Content */}
        {loading ? (
          <LoadingSpinner 
            message={`Loading ${isFeatured ? 'featured ' : ''}collections...`} 
          />
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#4A3B52]">
              {isFeatured 
                ? 'No featured collections available at this time.' 
                : 'No additional collections available at this time.'
              }
            </p>
          </div>
        ) : (
          <div className={gridClass}>
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                category={category}
                products={products}
                variant={variant}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}