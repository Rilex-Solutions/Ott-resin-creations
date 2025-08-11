'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'
import CustomOrderForm from '@/components/forms/CustomOrderForm'

export default function CustomOrdersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Custom Orders' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb items={breadcrumbItems} />
        
        <PageHero 
          title="Custom Orders"
          subtitle="Bring your vision to life with completely custom resin art pieces designed just for you. Every piece tells a story - what's yours?"
        />

        <section className="py-16 bg-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <CustomOrderForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}