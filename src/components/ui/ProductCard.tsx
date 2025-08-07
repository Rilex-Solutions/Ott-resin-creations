'use client'

import { useState } from 'react'
import { colorCombinations } from '@/constants/colors'
import { styleCombinations } from '@/constants/styles'

interface ProductCardProps {
  id: number
  name: string
  price: string
  description: string
  image: string
  inStock: boolean
  featured?: boolean
  className?: string
  onAddToCart?: (productId: number) => void
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
  inStock,
  featured = false,
  className = '',
  onAddToCart
}: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!inStock || isAddingToCart) return
    
    setIsAddingToCart(true)
    
    try {
      // Call the parent's onAddToCart function if provided
      if (onAddToCart) {
        await onAddToCart(id)
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className={`${styleCombinations.productCard} ${className}`}>
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-[#F8F5FF] via-[#F0FDF9] to-[#FDF2F8] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9BB5FF]/10 via-[#7FDECC]/10 to-[#E8B4CB]/10 group-hover:from-[#9BB5FF]/20 group-hover:via-[#7FDECC]/20 group-hover:to-[#E8B4CB]/20 transition-all duration-300"></div>
        <span className="text-[#4A3B52] font-medium text-lg z-10 text-center px-4">
          {image}
        </span>
        
        {/* Featured Badge */}
        {featured && (
          <div className={`absolute top-4 right-4 ${styleCombinations.featuredCard} ${colorCombinations.components.featured.background} ${colorCombinations.components.featured.text} px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            Featured
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <span className={`${colorCombinations.text.white} font-semibold text-lg`}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Product Name */}
        <h3 className={`text-xl font-semibold mb-2 group-hover:${colorCombinations.interactive.primary} transition-colors ${colorCombinations.text.primary}`}>
          {name}
        </h3>
        
        {/* Product Description */}
        <p className={`${colorCombinations.text.secondary} mb-4 flex-grow text-sm leading-relaxed`}>
          {description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center mt-auto">
          <span className={`text-2xl font-bold ${colorCombinations.interactive.primary}`}>
            {price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!inStock || isAddingToCart}
            className={`
              px-6 py-2 rounded-lg font-semibold transition-all duration-300 
              ${inStock 
                ? `${colorCombinations.productButton.base} ${colorCombinations.productButton.hover} hover:scale-105 shadow-md hover:shadow-lg` 
                : colorCombinations.productButton.disabled
              }
              ${isAddingToCart ? 'opacity-70 cursor-wait' : ''}
            `}
          >
            {isAddingToCart ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              inStock ? 'Add to Cart' : 'Out of Stock'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Export the props type for reuse
export type { ProductCardProps }