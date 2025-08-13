'use client'

import Link from 'next/link'
import styles from './CustomOrderCTA.module.scss'

interface CustomOrderCTAProps {
  categoryName: string
}

export default function CustomOrderCTA({ categoryName }: CustomOrderCTAProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Want Something Different?</h2>
        <p className={styles.description}>
          Don't see exactly what you're looking for in our {categoryName.toLowerCase()} collection? 
          Let's create a custom piece just for you!
        </p>
        <div className={styles.buttons}>
          <Link 
            href="/shop/custom-orders" 
            className={styles.primaryButton}
          >
            View Custom Options
          </Link>
          <Link 
            href="/contact" 
            className={styles.secondaryButton}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}