'use client'

import { useState } from 'react'
import { colorCombinations } from '@/constants/colors'
import { styleCombinations } from '@/constants/styles'

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

const categories = [
  { slug: 'coasters', name: 'Coasters' },
  { slug: 'trays', name: 'Trays' },
  { slug: 'dragons', name: 'Dragons' },
  { slug: 'home-decor', name: 'Home Decor' },
  { slug: 'phone-stands', name: 'Phone Stands' },
  { slug: 'spooky', name: 'Spooky' },
  { slug: 'tea-lights', name: 'Tea Lights' },
  { slug: 'bookmarks', name: 'Bookmarks' },
  { slug: 'earrings', name: 'Earrings' },
  { slug: 'teddy-bears', name: 'Teddy Bears' },
  { slug: 'celestial', name: 'Celestial' },
  { slug: 'dream-catchers', name: 'Dream Catchers' },
  { slug: 'memory-pieces', name: 'Memory Pieces' },
  { slug: 'ornaments', name: 'Ornaments' },
  { slug: 'keychains', name: 'Keychains' },
  { slug: 'games', name: 'Games' },
  { slug: 'necklaces', name: 'Necklaces' },
  { slug: 'skulls', name: 'Skulls' },
  { slug: 'magnets', name: 'Magnets' },
  { slug: 'recreational', name: 'Recreational' },
  { slug: 'hanging-items', name: 'Hanging Items' }
]

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  categorySlug: 'coasters',
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
    <div className="min-h-screen bg-[#FEFBFD] py-8">
      <div className={styleCombinations.formContainer}>
        <h1 className={`text-3xl font-bold mb-8 text-center ${colorCombinations.form.label}`}>
          Add New Product
        </h1>

        {submitStatus === 'success' && (
          <div className={`${styleCombinations.formSuccessBox} ${colorCombinations.form.successBox} mb-6`}>
            <p className="text-lg font-semibold">Product added successfully!</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-[#FFE5E5] border border-[#FF8A80] rounded-lg p-4 mb-6">
            <p className={`font-semibold ${colorCombinations.form.errorText}`}>
              Error adding product. Please try again.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${styleCombinations.formSection} ${colorCombinations.form.sectionBackground}`}>
          <div className={styleCombinations.formGroup}>
            {/* Product Name */}
            <div>
              <label htmlFor="name" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="e.g., Ocean Wave Coaster Set"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categorySlug" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Category *
              </label>
              <select
                id="categorySlug"
                name="categorySlug"
                value={formData.categorySlug}
                onChange={handleInputChange}
                required
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
              >
                {categories.map(category => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Price *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="e.g., $35"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className={`${styleCombinations.textareaField} ${colorCombinations.form.input}`}
                placeholder="Detailed description of the product..."
              />
            </div>

            {/* Image Description */}
            <div>
              <label htmlFor="image" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Image Description
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="e.g., Ocean Wave Coasters (fallback text if image fails)"
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                placeholder="https://example.com/image.jpg (direct image URL works best)"
              />
              <p className={`text-xs mt-1 ${colorCombinations.form.helperText}`}>
                <strong>Best options:</strong> Direct image URLs (.jpg, .png, etc.) or Google Drive links.<br/>
                <strong>Note:</strong> Google Photos URLs may be rate-limited. Consider using Google Drive or other image hosting services.
              </p>
            </div>

            {/* Stock and Featured */}
            <div className={styleCombinations.formGrid}>
              <div>
                <label htmlFor="inventoryCount" className={`${styleCombinations.fieldLabel} ${colorCombinations.form.label}`}>
                  Inventory Count
                </label>
                <input
                  type="number"
                  id="inventoryCount"
                  name="inventoryCount"
                  value={formData.inventoryCount}
                  onChange={handleInputChange}
                  min="0"
                  className={`${styleCombinations.inputField} ${colorCombinations.form.input}`}
                />
              </div>

              <div className="flex items-center space-x-6 pt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4"
                  />
                  <span className={`text-sm font-medium ${colorCombinations.form.label}`}>
                    In Stock
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4"
                  />
                  <span className={`text-sm font-medium ${colorCombinations.form.label}`}>
                    Featured Product
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`${colorCombinations.primaryButton.full} px-8 py-4 rounded-lg text-lg font-bold ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}