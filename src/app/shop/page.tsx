'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/shop/HeroSection'
import CategoriesSection from '@/components/shop/CategoriesSection'
import InfoSection from '@/components/shop/InfoSection'
import CTASection from '@/components/shop/CTASection'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { useShopData } from '@/hooks/useShopData'
import styles from './shop.module.scss'

export default function ShopPage() {
  const {
    products,
    resinCategories,
    crochetCategories,
    threeDPrintCategories,
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

  // Separate featured and non-featured categories for each product type
  const featuredResin = resinCategories.filter(cat => cat.featured)
  const otherResin = resinCategories.filter(cat => !cat.featured)
  const featuredCrochet = crochetCategories.filter(cat => cat.featured)
  const otherCrochet = crochetCategories.filter(cat => !cat.featured)
  const featured3D = threeDPrintCategories.filter(cat => cat.featured)
  const other3D = threeDPrintCategories.filter(cat => !cat.featured)

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        <HeroSection />

        {/* Resin Creations Section */}
        {resinCategories.length > 0 && (
          <>
            <CategoriesSection
              title="Resin Creations"
              subtitle="Our signature handcrafted resin art pieces"
              categories={featuredResin}
              products={products}
              loading={loading}
              variant="featured"
              sectionId="resin"
              backgroundColor="white"
            />

            {otherResin.length > 0 && (
              <CategoriesSection
                title="More Resin Categories"
                subtitle="Explore our complete range of resin art"
                categories={otherResin}
                products={products}
                loading={loading}
                variant="compact"
                backgroundColor="gray"
              />
            )}
          </>
        )}

        {/* Crochet Items Section */}
        {crochetCategories.length > 0 && (
          <>
            <CategoriesSection
              title="Crocheted Items"
              subtitle="Cozy handmade crochet creations"
              categories={featuredCrochet}
              products={products}
              loading={loading}
              variant="featured"
              sectionId="crochet"
              backgroundColor="white"
            />

            {otherCrochet.length > 0 && (
              <CategoriesSection
                title="More Crochet Categories"
                subtitle="Discover our full crochet collection"
                categories={otherCrochet}
                products={products}
                loading={loading}
                variant="compact"
                backgroundColor="gray"
              />
            )}
          </>
        )}

        {/* 3D Printed Items Section */}
        {threeDPrintCategories.length > 0 && (
          <>
            <CategoriesSection
              title="3D Printed Items"
              subtitle="Innovative 3D printed creations"
              categories={featured3D}
              products={products}
              loading={loading}
              variant="featured"
              sectionId="3d-print"
              backgroundColor="white"
            />

            {other3D.length > 0 && (
              <CategoriesSection
                title="More 3D Print Categories"
                subtitle="Explore our 3D printed collection"
                categories={other3D}
                products={products}
                loading={loading}
                variant="compact"
                backgroundColor="gray"
              />
            )}
          </>
        )}

        <InfoSection />
        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}