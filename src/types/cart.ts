export interface CartItem {
  productId: string
  name: string
  price: number
  description: string
  imageUrl: string | null
}

export interface CartState {
  items: CartItem[]
  itemCount: number
  total: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

export interface CartInquiry {
  customer: CustomerInfo
  items: CartItem[]
  total: number
  timestamp: string
}