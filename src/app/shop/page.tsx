'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/shop/HeroSection'
import CategoriesSection from '@/components/shop/CategoriesSection'
import InfoSection from '@/components/shop/InfoSection'
import CTASection from '@/components/shop/CTASection'
import { useShopData } from '@/hooks/useShopData'
import styles from './shop.module.scss'

export default function ShopPage() {
  const { 
    products, 
    featuredCategories, 
    otherCategories, 
    loading, 
    error 
  } = useShopData()

  // Show error state if needed
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Header />
        <main className={styles.errorMain}>
          <div className={styles.errorContent}>
            <h1 className={styles.errorTitle}>Something went wrong</h1>
            <p className={styles.errorDescription}>We're having trouble loading our collections. Please try again later.</p>
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

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <HeroSection />
        
        <CategoriesSection 
          title="Featured Collections"
          subtitle="Our most popular and signature pieces"
          categories={featuredCategories}
          products={products}
          loading={loading}
          variant="featured"
          sectionId="featured"
          backgroundColor="white"
        />
        
        <CategoriesSection 
          title="More Categories"
          subtitle="Explore our complete range of resin art pieces"
          categories={otherCategories}
          products={products}
          loading={loading}
          variant="compact"
          backgroundColor="gray"
        />
        
        <InfoSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}