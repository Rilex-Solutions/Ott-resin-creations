import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <h3 className={styles.companyTitle}>Ott Resin Creations</h3>
            <p className={styles.companyDescription}>
              Handcrafted custom resin art and functional pieces. Each creation is uniquely designed 
              and crafted with care to bring beauty and functionality to your space.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className={styles.srOnly}>Facebook</span>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.srOnly}>Instagram</span>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.75 14.374c.652.652 1.544 1.059 2.532 1.059 1.99 0 3.611-1.621 3.611-3.611S11.272 8.211 9.282 8.211c-.988 0-1.88.407-2.532 1.059L5.121 7.953c.88-.807 2.031-1.297 3.328-1.297 2.726 0 4.939 2.211 4.939 4.939s-2.213 4.939-4.939 4.939z"/>
                </svg>
              </a>
            </div>
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
                <Link href="/products" className={styles.navLink}>
                  Products
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
              <p>Email: info@ottresincreations.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Follow us for updates and new creations!</p>
            </div>
          </div>
        </div>

        <div className={styles.divider}>
          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Ott Resin Creations. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy" className={styles.bottomLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.bottomLink}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}