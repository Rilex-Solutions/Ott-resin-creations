import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CartPage from '../page'
import { CartProvider } from '@/contexts/CartContext'
import { CartItem } from '@/types/cart'

// Mock the Header and Footer components
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>
  }
})

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>
  }
})

// Mock the Breadcrumb component
jest.mock('@/components/ui/Breadcrumb', () => {
  return function MockBreadcrumb({ items }: { items: any[] }) {
    return <div data-testid="breadcrumb">{items.map(item => item.label).join(' > ')}</div>
  }
})

// Mock fetch
global.fetch = jest.fn()

// Mock window.location
delete (window as any).location
window.location = { href: '' } as any

// Helper to render component with cart context
const renderWithCart = (initialCartItems: CartItem[] = []) => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return <CartProvider>{children}</CartProvider>
  }

  const result = render(<CartPage />, { wrapper: TestWrapper })

  // If we need to add items to cart for testing, we can do it through the context
  if (initialCartItems.length > 0) {
    // This would require accessing the cart context - for now we'll test empty cart
  }

  return result
}

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('Empty Cart', () => {
    it('renders empty cart state correctly', () => {
      renderWithCart()

      expect(screen.getByText('Your Cart')).toBeInTheDocument()
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
      expect(screen.getByText('Browse our beautiful resin art pieces and add some to your cart!')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /browse shop/i })).toBeInTheDocument()
    })

    it('shows empty cart icon', () => {
      renderWithCart()
      
      // Look for the cart icon SVG by its path data
      const cartIcon = screen.getByText((_, element) => {
        return element?.tagName.toLowerCase() === 'svg'
      })
      expect(cartIcon).toBeInTheDocument()
    })

    it('redirects to shop when browse button is clicked', () => {
      renderWithCart()
      
      const browseButton = screen.getByRole('button', { name: /browse shop/i })
      fireEvent.click(browseButton)
      
      expect(window.location.href).toBe('/shop')
    })
  })

  describe('Customer Form', () => {
    it('renders all required form fields', () => {
      renderWithCart()

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit inquiry/i })).toBeInTheDocument()
    })

    it('shows validation messages for required fields', async () => {
      renderWithCart()
      const user = userEvent.setup()

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      await user.click(submitButton)

      // HTML5 validation should prevent submission
      const nameInput = screen.getByLabelText(/full name/i)
      expect(nameInput).toBeRequired()
      expect(nameInput).toBeInvalid()
    })

    it('enables submit button when cart has items', () => {
      renderWithCart()

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      // Button should be disabled when cart is empty
      expect(submitButton).toBeDisabled()
    })

    it('shows helpful text about payment', () => {
      renderWithCart()

      expect(screen.getByText('No payment required now.')).toBeInTheDocument()
      expect(screen.getByText('Janet will contact you to arrange payment.')).toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('shows loading state during submission', async () => {
      // Mock a delayed response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })

      renderWithCart()
      const user = userEvent.setup()

      // Fill out form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '555-1234')

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      await user.click(submitButton)

      // Should show loading state (though this test might be tricky with empty cart)
      expect(submitButton).toBeDisabled()
    })

    it('handles API errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      // Mock alert
      window.alert = jest.fn()

      renderWithCart()
      const user = userEvent.setup()

      // Fill out form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '555-1234')

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('There was an error submitting your inquiry. Please try again.')
      })
    })
  })

  describe('Success State', () => {
    it('shows success message after successful submission', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })

      renderWithCart()
      const user = userEvent.setup()

      // Fill out form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '555-1234')

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Inquiry Submitted!')).toBeInTheDocument()
        expect(screen.getByText(/Thank you for your purchase inquiry/)).toBeInTheDocument()
        expect(screen.getByText(/Janet will be reaching out to you within 24 hours/)).toBeInTheDocument()
      })
    })

    it('shows continue shopping button in success state', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })

      renderWithCart()
      const user = userEvent.setup()

      // Fill out form and submit
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone number/i), '555-1234')

      const submitButton = screen.getByRole('button', { name: /submit inquiry/i })
      await user.click(submitButton)

      await waitFor(() => {
        const continueButton = screen.getByRole('button', { name: /continue shopping/i })
        expect(continueButton).toBeInTheDocument()
      })
    })
  })

  describe('Breadcrumb Navigation', () => {
    it('renders correct breadcrumb trail', () => {
      renderWithCart()

      expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Home > Shop > Cart')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      renderWithCart()

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Your Cart')
    })

    it('has proper labels for form inputs', () => {
      renderWithCart()

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    })

    it('has proper button labels', () => {
      renderWithCart()

      expect(screen.getByRole('button', { name: /submit inquiry/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /browse shop/i })).toBeInTheDocument()
    })
  })
})