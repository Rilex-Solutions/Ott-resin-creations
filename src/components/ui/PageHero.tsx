'use client'

import styles from './PageHero.module.scss'

interface PageHeroProps {
  title: string
  subtitle: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export default function PageHero({ 
  title, 
  subtitle, 
  maxWidth = '4xl' 
}: PageHeroProps) {
  const maxWidthClass = maxWidth === '2xl' ? 'xl2' : maxWidth === '3xl' ? 'xl3' : maxWidth === '4xl' ? 'xl4' : maxWidth;

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.heroContainer} ${styles[maxWidthClass]}`}>
        <h1 className={styles.heroTitle}>
          {title}
        </h1>
        <p className={styles.heroSubtitle}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}