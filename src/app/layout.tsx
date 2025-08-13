import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Huberduberkid Resin Creations - Custom Resin Art & Functional Pieces',
  description: 'Handcrafted custom resin art, coasters, trays, and functional pieces. Each piece uniquely designed and crafted with care.',
  keywords: 'resin art, custom resin, epoxy art, handmade coasters, resin trays, functional art',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}