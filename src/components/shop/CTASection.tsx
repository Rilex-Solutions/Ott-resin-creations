'use client'

import Link from 'next/link'
import styles from './CTASection.module.scss'

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Can't Find What You're Looking For?
        </h2>
        <p className={styles.description}>
          Let's create something custom just for you. Every piece tells a story - what's yours?
        </p>
        <Link 
          href="/contact" 
          className={styles.ctaButton}
        >
          Request Custom Piece
        </Link>
      </div>
    </section>
  )
}