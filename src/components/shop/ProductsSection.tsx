'use client'

import { Product } from '@/types/shop'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import styles from './ProductsSection.module.scss'

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
  if (loading) {
    return (
      <section className={`${styles.section} ${
        backgroundColor === 'white' ? styles.white : styles.gray
      }`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
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
    <section className={`${styles.section} ${
      backgroundColor === 'white' ? styles.white : styles.gray
    }`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {variant === 'featured' && (
            <p className={styles.subtitle}>Our most popular pieces in this category</p>
          )}
        </div>
        
        <div className={`${styles.grid} ${styles[variant]}`}>
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