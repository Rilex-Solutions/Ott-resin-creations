'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './home.module.scss'

interface SiteSettings {
  springSaleActive: boolean
  salePercentage: number
}

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainContent}>
        {/* Spring Sale Banner */}
        {!loading && settings?.springSaleActive && (
          <div className={styles.saleBanner}>
            <div className={styles.saleBannerContent}>
              <span className={styles.saleBannerIcon}>🌸</span>
              <h2 className={styles.saleBannerTitle}>
                Spring Sale - {settings.salePercentage}% Off Site Wide!
              </h2>
              <span className={styles.saleBannerIcon}>🌸</span>
            </div>
            <p className={styles.saleBannerSubtext}>
              Limited time offer on all products
            </p>
          </div>
        )}

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