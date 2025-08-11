'use client'

import { useState, useEffect } from 'react'
import { Product, Category } from '@/types/shop'

interface UseShopDataResult {
  products: Product[]
  categories: Category[]
  featuredCategories: Category[]
  otherCategories: Category[]
  loading: boolean
  error: string | null
}

export function useShopData(): UseShopDataResult {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        
        // Fetch both products and categories
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ])
        
        // Check if responses are successful
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`)
        }
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`)
        }
        
        const productsData = await productsResponse.json()
        const categoriesData = await categoriesResponse.json()
        
        // Validate response structure
        if (productsData && Array.isArray(productsData.products)) {
          setProducts(productsData.products)
        } else {
          console.warn('Invalid products response structure:', productsData)
          setProducts([])
        }
        
        if (categoriesData && Array.isArray(categoriesData.categories)) {
          setCategories(categoriesData.categories)
        } else {
          console.warn('Invalid categories response structure:', categoriesData)
          setCategories([])
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch shop data'
        console.error('Error fetching shop data:', err)
        setError(errorMessage)
        
        // Set empty arrays on error so the UI can still render
        setProducts([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredCategories = categories.filter(cat => cat.featured)
  const otherCategories = categories.filter(cat => !cat.featured)

  return {
    products,
    categories,
    featuredCategories,
    otherCategories,
    loading,
    error
  }
}