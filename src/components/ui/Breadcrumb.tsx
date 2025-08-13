'use client'

import Link from 'next/link'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumbInner}>
        <nav className={styles.breadcrumbNav}>
          {items.map((item, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
              {item.href ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}