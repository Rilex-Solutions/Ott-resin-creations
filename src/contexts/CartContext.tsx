'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CartItem, CartState } from '@/types/cart'

interface CartContextType {
  cart: CartState
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'ott-resin-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    itemCount: 0,
    total: 0
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const calculateCartTotals = (items: CartItem[]) => {
    const itemCount = items.length
    const total = items.reduce((sum, item) => sum + item.price, 0)
    return { itemCount, total }
  }

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists (shouldn't happen for unique pieces, but safety check)
      const existingItem = prevCart.items.find(cartItem => cartItem.productId === item.productId)
      if (existingItem) {
        return prevCart // Don't add duplicates
      }

      const newItems = [...prevCart.items, item]
      const { itemCount, total } = calculateCartTotals(newItems)
      
      return {
        items: newItems,
        itemCount,
        total
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.productId !== productId)
      const { itemCount, total } = calculateCartTotals(newItems)
      
      return {
        items: newItems,
        itemCount,
        total
      }
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      itemCount: 0,
      total: 0
    })
  }

  const isInCart = (productId: string) => {
    return cart.items.some(item => item.productId === productId)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}