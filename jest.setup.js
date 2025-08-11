import '@testing-library/jest-dom'

// Mock fetch globally for tests
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})