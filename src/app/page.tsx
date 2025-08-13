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
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Custom Resin Art
                <span className={styles.heroSubtitle}>Made Just For You</span>
              </h1>
              <p className={styles.heroDescription}>
                Discover unique, handcrafted resin pieces that blend artistry with functionality. 
                Each creation is custom-made to bring your vision to life.
              </p>
              <div className={styles.heroButtons}>
                <Link 
                  href="/shop" 
                  className={styles.heroButtonPrimary}
                >
                  View Shop
                </Link>
                <Link 
                  href="/shop/custom-orders" 
                  className={styles.heroButtonSecondary}
                >
                  Request Custom Piece
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}