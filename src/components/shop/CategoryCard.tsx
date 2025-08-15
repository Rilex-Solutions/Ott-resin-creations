'use client'

import Link from 'next/link'
import { Category, Product } from '@/types/shop'
import { getDirectImageUrl } from '@/lib/utils/image'
import styles from './CategoryCard.module.scss'

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
      className={`${styles.categoryCard} ${
        isFeatured ? styles.featured : styles.compact
      }`}
    >
      {/* Image Section */}
      <div className={`${styles.imageSection} ${
        isFeatured ? styles.featured : styles.compact
      }`}>
        {/* Gradient Overlay */}
        <div className={`${styles.gradientOverlay} ${
          isFeatured ? styles.featured : styles.compact
        }`} />
        
        {/* Featured Product Image */}
        {featuredProduct?.imageUrl ? (
          <img 
            src={getDirectImageUrl(featuredProduct.imageUrl) || featuredProduct.imageUrl} 
            alt={isFeatured ? `${category.name} Collection` : category.name}
            className={styles.productImage}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              fallback?.classList.remove('hidden')
            }}
          />
        ) : null}
        
        {/* Fallback Content */}
        <div className={`${styles.fallbackContent} ${
          featuredProduct?.imageUrl ? styles.hidden : ''
        } ${
          isFeatured ? styles.featured : styles.compact
        }`}>
          <img 
            src="/favicon.ico" 
            alt="Placeholder" 
            className={`${styles.fallbackIcon} ${
              isFeatured ? styles.featured : styles.compact
            }`} 
          />
          <span className={styles.fallbackText}>
            {isFeatured ? `${category.name} Collection` : category.name}
          </span>
        </div>
        
        {/* Featured Badge */}
        {category.featured && (
          <div className={styles.featuredBadge}>
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`${styles.contentSection} ${
        isFeatured ? styles.featured : styles.compact
      }`}>
        <h3 className={`${styles.categoryTitle} ${
          isFeatured ? styles.featured : styles.compact
        }`}>
          {category.name}
        </h3>
        
        <p className={`${styles.categoryDescription} ${
          isFeatured ? styles.featured : styles.compact
        }`}>
          {category.description}
        </p>
        
        <div className={`${styles.categoryFooter} ${
          isFeatured ? styles.featured : styles.compact
        }`}>
          <span className={`${styles.productCount} ${
            isFeatured ? styles.featured : styles.compact
          }`}>
            {productCount === 0 ? 'Coming Soon' : `${productCount} item${productCount !== 1 ? 's' : ''}`}
          </span>
          <span className={styles.browseText}>
            {isFeatured ? 'View Collection' : 'Browse'}
          </span>
        </div>
        
        {/* Shop Now Button (Featured Only) */}
        {isFeatured && (
          <div className={styles.shopNowButton}>
            <span>Shop Now</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  )
}