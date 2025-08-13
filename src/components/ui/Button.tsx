import styles from './Button.module.scss'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${
    disabled ? styles.disabled : ''
  } ${loading ? styles.loading : ''} ${className}`

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
    >
      {loading ? (
        <div className={styles.loadingContent}>
          <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

// Example usage in components:
// <Button variant="primary" size="lg">Primary Button</Button>
// <Button variant="secondary" size="md">Secondary Button</Button>
// <Button variant="tertiary" disabled>Disabled Button</Button>