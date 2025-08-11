'use client'

import { Product } from '@/types/shop'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ProductsSectionProps {
  title: string
  products: Product[]
  loading: boolean
  variant?: 'featured' | 'regular'
  backgroundColor?: 'white' | 'gray'
}

export default function ProductsSection({ 
  title, 
  products, 
  loading, 
  variant = 'regular',
  backgroundColor = 'white'
}: ProductsSectionProps) {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-gray-50'
  const gridClass = variant === 'featured' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'

  if (loading) {
    return (
      <section className={`py-16 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2D1B36] mb-4">{title}</h2>
          </div>
          <LoadingSpinner message={`Loading ${variant === 'featured' ? 'featured ' : ''}products...`} />
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null // Don't render empty sections
  }

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D1B36] mb-4">{title}</h2>
          {variant === 'featured' && (
            <p className="text-lg text-[#4A3B52]">Our most popular pieces in this category</p>
          )}
        </div>
        
        <div className={gridClass}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}