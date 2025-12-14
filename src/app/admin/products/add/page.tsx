'use client'

import { useState, useEffect } from 'react'
import ProductPreview from '@/components/admin/ProductPreview'
import Link from 'next/link'
import styles from './add-product.module.scss'

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

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        if (data.categories) {
          // Sort categories alphabetically by name
          const sortedCategories = [...data.categories].sort((a, b) =>
            a.name.localeCompare(b.name)
          )
          setCategories(sortedCategories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

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


  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault()
    console.log('Button clicked! Function is running')
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      console.log('Submitting form data:', formData)
      
      // Format price to include $ if not already included
      const formattedData = {
        ...formData,
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`
      }
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      })
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)
      
      if (response.ok && result.success) {
        setSubmitStatus('success')
        setFormData(initialFormData)
        console.log('Product added successfully!')
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1>
            Add New Product
          </h1>
          <Link
            href="/admin/products"
            className={styles.backButton}
          >
            ← Back to Products
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className={styles.layout}>
          {/* Form Column */}
          <div className={styles.formColumn}>

            {submitStatus === 'success' && (
              <div className={styles.successBox}>
                <p>Product added successfully!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorBox}>
                <p>
                  Error adding product. Please try again.
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
                className={`${styles.inputField} ${
                  errors.name ? styles.error : ''
                }`}
                placeholder="e.g., Ocean Wave Coaster Set"
              />
              {errors.name && (
                <p className={styles.errorText}>{errors.name}</p>
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
              <p className={styles.helperText}>
                <strong>Best options:</strong> Direct image URLs (.jpg, .png, etc.) or Google Drive links.<br/>
                <strong>Note:</strong> Google Photos URLs may be rate-limited. Consider using Google Drive or other image hosting services.
              </p>
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

            {/* Submit Button */}
            <div className={styles.submitSection}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
              </div>
            </form>
          </div>

          {/* Preview Column */}
          <div className={styles.previewColumn}>
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
  )
}