'use client'

import { Category, Product } from '@/types/shop'
import CategoryCard from './CategoryCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import styles from './CategoriesSection.module.scss'

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

  return (
    <section 
      id={sectionId}
      className={`${styles.section} ${
        backgroundColor === 'white' ? styles.white : styles.gray
      }`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </div>
        
        {/* Content */}
        {loading ? (
          <LoadingSpinner 
            message={`Loading ${isFeatured ? 'featured ' : ''}collections...`} 
          />
        ) : categories.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {isFeatured 
                ? 'No featured collections available at this time.' 
                : 'No additional collections available at this time.'
              }
            </p>
          </div>
        ) : (
          <div className={`${styles.grid} ${
            isFeatured ? styles.featured : styles.compact
          }`}>
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