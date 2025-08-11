export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  imageUrl: string | null
  inStock: boolean
  featured: boolean
  inventoryCount: number
  categoryName: string
  categorySlug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  hero: string
  featured: boolean
}

export interface CategoryWithProducts extends Category {
  productCount: number
  featuredProduct?: Product
}