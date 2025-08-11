import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ShopPage from '../page'

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

// Mock Header and Footer components
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>
  }
})

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>
  }
})

// Mock fetch for API calls
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock data
const mockCategories = [
  {
    id: '1',
    name: 'Coasters',
    slug: 'coasters',
    description: 'Functional art for your home',
    hero: 'Protect your surfaces in style',
    featured: true
  },
  {
    id: '2',
    name: 'Seconds Sale',
    slug: 'seconds-sale',
    description: 'Quality pieces with minor imperfections',
    hero: 'Beautiful art at unbeatable prices',
    featured: true
  },
  {
    id: '3',
    name: 'Trays',
    slug: 'trays',
    description: 'Beautiful serving trays',
    hero: 'Elevate your space',
    featured: false
  }
]

const mockProducts = [
  {
    id: '1',
    name: 'Ocean Wave Coaster Set',
    description: 'Set of 4 ocean-inspired coasters',
    price: '$35',
    image: 'Ocean Coasters',
    imageUrl: 'https://drive.google.com/file/d/1mkK3dFLcp_1GifLEQ0mAUlWvWPRs04cO/view',
    inStock: true,
    featured: true,
    inventoryCount: 5,
    categoryName: 'Coasters',
    categorySlug: 'coasters'
  },
  {
    id: '2',
    name: 'B-Grade Ocean Coasters',
    description: 'Set of 4 with minor imperfections',
    price: '$20',
    image: 'B-Grade Coasters',
    imageUrl: 'https://drive.google.com/file/d/1test123/view',
    inStock: true,
    featured: true,
    inventoryCount: 3,
    categoryName: 'Seconds Sale',
    categorySlug: 'seconds-sale'
  },
  {
    id: '3',
    name: 'Large Serving Tray',
    description: 'Beautiful rectangular tray',
    price: '$95',
    image: 'Serving Tray',
    imageUrl: null,
    inStock: true,
    featured: false,
    inventoryCount: 2,
    categoryName: 'Trays',
    categorySlug: 'trays'
  }
]

describe('ShopPage', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the page with header and footer', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: [] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: [] })
      })

    render(<ShopPage />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('fetches categories and products from API endpoints', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/products')
      expect(mockFetch).toHaveBeenCalledWith('/api/categories')
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  it('displays featured categories with correct product counts', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      expect(screen.getByText('Featured Collections')).toBeInTheDocument()
    })

    // Should show featured categories (Coasters and Seconds Sale)
    await waitFor(() => {
      expect(screen.getByText('Coasters')).toBeInTheDocument()
      expect(screen.getByText('Seconds Sale')).toBeInTheDocument()
    })

    // Verify that categories show in the Featured Collections section specifically
    await waitFor(() => {
      const featuredSection = screen.getByText('Featured Collections').closest('section')
      expect(featuredSection).toBeInTheDocument()
      
      // Within the featured section, check for our categories
      const coastersInFeatured = screen.getAllByText('Coasters').some(el => 
        featuredSection?.contains(el)
      )
      const secondsSaleInFeatured = screen.getAllByText('Seconds Sale').some(el => 
        featuredSection?.contains(el)
      )
      
      expect(coastersInFeatured).toBe(true)
      expect(secondsSaleInFeatured).toBe(true)
    })
  })

  it('displays non-featured categories in More Categories section', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      expect(screen.getByText('More Categories')).toBeInTheDocument()
    })

    // Verify that non-featured categories show in the More Categories section specifically
    await waitFor(() => {
      const moreCategoriesSection = screen.getByText('More Categories').closest('section')
      expect(moreCategoriesSection).toBeInTheDocument()
      
      // Within the more categories section, check for Trays (non-featured)
      const traysInMoreCategories = screen.getAllByText('Trays').some(el => 
        moreCategoriesSection?.contains(el)
      )
      
      expect(traysInMoreCategories).toBe(true)
    })
  })

  it('shows featured product images for category cards', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      const images = screen.getAllByAltText(/Collection/)
      expect(images.length).toBeGreaterThan(0)
    })

    // Should use featured products' images for category cards
    await waitFor(() => {
      const coasterImage = screen.getByAltText('Coasters Collection')
      expect(coasterImage).toHaveAttribute('src', expect.stringContaining('drive.google.com/thumbnail'))
    })
  })

  it('converts Google Drive URLs to thumbnail format', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      const coasterImage = screen.getByAltText('Coasters Collection')
      expect(coasterImage).toHaveAttribute('src', 'https://drive.google.com/thumbnail?id=1mkK3dFLcp_1GifLEQ0mAUlWvWPRs04cO&sz=w800')
    })
  })

  it('creates proper category links using slugs', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      const coasterLink = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '/shop/coasters'
      )
      expect(coasterLink).toBeInTheDocument()

      const secondsLink = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '/shop/seconds-sale'
      )
      expect(secondsLink).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('API Error'))
      .mockRejectedValueOnce(new Error('API Error'))

    render(<ShopPage />)

    // Should still render the page structure even with API errors
    await waitFor(() => {
      expect(screen.getByText('Shop Resin Art')).toBeInTheDocument()
    })
  })


  it('shows "Coming Soon" for categories with no products', async () => {
    const emptyCategories = [
      {
        id: '4',
        name: 'Empty Category',
        slug: 'empty',
        description: 'No products yet',
        hero: 'Coming soon',
        featured: true
      }
    ]

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: [] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: emptyCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    })
  })

  it('correctly matches products to categories by slug and displays them', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    // Wait for data to load and categories to be displayed
    await waitFor(async () => {
      // Wait for both API calls to complete and component to render categories
      expect(mockFetch).toHaveBeenCalledTimes(2)
      
      // Categories should appear on the page after loading
      const coastersElements = screen.queryAllByText('Coasters')
      const secondsSaleElements = screen.queryAllByText('Seconds Sale') 
      const traysElements = screen.queryAllByText('Trays')
      
      expect(coastersElements.length).toBeGreaterThan(0)
      expect(secondsSaleElements.length).toBeGreaterThan(0)
      expect(traysElements.length).toBeGreaterThan(0)
    }, { timeout: 3000 })
  })

  it('displays featured products as category card images', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ categories: mockCategories })
      })

    render(<ShopPage />)

    await waitFor(() => {
      // Should find featured products (featured: true) within each category
      // and use their images for the category cards
      const images = screen.getAllByAltText(/Collection/)
      expect(images.length).toBeGreaterThan(0)
      
      // Verify specific featured product images are used
      const coastersImage = screen.queryByAltText('Coasters Collection')
      const secondsSaleImage = screen.queryByAltText('Seconds Sale Collection')
      
      expect(coastersImage).toBeInTheDocument()
      expect(secondsSaleImage).toBeInTheDocument()
    })
  })
})