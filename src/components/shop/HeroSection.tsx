'use client'

import Link from 'next/link'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          Shop Resin Art
        </h1>
        <p className={styles.heroDescription}>
          Discover our collection of handcrafted resin art pieces. Each category offers 
          unique designs that blend functionality with artistic beauty.
        </p>
        <div className={styles.heroButtons}>
          <Link 
            href="#featured" 
            className={styles.primaryButton}
          >
            Browse Categories
          </Link>
          <Link 
            href="/shop/custom-orders" 
            className={styles.secondaryButton}
          >
            Custom Orders
          </Link>
        </div>
      </div>
    </section>
  )
}