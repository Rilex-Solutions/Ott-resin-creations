'use client'

import Link from 'next/link'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className={styles.heroSection} id="top">
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          Shop Handcrafted Creations
        </h1>
        <p className={styles.heroDescription}>
          Discover our collection of handcrafted art pieces. From resin art to crochet and 3D printed items,
          each piece blends functionality with artistic beauty.
        </p>

        {/* Product Type Navigation */}
        <div className={styles.productTypeNav}>
          <button
            onClick={() => scrollToSection('resin')}
            className={styles.navButton}
          >
            Resin Creations
          </button>
          <button
            onClick={() => scrollToSection('crochet')}
            className={styles.navButton}
          >
            Crocheted Items
          </button>
          <button
            onClick={() => scrollToSection('3d-print')}
            className={styles.navButton}
          >
            3D Printed Items
          </button>
        </div>

        <div className={styles.heroButtons}>
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