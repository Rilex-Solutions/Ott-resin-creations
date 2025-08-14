'use client'

import { useEffect } from 'react'
import styles from './ImageModal.module.scss'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  // Handle ESC key press and scroll prevention
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      // Store current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      document.addEventListener('keydown', handleEscKey)
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollTop}px`
      document.body.style.width = '100%'
    }

    return () => {
      if (isOpen) {
        document.removeEventListener('keydown', handleEscKey)
        
        // Restore body scroll and position
        const scrollTop = Math.abs(parseInt(document.body.style.top || '0'))
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        
        // Restore scroll position
        window.scrollTo(0, scrollTop)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className={styles.modalImage}
        />
      </div>
    </div>
  )
}