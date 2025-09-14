'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './edit-product.module.scss'

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

interface Category {
  slug: string
  name: string
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

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product and categories in parallel
        const [productResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/products/${params.id}`),
          fetch('/api/categories')
        ])

        if (productResponse.ok) {
          const productData = await productResponse.json()
          if (productData.product) {
            const product = productData.product
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
          }
        } else {
          setSubmitStatus('error')
        }

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          if (categoriesData.categories) {
            setCategories(categoriesData.categories)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setSubmitStatus('error')
      } finally {
        setIsLoading(false)
        setCategoriesLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Format price to include $ if not already included
      const formattedData = {
        ...formData,
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`
      }

      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } else {
        setSubmitStatus('error')
        console.error('Error response:', result)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Fetch error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1>
            Edit Product
          </h1>
          <Link
            href="/admin/products"
            className={styles.backButton}
          >
            ← Back to Products
          </Link>
        </div>

        {submitStatus === 'success' && (
          <div className={styles.successBox}>
            <p>Product updated successfully! Redirecting...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={styles.errorBox}>
            <p>
              Error updating product. Please try again.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
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
                className={styles.inputField}
                placeholder="e.g., Ocean Wave Coaster Set"
              />
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
                className={styles.selectField}
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
                className={styles.inputField}
                placeholder="e.g., $35"
              />
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
                className={styles.textareaField}
                placeholder="Detailed description of the product..."
              />
            </div>

            {/* Image Description */}
            <div className={styles.fieldGroup}>
              <label htmlFor="image" className={styles.fieldLabel}>
                Image Description
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="e.g., Ocean Wave Coasters (fallback text if image fails)"
              />
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
                className={styles.inputField}
                placeholder="https://example.com/image.jpg (direct image URL works best)"
              />
              {formData.imageUrl && (
                <div className={styles.imagePreview}>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Stock and Featured */}
            <div className={styles.gridFields}>
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
                  className={styles.inputField}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                  />
                  <span>
                    In Stock
                  </span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>
                    Featured Product
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className={styles.submitSection}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Updating Product...' : 'Update Product'}
              </button>
              <Link
                href="/admin/products"
                className={styles.cancelButton}
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}