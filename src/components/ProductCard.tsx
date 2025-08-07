'use client'

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
  if (variant === 'featured') {
    return (
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="aspect-square bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
          {getDirectImageUrl(product.imageUrl) ? (
            <img 
              src={getDirectImageUrl(product.imageUrl)!} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <span className={`text-gray-700 font-medium ${getDirectImageUrl(product.imageUrl) ? 'hidden' : ''}`}>{product.image}</span>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">{product.price}</span>
            <button 
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                product.inStock 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
        {getDirectImageUrl(product.imageUrl) ? (
          <img 
            src={getDirectImageUrl(product.imageUrl)!} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <span className={`text-gray-700 text-sm font-medium text-center px-2 ${getDirectImageUrl(product.imageUrl) ? 'hidden' : ''}`}>{product.image}</span>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">{product.price}</span>
          <button 
            className={`px-4 py-1 rounded text-sm font-semibold transition-colors ${
              product.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}