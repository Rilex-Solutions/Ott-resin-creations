import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JanetAboutHero from '@/components/about/JanetAboutHero'
import styles from './about.module.scss'

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Janet's About Hero Section */}
        <JanetAboutHero />


        {/* My Process Section */}
        <section className={styles.processSection}>
          <div className={styles.processContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Creative Process</h2>
              <p className={styles.sectionDescription}>
                Every piece is thoughtfully crafted through a meticulous process that ensures 
                quality, beauty, and durability in every creation.
              </p>
            </div>
            
            <div className={styles.processGrid}>
              <div className={styles.processStep}>
                <div className={`${styles.stepNumber} ${styles.step1}`}>
                  <span>1</span>
                </div>
                <h3 className={styles.stepTitle}>Consultation & Design</h3>
                <p className={styles.stepDescription}>
                  We start with a conversation about your vision, style preferences, and intended use. 
                  I&apos;ll create initial design concepts and color schemes for your approval.
                </p>
              </div>
              
              <div className={styles.processStep}>
                <div className={`${styles.stepNumber} ${styles.step2}`}>
                  <span>2</span>
                </div>
                <h3 className={styles.stepTitle}>Crafting & Creation</h3>
                <p className={styles.stepDescription}>
                  Using premium epoxy resin and high-quality pigments, I carefully pour and manipulate 
                  each layer to achieve the desired effects, patterns, and depth.
                </p>
              </div>
              
              <div className={styles.processStep}>
                <div className={`${styles.stepNumber} ${styles.step3}`}>
                  <span>3</span>
                </div>
                <h3 className={styles.stepTitle}>Finishing & Quality</h3>
                <p className={styles.stepDescription}>
                  After curing, each piece is sanded, polished, and inspected to ensure it meets 
                  my high standards before being carefully packaged for delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>What Drives My Work</h2>
            </div>
            
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={`${styles.valueContent} ${styles.quality}`}>
                  <h3 className={styles.valueTitle}>Quality First</h3>
                  <p className={styles.valueDescription}>
                    I use only premium materials and proven techniques to ensure your piece 
                    will be beautiful and durable for years to come.
                  </p>
                </div>
              </div>
              
              <div className={styles.valueCard}>
                <div className={`${styles.valueContent} ${styles.personal}`}>
                  <h3 className={styles.valueTitle}>Personal Touch</h3>
                  <p className={styles.valueDescription}>
                    Every piece is handmade in my studio with attention to detail that 
                    mass-produced items simply can&apos;t match.
                  </p>
                </div>
              </div>
              
              <div className={styles.valueCard}>
                <div className={`${styles.valueContent} ${styles.care}`}>
                  <h3 className={styles.valueTitle}>Customer Care</h3>
                  <p className={styles.valueDescription}>
                    Your satisfaction is my priority. I work closely with you throughout 
                    the process to ensure the final piece exceeds expectations.
                  </p>
                </div>
              </div>
              
              <div className={styles.valueCard}>
                <div className={`${styles.valueContent} ${styles.sustainability}`}>
                  <h3 className={styles.valueTitle}>Sustainability</h3>
                  <p className={styles.valueDescription}>
                    I&apos;m committed to responsible practices, from sourcing eco-friendly 
                    materials to minimizing waste in my creative process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Let&apos;s Create Something Together</h2>
            <p className={styles.ctaDescription}>
              I&apos;d love to hear about your project and discuss how we can bring your vision to life. 
              Every custom piece starts with a conversation.
            </p>
            <div className={styles.ctaButtons}>
              <Link 
                href="/contact" 
                className={styles.ctaPrimaryButton}
              >
                Get In Touch
              </Link>
              <Link 
                href="/shop" 
                className={styles.ctaSecondaryButton}
              >
                View My Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}