'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/shop/HeroSection'
import CategoriesSection from '@/components/shop/CategoriesSection'
import InfoSection from '@/components/shop/InfoSection'
import CTASection from '@/components/shop/CTASection'
import { useShopData } from '@/hooks/useShopData'

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2D1B36] mb-4">Something went wrong</h1>
            <p className="text-[#4A3B52] mb-8">We're having trouble loading our collections. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#9BB5FF] text-[#2D1B36] px-6 py-2 rounded-lg hover:bg-[#7B9AFF] transition-colors"
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
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