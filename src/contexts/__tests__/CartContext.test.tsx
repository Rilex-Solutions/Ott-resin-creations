import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CartProvider, useCart } from '../CartContext'
import { CartItem } from '@/types/cart'

// Test component to interact with cart context
function TestCartComponent() {
  const { cart, addToCart, removeFromCart, clearCart, isInCart } = useCart()

  const testItem: CartItem = {
    productId: 'test-1',
    name: 'Test Resin Coaster',
    price: 25.99,
    description: 'Beautiful test coaster',
    imageUrl: 'https://example.com/image.jpg'
  }

  const testItem2: CartItem = {
    productId: 'test-2', 
    name: 'Test Resin Tray',
    price: 45.50,
    description: 'Beautiful test tray',
    imageUrl: 'https://example.com/image2.jpg'
  }

  return (
    <div>
      <div data-testid="cart-count">{cart.itemCount}</div>
      <div data-testid="cart-total">${cart.total.toFixed(2)}</div>
      <div data-testid="cart-items">
        {cart.items.map(item => (
          <div key={item.productId} data-testid={`item-${item.productId}`}>
            {item.name} - ${item.price}
          </div>
        ))}
      </div>
      
      <button 
        data-testid="add-item-1" 
        onClick={() => addToCart(testItem)}
      >
        Add Item 1
      </button>
      
      <button 
        data-testid="add-item-2" 
        onClick={() => addToCart(testItem2)}
      >
        Add Item 2
      </button>
      
      <button 
        data-testid="remove-item-1" 
        onClick={() => removeFromCart('test-1')}
      >
        Remove Item 1
      </button>
      
      <button 
        data-testid="clear-cart" 
        onClick={clearCart}
      >
        Clear Cart
      </button>
      
      <div data-testid="item-1-in-cart">
        Item 1 in cart: {isInCart('test-1') ? 'Yes' : 'No'}
      </div>
      
      <div data-testid="item-2-in-cart">
        Item 2 in cart: {isInCart('test-2') ? 'Yes' : 'No'}
      </div>
    </div>
  )
}

// Helper to render component with cart provider
const renderWithCartProvider = () => {
  return render(
    <CartProvider>
      <TestCartComponent />
    </CartProvider>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('starts with empty cart', () => {
      renderWithCartProvider()

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: No')
      expect(screen.getByTestId('item-2-in-cart')).toHaveTextContent('Item 2 in cart: No')
    })
  })

  describe('Adding Items', () => {
    it('adds single item to cart correctly', () => {
      renderWithCartProvider()

      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$25.99')
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: Yes')
      expect(screen.getByTestId('item-test-1')).toHaveTextContent('Test Resin Coaster - $25.99')
    })

    it('adds multiple different items to cart', () => {
      renderWithCartProvider()

      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
        fireEvent.click(screen.getByTestId('add-item-2'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$71.49') // 25.99 + 45.50
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: Yes')
      expect(screen.getByTestId('item-2-in-cart')).toHaveTextContent('Item 2 in cart: Yes')
    })

    it('prevents duplicate items from being added', () => {
      renderWithCartProvider()

      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
        fireEvent.click(screen.getByTestId('add-item-1')) // Try to add same item again
      })

      // Should still only have 1 item
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$25.99')
    })
  })

  describe('Removing Items', () => {
    it('removes item from cart correctly', () => {
      renderWithCartProvider()

      // Add items first
      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
        fireEvent.click(screen.getByTestId('add-item-2'))
      })

      // Remove one item
      act(() => {
        fireEvent.click(screen.getByTestId('remove-item-1'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$45.50')
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: No')
      expect(screen.getByTestId('item-2-in-cart')).toHaveTextContent('Item 2 in cart: Yes')
    })

    it('handles removing non-existent item gracefully', () => {
      renderWithCartProvider()

      // Try to remove item that was never added
      act(() => {
        fireEvent.click(screen.getByTestId('remove-item-1'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    })
  })

  describe('Clearing Cart', () => {
    it('clears all items from cart', () => {
      renderWithCartProvider()

      // Add items first
      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
        fireEvent.click(screen.getByTestId('add-item-2'))
      })

      // Clear cart
      act(() => {
        fireEvent.click(screen.getByTestId('clear-cart'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: No')
      expect(screen.getByTestId('item-2-in-cart')).toHaveTextContent('Item 2 in cart: No')
    })
  })

  describe('Cart Calculations', () => {
    it('calculates total correctly with multiple items', () => {
      renderWithCartProvider()

      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1')) // $25.99
        fireEvent.click(screen.getByTestId('add-item-2')) // $45.50
      })

      expect(screen.getByTestId('cart-total')).toHaveTextContent('$71.49')
    })

    it('updates count correctly', () => {
      renderWithCartProvider()

      // Add 2 items
      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
        fireEvent.click(screen.getByTestId('add-item-2'))
      })
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')

      // Remove 1 item
      act(() => {
        fireEvent.click(screen.getByTestId('remove-item-1'))
      })
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    })
  })

  describe('localStorage Persistence', () => {
    it('saves cart to localStorage when items are added', () => {
      renderWithCartProvider()

      act(() => {
        fireEvent.click(screen.getByTestId('add-item-1'))
      })

      const savedCart = localStorage.getItem('ott-resin-cart')
      expect(savedCart).toBeTruthy()
      
      const parsedCart = JSON.parse(savedCart!)
      expect(parsedCart.itemCount).toBe(1)
      expect(parsedCart.total).toBe(25.99)
      expect(parsedCart.items).toHaveLength(1)
      expect(parsedCart.items[0].name).toBe('Test Resin Coaster')
    })

    it('loads cart from localStorage on mount', () => {
      // Pre-populate localStorage
      const testCart = {
        items: [{
          productId: 'test-1',
          name: 'Test Resin Coaster',
          price: 25.99,
          description: 'Beautiful test coaster',
          imageUrl: 'https://example.com/image.jpg'
        }],
        itemCount: 1,
        total: 25.99
      }
      localStorage.setItem('ott-resin-cart', JSON.stringify(testCart))

      renderWithCartProvider()

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$25.99')
      expect(screen.getByTestId('item-1-in-cart')).toHaveTextContent('Item 1 in cart: Yes')
    })

    it('handles corrupted localStorage data gracefully', () => {
      localStorage.setItem('ott-resin-cart', 'invalid-json')

      renderWithCartProvider()

      // Should start with empty cart if localStorage data is corrupted
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    })
  })

  describe('Error Handling', () => {
    it('throws error when useCart is used outside CartProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        render(<TestCartComponent />)
      }).toThrow('useCart must be used within a CartProvider')

      console.error = originalError
    })
  })
})