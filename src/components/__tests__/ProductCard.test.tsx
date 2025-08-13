import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../ProductCard'
import { CartProvider } from '@/contexts/CartContext'

// Mock the cart context for isolated testing
const mockAddToCart = jest.fn()
const mockIsInCart = jest.fn()

jest.mock('@/contexts/CartContext', () => ({
  ...jest.requireActual('@/contexts/CartContext'),
  useCart: () => ({
    addToCart: mockAddToCart,
    isInCart: mockIsInCart,
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    cart: { items: [], itemCount: 0, total: 0 }
  })
}))

const mockProduct = {
  id: 'test-product-1',
  name: 'Beautiful Resin Coaster',
  price: '$25.99',
  description: 'A stunning handcrafted resin coaster with swirling blue and gold patterns.',
  image: 'Coaster Image',
  imageUrl: 'https://drive.google.com/file/d/test123/view',
  inStock: true,
  featured: false,
  inventoryCount: 5
}

const mockOutOfStockProduct = {
  ...mockProduct,
  id: 'test-product-2',
  name: 'Out of Stock Item',
  inStock: false
}

const mockFeaturedProduct = {
  ...mockProduct,
  id: 'test-product-3',
  name: 'Featured Item',
  featured: true
}

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockIsInCart.mockReturnValue(false)
  })

  describe('Featured Variant', () => {
    it('renders featured product card correctly', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      expect(screen.getByText('Beautiful Resin Coaster')).toBeInTheDocument()
      expect(screen.getByText('$25.99')).toBeInTheDocument()
      expect(screen.getByText('A stunning handcrafted resin coaster with swirling blue and gold patterns.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    })

    it('shows featured badge for featured products', () => {
      render(<ProductCard product={mockFeaturedProduct} variant="featured" />)

      expect(screen.getByText('Featured')).toBeInTheDocument()
    })

    it('shows larger layout for featured variant', () => {
      const { container } = render(<ProductCard product={mockProduct} variant="featured" />)

      const productName = screen.getByText('Beautiful Resin Coaster')
      expect(productName).toHaveClass('text-xl')
      
      const price = screen.getByText('$25.99')
      expect(price).toHaveClass('text-2xl')
    })
  })

  describe('Regular Variant', () => {
    it('renders regular product card correctly', () => {
      render(<ProductCard product={mockProduct} variant="regular" />)

      expect(screen.getByText('Beautiful Resin Coaster')).toBeInTheDocument()
      expect(screen.getByText('$25.99')).toBeInTheDocument()
      expect(screen.getByText('A stunning handcrafted resin coaster with swirling blue and gold patterns.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    })

    it('shows compact layout for regular variant', () => {
      const { container } = render(<ProductCard product={mockProduct} variant="regular" />)

      const productName = screen.getByText('Beautiful Resin Coaster')
      expect(productName).toHaveClass('text-lg')
      
      const price = screen.getByText('$25.99')
      expect(price).toHaveClass('text-lg')
    })

    it('does not show featured badge for non-featured products', () => {
      render(<ProductCard product={mockProduct} variant="regular" />)

      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    })
  })

  describe('Add to Cart Functionality', () => {
    it('calls addToCart when button is clicked', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      const addButton = screen.getByRole('button', { name: /add to cart/i })
      fireEvent.click(addButton)

      expect(mockAddToCart).toHaveBeenCalledWith({
        productId: 'test-product-1',
        name: 'Beautiful Resin Coaster',
        price: 25.99,
        description: 'A stunning handcrafted resin coaster with swirling blue and gold patterns.',
        imageUrl: expect.any(String) // Will be processed by getDirectImageUrl
      })
    })

    it('shows "In Cart" when item is already in cart', () => {
      mockIsInCart.mockReturnValue(true)
      
      render(<ProductCard product={mockProduct} variant="featured" />)

      expect(screen.getByRole('button', { name: /in cart/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument()
    })

    it('disables button when item is in cart', () => {
      mockIsInCart.mockReturnValue(true)
      
      render(<ProductCard product={mockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /in cart/i })
      expect(button).toBeDisabled()
    })

    it('shows green styling when item is in cart', () => {
      mockIsInCart.mockReturnValue(true)
      
      render(<ProductCard product={mockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /in cart/i })
      expect(button).toHaveClass('bg-green-600')
    })
  })

  describe('Out of Stock Handling', () => {
    it('shows out of stock overlay', () => {
      render(<ProductCard product={mockOutOfStockProduct} variant="featured" />)

      expect(screen.getAllByText('Out of Stock')).toHaveLength(2) // One in overlay, one in button
    })

    it('disables add to cart button when out of stock', () => {
      render(<ProductCard product={mockOutOfStockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /out of stock/i })
      expect(button).toBeDisabled()
    })

    it('shows disabled styling for out of stock button', () => {
      render(<ProductCard product={mockOutOfStockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /out of stock/i })
      expect(button).toHaveClass('bg-gray-300', 'text-gray-500', 'cursor-not-allowed')
    })

    it('does not call addToCart when out of stock button is clicked', () => {
      render(<ProductCard product={mockOutOfStockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /out of stock/i })
      fireEvent.click(button)

      expect(mockAddToCart).not.toHaveBeenCalled()
    })
  })

  describe('Image Handling', () => {
    it('renders image when imageUrl is provided', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      const image = screen.getByRole('img', { name: 'Beautiful Resin Coaster' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Beautiful Resin Coaster')
    })

    it('shows fallback text when no imageUrl is provided', () => {
      const productWithoutImage = { ...mockProduct, imageUrl: null }
      render(<ProductCard product={productWithoutImage} variant="featured" />)

      expect(screen.getByText('Coaster Image')).toBeInTheDocument()
    })

    it('handles image load errors', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      const image = screen.getByRole('img', { name: 'Beautiful Resin Coaster' })
      
      // Simulate image error
      fireEvent.error(image)

      // Image should be hidden and fallback text should be shown
      expect(image).toHaveStyle({ display: 'none' })
    })
  })

  describe('Price Parsing', () => {
    it('correctly parses price with dollar sign', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      const addButton = screen.getByRole('button', { name: /add to cart/i })
      fireEvent.click(addButton)

      expect(mockAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          price: 25.99
        })
      )
    })

    it('handles different price formats', () => {
      const productWithCommaPrice = { ...mockProduct, price: '$1,299.99' }
      render(<ProductCard product={productWithCommaPrice} variant="featured" />)

      const addButton = screen.getByRole('button', { name: /add to cart/i })
      fireEvent.click(addButton)

      expect(mockAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          price: 1299.99
        })
      )
    })
  })

  describe('Accessibility', () => {
    it('has proper button labels', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    })

    it('has proper image alt text', () => {
      render(<ProductCard product={mockProduct} variant="featured" />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Beautiful Resin Coaster')
    })

    it('maintains button accessibility when disabled', () => {
      render(<ProductCard product={mockOutOfStockProduct} variant="featured" />)

      const button = screen.getByRole('button', { name: /out of stock/i })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('disabled')
    })
  })
})