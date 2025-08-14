import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <h3 className={styles.companyTitle}>Huberduberkid Resin Creations</h3>
            <p className={styles.companyDescription}>
              Handcrafted custom resin art and functional pieces. Each creation is uniquely designed 
              and crafted with care to bring beauty and functionality to your space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className={styles.navLink}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={styles.sectionTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>Email: huberduberkid@gmail.com</p>
              <p>Phone: (720) 805-5509</p>
              <p>Follow us for updates and new creations!</p>
            </div>
          </div>
        </div>

        <div className={styles.divider}>
          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Huberduberkid Resin Creations. All rights reserved.
            </p>
            <p className={styles.makersMark}>
              Website created by <a href="https://www.tiffanycodes.com" target="_blank" rel="noopener noreferrer" className={styles.makersName}>TiffanyCodes</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}