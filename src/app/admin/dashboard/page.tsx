'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductPreview from '@/components/admin/ProductPreview'
import styles from './dashboard.module.scss'

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

interface Category {
  slug: string
  name: string
}

interface ProductFormData {
  name: string
  description: string
  price: string
  categorySlug: string
  image: string
  imageUrl: string
  inStock: boolean
  featured: boolean
  inventoryCount: number
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  categorySlug: '',
  image: '',
  imageUrl: '',
  inStock: true,
  featured: false,
  inventoryCount: 1
}

export default function AdminDashboard() {
  // Product management state
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [stockFilter, setStockFilter] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [showFilters, setShowFilters] = useState(false)

  // Form state
  const [activeView, setActiveView] = useState<'list' | 'add' | 'edit'>('list')
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Categories
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // Delete state
  const [deleteStatus, setDeleteStatus] = useState<{[key: string]: 'idle' | 'deleting' | 'success' | 'error'}>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ])

      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        if (productsData.products) {
          setProducts(productsData.products)
        }
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        if (categoriesData.categories) {
          setCategories(categoriesData.categories)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setProductsLoading(false)
      setCategoriesLoading(false)
    }
  }

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Product name is required'
        } else {
          delete newErrors.name
        }
        break
      case 'description':
        if (!value.trim()) {
          newErrors.description = 'Description is required'
        } else if (value.length < 10) {
          newErrors.description = 'Description must be at least 10 characters'
        } else {
          delete newErrors.description
        }
        break
      case 'price':
        const priceValue = value.replace('$', '')
        if (!priceValue.trim()) {
          newErrors.price = 'Price is required'
        } else if (isNaN(parseFloat(priceValue)) || parseFloat(priceValue) <= 0) {
          newErrors.price = 'Price must be a valid positive number'
        } else {
          delete newErrors.price
        }
        break
      case 'categorySlug':
        if (!value) {
          newErrors.categorySlug = 'Category is required'
        } else {
          delete newErrors.categorySlug
        }
        break
      case 'imageUrl':
        if (value && !isValidUrl(value)) {
          newErrors.imageUrl = 'Please enter a valid URL'
        } else {
          delete newErrors.imageUrl
        }
        break
      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else if (type === 'number') {
      const numValue = parseInt(value) || 0
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }))
      validateField(name, numValue)
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      validateField(name, value)
    }
  }

  const handleAddProduct = () => {
    setActiveView('add')
    setFormData(initialFormData)
    setEditingProductId(null)
    setErrors({})
    setSubmitStatus('idle')
  }

  const handleEditProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (response.ok) {
        const data = await response.json()
        const product = data.product
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          categorySlug: product.categorySlug,
          image: product.image,
          imageUrl: product.imageUrl || '',
          inStock: product.inStock,
          featured: product.featured,
          inventoryCount: product.inventoryCount
        })
        setEditingProductId(productId)
        setActiveView('edit')
        setErrors({})
        setSubmitStatus('idle')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Validate all required fields
    const requiredFields = ['name', 'description', 'price', 'categorySlug']
    let hasErrors = false

    for (const field of requiredFields) {
      if (!validateField(field, formData[field as keyof ProductFormData])) {
        hasErrors = true
      }
    }

    if (hasErrors) {
      setIsSubmitting(false)
      return
    }

    try {
      const formattedData = {
        ...formData,
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`
      }

      const url = activeView === 'edit' ? `/api/products/${editingProductId}` : '/api/products'
      const method = activeView === 'edit' ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          setActiveView('list')
          setFormData(initialFormData)
          fetchData() // Refresh the product list
        }, 1500)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
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

  const handleCancelForm = () => {
    setActiveView('list')
    setFormData(initialFormData)
    setEditingProductId(null)
    setErrors({})
    setSubmitStatus('idle')
  }

  // Advanced filtering and sorting logic
  const uniqueCategories = [...new Set(products.map(p => p.categoryName))].sort()

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || product.categoryName === filterCategory
    const matchesStock = !stockFilter ||
                        (stockFilter === 'in-stock' && product.inStock) ||
                        (stockFilter === 'out-of-stock' && !product.inStock)
    const matchesFeatured = !featuredFilter ||
                           (featuredFilter === 'featured' && product.featured) ||
                           (featuredFilter === 'not-featured' && !product.featured)

    // Price range filter
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''))
    const matchesPriceMin = !priceRange.min || price >= parseFloat(priceRange.min)
    const matchesPriceMax = !priceRange.max || price <= parseFloat(priceRange.max)

    return matchesSearch && matchesCategory && matchesStock && matchesFeatured && matchesPriceMin && matchesPriceMax
  }).sort((a, b) => {
    let aValue: any, bValue: any

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'price':
        aValue = parseFloat(a.price.replace(/[^0-9.]/g, ''))
        bValue = parseFloat(b.price.replace(/[^0-9.]/g, ''))
        break
      case 'category':
        aValue = a.categoryName.toLowerCase()
        bValue = b.categoryName.toLowerCase()
        break
      case 'stock':
        aValue = a.inventoryCount
        bValue = b.inventoryCount
        break
      default:
        return 0
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterCategory, stockFilter, featuredFilter, priceRange])

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedProducts.size === paginatedProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(paginatedProducts.map(p => p.id)))
    }
  }

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterCategory('')
    setStockFilter('')
    setFeaturedFilter('')
    setPriceRange({ min: '', max: '' })
    setSortBy('name')
    setSortOrder('asc')
  }

  const activeFiltersCount = [searchTerm, filterCategory, stockFilter, featuredFilter, priceRange.min, priceRange.max].filter(Boolean).length

  return (
    <div className={styles.dashboard}>
      {/* Modern Dashboard Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {/* Branding */}
          <div className={styles.branding}>
            <div className={styles.brandIcon}>
              <img src="/icons/available.png" alt="Package" className={styles.icon} />
            </div>
            <div>
              <h1 className={styles.brandTitle}>Janet's Admin Dashboard</h1>
              <p className={styles.brandSubtitle}>Manage your resin creations</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <Link href="/" className={styles.viewStoreBtn}>
              <img src="/icons/recent.png" alt="Store" className={styles.iconMr} />
              View Store
            </Link>
            <button onClick={() => setActiveView('add')} className={styles.addBtn}>
              <img src="/icons/plus.png" alt="Add" className={styles.iconMr} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className={styles.container} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statIcon} ${styles.blue}`}>
                <img src="/icons/available.png" alt="Products" className={styles.icon} />
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Total Products</p>
                <p className={styles.statValue}>{products.length}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statIcon} ${styles.green}`}>
                <img src="/icons/available.png" alt="Available" className={styles.icon} />
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Available</p>
                <p className={styles.statValue}>{products.filter(p => p.inStock).length}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statIcon} ${styles.orange}`}>
                <img src="/icons/feature.png" alt="Featured" className={styles.icon} />
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Featured</p>
                <p className={styles.statValue}>{products.filter(p => p.featured).length}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.statIcon} ${styles.purple}`}>
                <img src="/icons/arrow.png" alt="Low Stock" className={styles.icon} />
              </div>
              <div className={styles.statDetails}>
                <p className={styles.statLabel}>Low Stock</p>
                <p className={styles.statValue}>{products.filter(p => p.inventoryCount < 5).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.navigation}>
          <div className={styles.navContent}>
            <div className={styles.navTabs}>
              <button
                onClick={() => setActiveView('list')}
                className={`${styles.navTab} ${activeView === 'list' ? styles.active : ''}`}
              >
                <div className={styles.navTabContent}>
                  <img src="/icons/available.png" alt="Products" className={styles.icon} />
                  <span>Products ({products.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveView('add')}
                className={`${styles.navTab} ${activeView === 'add' ? styles.active : ''}`}
              >
                <div className={styles.navTabContent}>
                  <img src="/icons/plus.png" alt="Add" className={styles.icon} />
                  <span>Add Product</span>
                </div>
              </button>
              {activeView === 'edit' && (
                <button className={`${styles.navTab} ${styles.active}`} style={{ color: '#D4A574', borderBottomColor: '#D4A574' }}>
                  <div className={styles.navTabContent}>
                    <img src="/icons/pencil.png" alt="Edit" className={styles.icon} />
                    <span>Edit Product</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Message for First Time Users */}
        {activeView === 'list' && products.length === 0 && !productsLoading && (
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeIcon}>
              <img src="/icons/available.png" alt="Welcome" className={styles.icon} />
            </div>
            <h2 className={styles.welcomeTitle}>Welcome to Your Dashboard!</h2>
            <p className={styles.welcomeText}>
              This is where you'll manage all your beautiful resin art products. Let's get started by adding your first product!
            </p>
            <button onClick={handleAddProduct} className={styles.welcomeBtn}>
              <img src="/icons/plus.png" alt="Add" className={styles.iconMr} />
              Add Your First Product
            </button>
          </div>
        )}

        {/* Product List View */}
        {activeView === 'list' && products.length > 0 && (
          <div className={styles.searchSection}>
            {/* Enhanced Search and Filter Bar */}
            <div className={styles.searchBar}>
              <div className={styles.searchContent}>
                <div className={styles.searchInputWrapper}>
                  <img src="/icons/searching.png" alt="Search" className={styles.searchIcon} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products by name or description..."
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.searchControls}>
                  {/* View Toggle */}
                  <div className={styles.viewToggle}>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                    >
                      <img src="/icons/grid.png" alt="Grid" className={styles.icon} />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`${styles.viewToggleBtn} ${viewMode === 'table' ? styles.active : ''}`}
                    >
                      <img src="/icons/content.png" alt="List" className={styles.icon} />
                    </button>
                  </div>

                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`${styles.filterBtn} ${showFilters ? styles.active : ''}`}
                  >
                    <img src="/icons/filter.png" alt="Filter" className={styles.iconMr} />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className={styles.filterBadge}>
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilters && (
                <div className={styles.filtersPanel}>
                  <div className={styles.filtersGrid}>
                    {/* Category Filter */}
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>Category</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="">All Categories</option>
                        {uniqueCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Stock Status Filter */}
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>Stock Status</label>
                      <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="">All Items</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>

                    {/* Featured Filter */}
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>Featured</label>
                      <select
                        value={featuredFilter}
                        onChange={(e) => setFeaturedFilter(e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="">All Products</option>
                        <option value="featured">Featured Only</option>
                        <option value="not-featured">Not Featured</option>
                      </select>
                    </div>

                    {/* Sort Options */}
                    <div className={styles.filterField}>
                      <label className={styles.filterLabel}>Sort By</label>
                      <div className={styles.sortControls}>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className={styles.sortSelect}
                        >
                          <option value="name">Name</option>
                          <option value="price">Price</option>
                          <option value="category">Category</option>
                          <option value="stock">Stock</option>
                        </select>
                        <button
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className={styles.sortToggle}
                        >
                          <img src="/icons/sort-az.png" alt="Sort" className={styles.icon} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className={styles.priceRange}>
                    <label className={styles.priceRangeLabel}>Price Range</label>
                    <div className={styles.priceRangeInputs}>
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className={styles.priceInput}
                      />
                      <span>to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className={styles.priceInput}
                      />
                      {activeFiltersCount > 0 && (
                        <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                          <img src="/icons/cross.png" alt="Clear" className={styles.iconMr} />
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              {(searchTerm || activeFiltersCount > 0) && (
                <div className={styles.resultsSummary}>
                  <div className={styles.resultsContent}>
                    <p className={styles.resultsText}>
                      Showing {filteredProducts.length} of {products.length} products
                      {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                    {activeFiltersCount > 0 && (
                      <button onClick={clearFilters} className={styles.clearAllBtn}>
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Products Display */}
            <div className={styles.productsContainer}>
              {productsLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loadingText}>Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className={styles.emptyState}>
                  <img src="/icons/searching.png" alt="No products found" className={styles.emptyIcon} />
                  <h3 className={styles.emptyTitle}>No products found</h3>
                  <p className={styles.emptyText}>
                    {searchTerm || activeFiltersCount > 0
                      ? "Try adjusting your search terms or filters"
                      : "You haven't added any products yet"}
                  </p>
                  {!searchTerm && activeFiltersCount === 0 && (
                    <button onClick={handleAddProduct} className={styles.emptyBtn}>
                      <img src="/icons/plus.png" alt="Add" className={styles.iconMr} />
                      Add Your First Product
                    </button>
                  )}
                </div>
              ) : viewMode === 'grid' ? (
                <>
                  {/* Bulk Actions */}
                  {selectedProducts.size > 0 && (
                    <div className={styles.bulkActions}>
                      <div className={styles.bulkContent}>
                        <span className={styles.bulkText}>{selectedProducts.size} products selected</span>
                        <div className={styles.bulkButtons}>
                          <button className={styles.bulkBtn}>Mark Featured</button>
                          <button className={styles.bulkBtn}>Update Stock</button>
                          <button onClick={() => setSelectedProducts(new Set())} className={styles.bulkBtn}>
                            Clear Selection
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.productsGrid}>
                    {paginatedProducts.map((product) => (
                      <div key={product.id} className={styles.productCard}>
                        {/* Selection Checkbox */}
                        <button onClick={() => handleSelectProduct(product.id)} className={styles.selectBtn}>
                          {selectedProducts.has(product.id) ? (
                            <img src="/icons/check.png" alt="Selected" className={styles.icon} />
                          ) : (
                            <img src="/icons/square.png" alt="Unselected" className={styles.icon} />
                          )}
                        </button>

                        {/* Product Image */}
                        <div className={styles.productImage}>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '0.5rem' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className={styles.noImagePlaceholder}>
                              <img src="/icons/available.png" alt="No Image" className={styles.noImageIcon} />
                              <p className={styles.noImageText}>No Image</p>
                            </div>
                          )}

                          {/* Status Badges */}
                          <div className={styles.statusBadges}>
                            {product.featured && (
                              <span className={`${styles.statusBadge} ${styles.featured}`}>
                                <img src="/icons/feature.png" alt="Featured" className={styles.iconSm} />
                                Featured
                              </span>
                            )}
                            <span className={`${styles.statusBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className={styles.productInfo}>
                          <div className={styles.productHeader}>
                            <h3 className={styles.productTitle}>{product.name}</h3>
                            <div className={styles.productMeta}>
                              <span className={styles.productCategory}>{product.categoryName}</span>
                              <span className={styles.productPrice}>{product.price}</span>
                            </div>
                          </div>

                          <p className={styles.productDescription}>{product.description}</p>

                          <div className={styles.productStock}>
                            <span className={styles.stockLabel}>
                              Stock: <span className={styles.stockValue}>{product.inventoryCount}</span>
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className={styles.productActions}>
                            <button onClick={() => handleEditProduct(product.id)} className={`${styles.actionBtn} ${styles.editBtn}`}>
                              <img src="/icons/pencil.png" alt="Edit" className={styles.iconSm} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deleteStatus[product.id] === 'deleting'}
                              className={`${styles.actionBtn} ${styles.deleteBtn} ${
                                deleteStatus[product.id] === 'success' ? styles.success :
                                deleteStatus[product.id] === 'error' ? styles.error :
                                deleteStatus[product.id] === 'deleting' ? styles.deleting : ''
                              }`}
                            >
                              {deleteStatus[product.id] === 'deleting' ? (
                                'Deleting...'
                              ) : deleteStatus[product.id] === 'success' ? (
                                'Deleted'
                              ) : deleteStatus[product.id] === 'error' ? (
                                'Error'
                              ) : (
                                <>
                                  <img src="/icons/bin.png" alt="Delete" className={styles.iconSm} />
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className={styles.pagination}>
                      <div className={styles.paginationInfo}>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
                      </div>

                      <div className={styles.paginationControls}>
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={styles.paginationBtn}
                        >
                          Previous
                        </button>

                        <div className={styles.paginationNumbers}>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                              >
                                {page}
                              </button>
                            )
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={styles.paginationBtn}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Table View
                <div className={styles.tableContainer}>
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead className={styles.tableHeader}>
                        <tr className={styles.tableHeaderRow}>
                          <th className={styles.tableHeaderCell}>
                            <input
                              type="checkbox"
                              checked={selectedProducts.size === paginatedProducts.length && paginatedProducts.length > 0}
                              onChange={handleSelectAll}
                              className={styles.checkbox}
                            />
                          </th>
                          <th className={styles.tableHeaderCell}>Product</th>
                          <th className={styles.tableHeaderCell}>Category</th>
                          <th className={styles.tableHeaderCell}>Price</th>
                          <th className={styles.tableHeaderCell}>Stock</th>
                          <th className={styles.tableHeaderCell}>Status</th>
                          <th className={styles.tableHeaderCell}>Actions</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tableBody}>
                        {paginatedProducts.map((product) => (
                          <tr key={product.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>
                              <input
                                type="checkbox"
                                checked={selectedProducts.has(product.id)}
                                onChange={() => handleSelectProduct(product.id)}
                                className={styles.checkbox}
                              />
                            </td>
                            <td className={styles.tableCell}>
                              <div className={styles.tableCellContent}>
                                <div className={styles.tableImage}>
                                  {product.imageUrl ? (
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className={styles.tableImage}
                                      style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'
                                      }}
                                    />
                                  ) : (
                                    <div className={styles.tableImageContainer}>
                                      <img src="/icons/available.png" alt="No Image" className={styles.iconSm} />
                                    </div>
                                  )}
                                </div>
                                <div className={styles.tableProductInfo}>
                                  <div className={styles.tableProductName}>{product.name}</div>
                                  <div className={styles.tableProductDescription}>{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className={styles.tableCell}>
                              <span className={`${styles.tableBadge} ${styles.category}`}>
                                {product.categoryName}
                              </span>
                            </td>
                            <td className={styles.tableCell}>
                              <span className={styles.tablePrice}>{product.price}</span>
                            </td>
                            <td className={styles.tableCell}>
                              <span className={styles.tableStock}>{product.inventoryCount}</span>
                            </td>
                            <td className={styles.tableCell}>
                              <div className={styles.tableStatusContainer}>
                                <span className={`${styles.tableBadge} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                                {product.featured && (
                                  <span className={`${styles.tableBadge} ${styles.featured}`}>
                                    <img src="/icons/feature.png" alt="Featured" className={styles.iconSm} />
                                    Featured
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className={styles.tableCell}>
                              <div className={styles.tableActions}>
                                <button
                                  onClick={() => handleEditProduct(product.id)}
                                  className={styles.tableActionBtn}
                                >
                                  <img src="/icons/pencil.png" alt="Edit" className={styles.icon} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  disabled={deleteStatus[product.id] === 'deleting'}
                                  className={`${styles.tableActionBtn} ${styles.delete} ${
                                    deleteStatus[product.id] === 'deleting' ? styles.deleting : ''
                                  }`}
                                >
                                  <img src="/icons/bin.png" alt="Delete" className={styles.icon} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Pagination */}
                  {totalPages > 1 && (
                    <div className={styles.pagination}>
                      <div className={styles.paginationInfo}>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
                      </div>

                      <div className={styles.paginationControls}>
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={styles.paginationBtn}
                        >
                          Previous
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={styles.paginationBtn}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Product Form */}
        {(activeView === 'add' || activeView === 'edit') && (
          <div className={styles.formContainer}>
            {/* Form Header */}
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {activeView === 'edit' ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className={styles.formSubtitle}>
                {activeView === 'edit'
                  ? 'Make changes to your existing product. You can see how it will look on the right!'
                  : 'Fill out the details below to add a new product to your store. Watch the preview update as you type!'}
              </p>
            </div>

            <div className={styles.formContent}>
              <div className={styles.formGrid}>
                {/* Form Column */}
                <div>
                  {submitStatus === 'success' && (
                    <div className={`${styles.statusMessage} ${styles.success}`}>
                      <div className={styles.statusIcon}>
                        <img src="/icons/check.png" alt="Success" className={styles.icon} />
                      </div>
                      <div className={styles.statusText}>
                        <p className={styles.statusTitle}>
                          Success! Product {activeView === 'edit' ? 'updated' : 'added'}!
                        </p>
                        <p className={styles.statusDescription}>Taking you back to your products...</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className={`${styles.statusMessage} ${styles.error}`}>
                      <div className={styles.statusIcon}>
                        <img src="/icons/arrow.png" alt="Error" className={styles.icon} />
                      </div>
                      <div className={styles.statusText}>
                        <p className={styles.statusTitle}>Oops! Something went wrong</p>
                        <p className={styles.statusDescription}>Please check your information and try again.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmitProduct} className={styles.formSection}>
                    {/* Product Name */}
                    <div className={styles.fieldGroup}>
                      <label htmlFor="name" className={styles.fieldLabel}>
                        Product Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`${styles.fieldInput} ${errors.name ? styles.error : ''}`}
                        placeholder="Give your product a catchy name..."
                      />
                      {errors.name && (
                        <p className={styles.fieldError}>{errors.name}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div className={styles.fieldGroup}>
                      <label htmlFor="categorySlug" className={styles.fieldLabel}>
                        Category <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="categorySlug"
                        name="categorySlug"
                        value={formData.categorySlug}
                        onChange={handleInputChange}
                        required
                        disabled={categoriesLoading}
                        className={`${styles.fieldSelect} ${errors.categorySlug ? styles.error : ''}`}
                      >
                        {categoriesLoading ? (
                          <option value="">Loading categories...</option>
                        ) : (
                          <>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                              <option key={category.slug} value={category.slug}>
                                {category.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      {errors.categorySlug && (
                        <p className={styles.fieldError}>{errors.categorySlug}</p>
                      )}
                    </div>

                    {/* Price */}
                    <div className={styles.fieldGroup}>
                      <label htmlFor="price" className={styles.fieldLabel}>
                        Price <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className={`${styles.fieldInput} ${errors.price ? styles.error : ''}`}
                        placeholder="e.g., $35"
                      />
                      {errors.price && (
                        <p className={styles.fieldError}>{errors.price}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className={styles.fieldGroup}>
                      <label htmlFor="description" className={styles.fieldLabel}>
                        Description <span className={styles.required}>*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={`${styles.fieldTextarea} ${errors.description ? styles.error : ''}`}
                        placeholder="Detailed description of the product..."
                      />
                      {errors.description && (
                        <p className={styles.fieldError}>{errors.description}</p>
                      )}
                    </div>

                    {/* Image URL */}
                    <div className={styles.fieldGroup}>
                      <label htmlFor="imageUrl" className={styles.fieldLabel}>
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className={`${styles.fieldInput} ${errors.imageUrl ? styles.error : ''}`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.imageUrl && (
                        <p className={styles.fieldError}>{errors.imageUrl}</p>
                      )}
                    </div>

                    {/* Settings */}
                    <div className={styles.fieldsGrid}>
                      <div className={styles.fieldGroup}>
                        <label htmlFor="inventoryCount" className={styles.fieldLabel}>
                          Inventory Count
                        </label>
                        <input
                          type="number"
                          id="inventoryCount"
                          name="inventoryCount"
                          value={formData.inventoryCount}
                          onChange={handleInputChange}
                          min="0"
                          className={styles.fieldInput}
                        />
                      </div>
                      <div className={styles.checkboxGroup}>
                        <div className={styles.checkboxField}>
                          <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxLabel}>In Stock</span>
                        </div>
                        <div className={styles.checkboxField}>
                          <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxLabel}>Featured</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className={styles.formActions}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitBtn}
                      >
                        {isSubmitting ?
                          (activeView === 'edit' ? 'Updating...' : 'Adding...') :
                          (activeView === 'edit' ? 'Update Product' : 'Add Product')
                        }
                      </button>
                      <button type="button" onClick={handleCancelForm} className={styles.cancelBtn}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {/* Preview Column */}
                <div style={{ position: 'sticky', top: '1.5rem' }}>
                  <ProductPreview
                    name={formData.name}
                    price={formData.price}
                    description={formData.description}
                    imageUrl={formData.imageUrl}
                    inStock={formData.inStock}
                    featured={formData.featured}
                    variant={formData.featured ? 'featured' : 'regular'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}