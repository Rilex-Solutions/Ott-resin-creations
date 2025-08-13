'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'
import CustomOrderForm from '@/components/forms/CustomOrderForm'
import styles from './custom-orders.module.scss'

export default function CustomOrdersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Custom Orders' }
  ]

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <Breadcrumb items={breadcrumbItems} />
        
        <PageHero 
          title="Custom Orders"
          subtitle="Bring your vision to life with completely custom resin art pieces designed just for you. Every piece tells a story - what's yours?"
        />

        <section className={styles.formSection}>
          <div className={styles.formContainer}>
            <CustomOrderForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}