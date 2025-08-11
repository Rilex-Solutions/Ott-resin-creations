/**
 * Utility functions for handling image URLs from various sources
 */

/**
 * Converts Google Photos/Drive URLs to direct image URLs that work reliably in <img> tags
 * @param googlePhotosUrl - The original Google URL (Drive share link, Photos link, etc.)
 * @returns Converted URL or null if conversion fails
 */
export function getDirectImageUrl(googlePhotosUrl: string | null): string | null {
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