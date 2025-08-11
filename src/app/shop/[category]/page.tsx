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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2D1B36] mb-4">Something went wrong</h1>
            <p className="text-[#4A3B52] mb-8">We're having trouble loading this category. Please try again later.</p>
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

  // Special handling for custom-orders page
  if (categorySlug === 'custom-orders') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Breadcrumb */}
          <div className="bg-[#FAF7FB] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex text-sm">
                <a href="/" className="text-[#6B5B73] hover:text-[#2D1B36]">Home</a>
                <span className="mx-2 text-[#A69BAA]">/</span>
                <a href="/shop" className="text-[#6B5B73] hover:text-[#2D1B36]">Shop</a>
                <span className="mx-2 text-[#A69BAA]">/</span>
                <span className="text-[#2D1B36] font-medium">Custom Orders</span>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[#F8F5FF] via-[#F0FDF9] to-[#FDF2F8] py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D1B36] mb-6">
                Custom Orders
              </h1>
              <p className="text-xl text-[#6B5B73] max-w-3xl mx-auto mb-8">
                Bring your vision to life with completely custom resin art pieces designed just for you
              </p>
            </div>
          </section>

          {/* Custom Order Form */}
          <section className="py-16 bg-[#FEFBFD]">
            <div className="px-4 sm:px-6 lg:px-8">
              <CustomOrderForm />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  // Loading state
  if (loading || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Loading skeleton */}
          <div className="bg-gray-50 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
          <section className="bg-gradient-to-br from-[#FEFBFD] to-[#F0F4FF] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
          </section>
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-[#2D1B36] mb-4">Coming Soon!</h2>
              <p className="text-lg text-[#4A3B52] mb-8">
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