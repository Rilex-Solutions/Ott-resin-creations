import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './home.module.scss'

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          {/* Full overlay container for positioning content */}
          <div className={styles.heroOverlay}>
            {/* Title at top 20% */}
            <h1 className={styles.heroTitle}>
              Handcrafted Resin Art
            </h1>
            
            {/* Buttons positioned over the white canvas */}
            <div className={styles.canvasButtons}>
              <Link 
                href="/shop" 
                className={styles.canvasButton}
              >
                View Shop
              </Link>
              <Link 
                href="/shop/custom-orders" 
                className={styles.canvasButton}
              >
                Create Custom
              </Link>
            </div>
            
            {/* Subtitle at bottom */}
            <p className={styles.heroSubtitle}>
              Unique pieces crafted with love, bringing your vision to life through the magic of resin art
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}