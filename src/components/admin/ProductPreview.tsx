'use client'

import { useState } from 'react'
import ImageModal from '@/components/ui/ImageModal'
import styles from '../ProductCard.module.scss'

interface ProductPreviewProps {
  name: string
  price: string
  description: string
  imageUrl: string
  inStock: boolean
  featured: boolean
  variant?: 'featured' | 'regular'
}

// Helper function to convert Google Photos URLs to direct image URLs
function getDirectImageUrl(googlePhotosUrl: string | null): string | null {
  if (!googlePhotosUrl) return null

  // If it's already a direct image URL, return as is
  if (googlePhotosUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return googlePhotosUrl
  }

  // Handle different Google service URLs
  if (googlePhotosUrl.includes('drive.google.com')) {
    // For Google Drive, extract the file ID and create a direct link
    let fileId = ''

    // Handle different Google Drive URL formats
    const shareMatch = googlePhotosUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
    const viewMatch = googlePhotosUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)
    const idMatch = googlePhotosUrl.match(/id=([a-zA-Z0-9-_]+)/)

    if (shareMatch) {
      fileId = shareMatch[1]
    } else if (viewMatch) {
      fileId = viewMatch[1]
    } else if (idMatch) {
      fileId = idMatch[1]
    }

    if (fileId) {
      // Use the thumbnail API which is more reliable for images
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
    }
  }

  // For Google Photos, these URLs are tricky and often get rate limited
  if (googlePhotosUrl.includes('photos.google.com') || googlePhotosUrl.includes('photos.app.goo.gl')) {
    return googlePhotosUrl
  }

  // Return original URL if we can't process it
  return googlePhotosUrl
}

export default function ProductPreview({
  name,
  price,
  description,
  imageUrl,
  inStock,
  featured,
  variant = 'regular'
}: ProductPreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formattedPrice = price.startsWith('$') ? price : `$${price}`
  const directImageUrl = getDirectImageUrl(imageUrl)

  const handleImageClick = () => {
    if (directImageUrl && !imageError) {
      setIsModalOpen(true)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Preview</h3>

      <div className={`${styles.productCard} ${styles[variant]} max-w-sm`}>
        <div
          className={styles.imageContainer}
          onClick={handleImageClick}
          style={{ cursor: directImageUrl && !imageError ? 'pointer' : 'default' }}
        >
          {directImageUrl && !imageError ? (
            <img
              src={directImageUrl}
              alt={name || 'Product preview'}
              className={styles.productImage}
              onError={handleImageError}
            />
          ) : (
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
              {imageUrl ? (
                <div className="text-center text-sm">
                  <p>Image failed to load</p>
                  <p className="text-xs mt-1">Check URL format</p>
                </div>
              ) : (
                <div className="text-center text-sm">
                  <p>No image URL</p>
                  <p className="text-xs mt-1">Add image URL to preview</p>
                </div>
              )}
            </div>
          )}

          {!inStock && (
            <div className={styles.outOfStockOverlay}>
              <span className={`${styles.outOfStockText} ${styles[variant]}`}>
                Out of Stock
              </span>
            </div>
          )}

          {featured && variant === 'featured' && (
            <div className={styles.featuredBadge}>
              Featured
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{name || 'Product Name'}</h3>
          <p className={styles.description}>
            {description || 'Product description will appear here...'}
          </p>

          <div className={styles.footer}>
            <span className={styles.price}>{formattedPrice || '$0'}</span>
            <button
              className={`${styles.addButton} ${inStock ? styles.available : styles.outOfStock}`}
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Options */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Preview as:</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className={`px-2 py-1 rounded ${variant === 'regular' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
            Regular
          </span>
          <span className={`px-2 py-1 rounded ${variant === 'featured' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
            Featured
          </span>
        </div>
      </div>

      {/* Image Modal */}
      {directImageUrl && !imageError && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={directImageUrl}
          imageAlt={name || 'Product preview'}
        />
      )}
    </div>
  )
}