'use client'

import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryHero from '@/components/shop/CategoryHero'
import ProductsSection from '@/components/shop/ProductsSection'
import CustomOrderCTA from '@/components/shop/CustomOrderCTA'
import CustomOrderForm from '@/components/forms/CustomOrderForm'
import { useCategoryData } from '@/hooks/useCategoryData'
import { use } from 'react'
import styles from './category.module.scss'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params)
  const { 
    category, 
    products, 
    featuredProducts, 
    otherProducts, 
    loading, 
    error 
  } = useCategoryData(categorySlug)

  // Handle error states
  if (error && error.includes('not found')) {
    notFound()
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.errorMain}>
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>Something went wrong</h1>
            <p className={styles.errorDescription}>We're having trouble loading this category. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.errorButton}
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }


  // Loading state
  if (loading || !category) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.mainContent}>
          {/* Loading skeleton */}
          <div className={styles.loadingBreadcrumb}>
            <div className={styles.loadingBreadcrumbContainer}>
              <div className={styles.loadingBreadcrumbSkeleton}></div>
            </div>
          </div>
          <section className={styles.loadingHero}>
            <div className={styles.loadingHeroContainer}>
              <div className={styles.loadingHeroTitle}></div>
              <div className={styles.loadingHeroSubtitle}></div>
            </div>
          </section>
          <div className={styles.loadingProducts}>
            <div className={styles.loadingProductsContainer}>
              <div className={styles.loadingProductsTitle}></div>
              <div className={styles.loadingGrid}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.loadingCard}>
                    <div className={styles.loadingCardImage}></div>
                    <div className={styles.loadingCardContent}>
                      <div className={styles.loadingCardTitle}></div>
                      <div className={styles.loadingCardDescription}></div>
                      <div className={styles.loadingCardPrice}></div>
                    </div>
                  </div>
                ))}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <CategoryHero category={category} />
        
        <ProductsSection 
          title="All Products"
          products={otherProducts}
          loading={loading}
          variant="regular"
          backgroundColor="gray"
        />

        {/* Show message if no products */}
        {!loading && products.length === 0 && (
          <section className={styles.emptySection}>
            <div className={styles.emptyContainer}>
              <h2 className={styles.emptyTitle}>Coming Soon!</h2>
              <p className={styles.emptyDescription}>
                We're working on amazing {category.name.toLowerCase()} pieces for you. 
                In the meantime, why not create something custom?
              </p>
            </div>
          </section>
        )}
        
        <CustomOrderCTA categoryName={category.name} />
      </main>

      <Footer />
    </div>
  )
}