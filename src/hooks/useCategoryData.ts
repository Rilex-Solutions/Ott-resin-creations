'use client'

import { useState, useEffect } from 'react'
import { Product, Category } from '@/types/shop'

interface UseCategoryDataResult {
  category: Category | null
  products: Product[]
  featuredProducts: Product[]
  otherProducts: Product[]
  loading: boolean
  error: string | null
}

export function useCategoryData(categorySlug: string): UseCategoryDataResult {
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setError(null)
        setLoading(true)
        
        // Fetch both category info and its products
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ])
        
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`)
        }
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`)
        }
        
        const categoriesData = await categoriesResponse.json()
        const productsData = await productsResponse.json()
        
        // Find the specific category
        const foundCategory = categoriesData.categories?.find(
          (cat: Category) => cat.slug === categorySlug
        )
        
        if (!foundCategory) {
          throw new Error(`Category '${categorySlug}' not found`)
        }
        
        setCategory(foundCategory)
        
        // Filter products for this category
        const categoryProducts = productsData.products?.filter(
          (product: Product) => product.categorySlug === categorySlug
        ) || []
        
        setProducts(categoryProducts)
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch category data'
        console.error('Error fetching category data:', err)
        setError(errorMessage)
        setCategory(null)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (categorySlug) {
      fetchCategoryData()
    }
  }, [categorySlug])

  const featuredProducts = products.filter(product => product.featured)
  const otherProducts = products.filter(product => !product.featured)

  return {
    category,
    products,
    featuredProducts,
    otherProducts,
    loading,
    error
  }
}