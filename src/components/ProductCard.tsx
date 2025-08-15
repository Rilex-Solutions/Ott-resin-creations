'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { CartItem } from '@/types/cart'
import ImageModal from '@/components/ui/ImageModal'
import styles from './ProductCard.module.scss'

interface Product {
  id: string
  name: string
  price: string
  description: string
  image: string
  imageUrl: string | null
  inStock: boolean
  featured: boolean
  inventoryCount: number | null
}

interface ProductCardProps {
  product: Product
  variant: 'featured' | 'regular'
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
  // We'll return the original URL but add error handling
  if (googlePhotosUrl.includes('photos.google.com') || googlePhotosUrl.includes('photos.app.goo.gl')) {
    // Note: Google Photos URLs are often rate-limited or require authentication
    // Consider using a different image hosting service for better reliability
    return googlePhotosUrl
  }
  
  // Return original URL if we can't process it
  return googlePhotosUrl
}

export default function ProductCard({ product, variant }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = () => {
    if (!product.inStock) return
    
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')), // Remove $ and convert to number
      description: product.description,
      imageUrl: getDirectImageUrl(product.imageUrl)
    }
    
    addToCart(cartItem)
  }

  const productInCart = isInCart(product.id)

  const getButtonClass = () => {
    if (!product.inStock) return styles.outOfStock
    if (productInCart) return styles.inCart
    return styles.available
  }

  const getButtonText = () => {
    if (!product.inStock) return 'Out of Stock'
    if (productInCart) return 'In Cart'
    return 'Add to Cart'
  }

  const handleImageClick = () => {
    if (getDirectImageUrl(product.imageUrl)) {
      setIsModalOpen(true)
    }
  }

  return (
    <div className={`${styles.productCard} ${styles[variant]}`}>
      <div 
        className={styles.imageContainer}
        onClick={handleImageClick}
        style={{ cursor: getDirectImageUrl(product.imageUrl) ? 'pointer' : 'default' }}
      >
        {getDirectImageUrl(product.imageUrl) ? (
          <img 
            src={getDirectImageUrl(product.imageUrl)!} 
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        
        {!product.inStock && (
          <div className={styles.outOfStockOverlay}>
            <span className={`${styles.outOfStockText} ${styles[variant]}`}>
              Out of Stock
            </span>
          </div>
        )}
        
        {product.featured && variant === 'featured' && (
          <div className={styles.featuredBadge}>
            Featured
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.footer}>
          <span className={styles.price}>{product.price}</span>
          <button 
            onClick={handleAddToCart}
            className={`${styles.addButton} ${getButtonClass()}`}
            disabled={!product.inStock || productInCart}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={getDirectImageUrl(product.imageUrl) || ''}
        imageAlt={product.name}
      />
    </div>
  )
}