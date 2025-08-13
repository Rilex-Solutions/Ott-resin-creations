'use client'

import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </div>
  )
}