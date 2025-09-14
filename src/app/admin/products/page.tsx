'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { colorCombinations } from '@/constants/colors'
import { styleCombinations } from '@/constants/styles'

interface Product {
  id: string
  name: string
  description: string
  price: string
  categoryName: string
  categorySlug: string
  image: string
  imageUrl: string
  inStock: boolean
  featured: boolean
  inventoryCount: number
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteStatus, setDeleteStatus] = useState<{[key: string]: 'idle' | 'deleting' | 'success' | 'error'}>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data.products) {
        setProducts(data.products)
        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map((p: Product) => p.categoryName))]
        setCategories(uniqueCategories.sort())
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }

    setDeleteStatus(prev => ({ ...prev, [productId]: 'deleting' }))

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setDeleteStatus(prev => ({ ...prev, [productId]: 'success' }))
        // Remove from local state
        setProducts(prev => prev.filter(p => p.id !== productId))
        setTimeout(() => {
          setDeleteStatus(prev => ({ ...prev, [productId]: 'idle' }))
        }, 2000)
      } else {
        setDeleteStatus(prev => ({ ...prev, [productId]: 'error' }))
      }
    } catch (error) {
      setDeleteStatus(prev => ({ ...prev, [productId]: 'error' }))
    }
  }

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || product.categoryName === filterCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFBFD] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#68B8C6] mx-auto"></div>
            <p className="mt-4 text-[#6B5B73]">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFBFD] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-[#6B5B73] mb-4 md:mb-0">
            Manage Products ({filteredProducts.length} total)
          </h1>
          <Link
            href="/admin/products/add"
            className={`${colorCombinations.primaryButton.full} px-6 py-3 rounded-lg font-semibold`}
          >
            Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E0D0E3] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6B5B73] mb-2">
                Search Products
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-3 py-2 border border-[#E0D0E3] rounded-md focus:ring-2 focus:ring-[#68B8C6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B5B73] mb-2">
                Filter by Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#E0D0E3] rounded-md focus:ring-2 focus:ring-[#68B8C6] focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B5B73] text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-[#E0D0E3] overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square bg-[#F7F1F8] flex items-center justify-center p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="text-center text-[#A090A3]">
                      <p className="text-sm">{product.image || 'No image'}</p>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#6B5B73] text-lg leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 ml-2">
                      {product.featured && (
                        <span className="bg-[#D4A574] text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#A090A3] mb-2">{product.categoryName}</p>
                  <p className="text-[#6B5B73] text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#68B8C6] font-bold text-lg">{product.price}</span>
                    <span className="text-sm text-[#A090A3]">
                      Qty: {product.inventoryCount}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 bg-[#68B8C6] text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-[#5aa6b4] transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      disabled={deleteStatus[product.id] === 'deleting'}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        deleteStatus[product.id] === 'success'
                          ? 'bg-green-500 text-white'
                          : deleteStatus[product.id] === 'error'
                          ? 'bg-red-500 text-white'
                          : deleteStatus[product.id] === 'deleting'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {deleteStatus[product.id] === 'deleting' ? 'Deleting...' :
                       deleteStatus[product.id] === 'success' ? 'Deleted!' :
                       deleteStatus[product.id] === 'error' ? 'Error' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}