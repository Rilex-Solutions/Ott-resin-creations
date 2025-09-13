'use client'

import Image from 'next/image'
import styles from './JanetAboutHero.module.scss'

export default function JanetAboutHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src="/Janet.JPEG"
              alt="Janet - Creator of Huberduberkid Resin Creations"
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
            <div className={styles.handwrittenGreeting}>
              Hi, I'm Janet
            </div>
          </div>
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.content}>
            <h1 className={styles.mainHeadline}>
              Welcome to Huberduberkid Resin Creations
            </h1>

            <p className={styles.tagline}>
              Turning memories into masterpieces
            </p>

            <p className={styles.personalParagraph}>
              What started as a creative outlet during quiet evenings has blossomed into my greatest passion.
              I fell in love with the magic of resin art and how each pour creates something completely unique,
              just like the memories and moments that inspire every piece. From custom family portraits
              embedded in resin to functional art that brings joy to everyday life, I pour my heart
              into creating pieces that tell your story and become treasured keepsakes for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}