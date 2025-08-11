import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddProductPage from '../page'

// Mock the constants imports
jest.mock('@/constants/colors', () => ({
  colorCombinations: {
    form: {
      label: 'text-gray-800',
      input: 'border-gray-300',
      successBox: 'bg-green-100',
      errorText: 'text-red-600',
      helperText: 'text-gray-500',
      sectionBackground: 'bg-white'
    },
    primaryButton: {
      full: 'bg-blue-600 text-white hover:bg-blue-700'
    }
  }
}))

jest.mock('@/constants/styles', () => ({
  styleCombinations: {
    formContainer: 'max-w-2xl mx-auto p-6',
    formSection: 'bg-white rounded-lg shadow-md p-8',
    formGroup: 'space-y-6',
    fieldLabel: 'block text-sm font-medium mb-2',
    inputField: 'w-full px-4 py-2 border rounded-lg',
    textareaField: 'w-full px-4 py-2 border rounded-lg',
    formGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    formSuccessBox: 'border rounded-lg p-4'
  }
}))

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('AddProductPage', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('Component Rendering', () => {
    it('renders the form with all required fields', async () => {
      // Mock categories API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          categories: [
            { slug: 'coasters', name: 'Coasters' },
            { slug: 'trinket-dish', name: 'Trinket Dish' },
            { slug: 'seconds-sale', name: 'Seconds Sale' }
          ]
        })
      } as Response)

      await act(async () => {
        render(<AddProductPage />)
      })

      expect(screen.getByText('Add New Product')).toBeInTheDocument()
      expect(screen.getByLabelText(/product name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^description/i)).toBeInTheDocument() // More specific
      expect(screen.getByLabelText(/inventory count/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/in stock/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/featured product/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument()
    })

    it('loads and displays categories from API', async () => {
      const mockCategories = [
        { slug: 'coasters', name: 'Coasters' },
        { slug: 'trinket-dish', name: 'Trinket Dish' },
        { slug: 'seconds-sale', name: 'Seconds Sale' }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ categories: mockCategories })
      } as Response)

      await act(async () => {
        render(<AddProductPage />)
      })

      await waitFor(() => {
        expect(screen.getByText('Select a category')).toBeInTheDocument()
        expect(screen.getByText('Coasters')).toBeInTheDocument()
        expect(screen.getByText('Trinket Dish')).toBeInTheDocument()
        expect(screen.getByText('Seconds Sale')).toBeInTheDocument()
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/categories')
    })
  })

  describe('Form Interactions', () => {
    beforeEach(async () => {
      // Mock categories API response for each test
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          categories: [
            { slug: 'coasters', name: 'Coasters' },
            { slug: 'trinket-dish', name: 'Trinket Dish' }
          ]
        })
      } as Response)
    })

    it('handles text input changes', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(<AddProductPage />)
      })

      const nameInput = screen.getByLabelText(/product name/i)
      await user.type(nameInput, 'Test Product')

      expect(nameInput).toHaveValue('Test Product')
    })

    it('handles select changes', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(<AddProductPage />)
      })

      // Wait for categories to load
      await waitFor(() => {
        expect(screen.getByText('Coasters')).toBeInTheDocument()
      })

      const categorySelect = screen.getByLabelText(/category/i)
      await user.selectOptions(categorySelect, 'coasters')

      expect(categorySelect).toHaveValue('coasters')
    })

    it('handles checkbox changes', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(<AddProductPage />)
      })

      const inStockCheckbox = screen.getByLabelText(/in stock/i)
      const featuredCheckbox = screen.getByLabelText(/featured product/i)

      expect(inStockCheckbox).toBeChecked()
      expect(featuredCheckbox).not.toBeChecked()

      await user.click(inStockCheckbox)
      await user.click(featuredCheckbox)

      expect(inStockCheckbox).not.toBeChecked()
      expect(featuredCheckbox).toBeChecked()
    })
  })

  describe('Form Submission', () => {
    it('submits form successfully', async () => {
      const user = userEvent.setup()
      
      // Mock categories API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          categories: [{ slug: 'coasters', name: 'Coasters' }]
        })
      } as Response)

      // Mock successful product creation
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      } as Response)

      await act(async () => {
        render(<AddProductPage />)
      })

      // Wait for categories to load
      await waitFor(() => {
        expect(screen.getByText('Coasters')).toBeInTheDocument()
      })

      // Fill out the form
      await user.type(screen.getByLabelText(/product name/i), 'Test Product')
      await user.selectOptions(screen.getByLabelText(/category/i), 'coasters')
      await user.type(screen.getByLabelText(/price/i), '25.99')
      await user.type(screen.getByLabelText(/^description/i), 'Test description')

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /add product/i })
      
      await act(async () => {
        await user.click(submitButton)
      })

      // Check success message appears
      await waitFor(() => {
        expect(screen.getByText('Product added successfully!')).toBeInTheDocument()
      })
    })

    it('handles form submission errors', async () => {
      const user = userEvent.setup()
      
      // Mock categories API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          categories: [{ slug: 'coasters', name: 'Coasters' }]
        })
      } as Response)

      // Mock failed product creation
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, error: 'Database error' })
      } as Response)

      await act(async () => {
        render(<AddProductPage />)
      })

      // Wait for categories to load
      await waitFor(() => {
        expect(screen.getByText('Coasters')).toBeInTheDocument()
      })

      // Fill out required fields
      await user.type(screen.getByLabelText(/product name/i), 'Test Product')
      await user.selectOptions(screen.getByLabelText(/category/i), 'coasters')
      await user.type(screen.getByLabelText(/price/i), '25.99')
      await user.type(screen.getByLabelText(/^description/i), 'Test description')

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /add product/i })
      
      await act(async () => {
        await user.click(submitButton)
      })

      // Check error message appears
      await waitFor(() => {
        expect(screen.getByText('Error adding product. Please try again.')).toBeInTheDocument()
      })
    })
  })

  describe('Categories API', () => {
    it('handles categories fetch error gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await act(async () => {
        render(<AddProductPage />)
      })

      await waitFor(() => {
        // Should still render the form
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      })
    })

    it('verifies categories are fetched on component mount', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          categories: [
            { slug: 'trinket-dish', name: 'Trinket Dish' },
            { slug: 'seconds-sale', name: 'Seconds Sale' }
          ]
        })
      } as Response)

      await act(async () => {
        render(<AddProductPage />)
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/categories')
      
      await waitFor(() => {
        expect(screen.getByText('Trinket Dish')).toBeInTheDocument()
        expect(screen.getByText('Seconds Sale')).toBeInTheDocument()
      })
    })
  })
})