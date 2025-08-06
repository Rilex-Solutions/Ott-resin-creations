import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const categories = [
  {
    id: 'coasters',
    name: 'Coasters',
    description: 'Functional art for your home - custom resin coasters in various designs',
    image: 'Coaster Collection',
    itemCount: '15+ designs',
    priceRange: '$30 - $40',
    featured: true
  },
  {
    id: 'trays',
    name: 'Trays',
    description: 'Beautiful serving and decorative trays for your home',
    image: 'Tray Collection',
    itemCount: '12+ styles',
    priceRange: '$75 - $95',
    featured: true
  },
  {
    id: 'dragons',
    name: 'Dragons',
    description: 'Mystical dragon-themed resin art pieces and collectibles',
    image: 'Dragon Collection',
    itemCount: '10+ pieces',
    priceRange: '$42 - $65',
    featured: true
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    description: 'Decorative resin pieces to beautify your living space',
    image: 'Home Decor Collection',
    itemCount: '20+ items',
    priceRange: '$55 - $120',
    featured: true
  },
  {
    id: 'phone-stands',
    name: 'Phone Stands',
    description: 'Functional and beautiful phone stands for your desk or nightstand',
    image: 'Phone Stand Collection',
    itemCount: '8+ designs',
    priceRange: '$25 - $32',
    featured: false
  },
  {
    id: 'spooky',
    name: 'Spooky',
    description: 'Halloween and gothic-themed resin art for those who love the macabre',
    image: 'Spooky Collection',
    itemCount: '12+ pieces',
    priceRange: '$35 - $55',
    featured: false
  },
  {
    id: 'tea-lights',
    name: 'Tea Lights',
    description: 'Atmospheric tea light holders that create beautiful ambient lighting',
    image: 'Tea Light Collection',
    itemCount: '10+ holders',
    priceRange: '$20 - $25',
    featured: false
  },
  {
    id: 'bookmarks',
    name: 'Bookmarks',
    description: 'Beautiful resin bookmarks for book lovers with embedded designs and colors',
    image: 'Bookmark Collection',
    itemCount: '15+ designs',
    priceRange: '$20 - $25',
    featured: false
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Unique resin earrings in various styles and colors',
    image: 'Earring Collection',
    itemCount: '18+ pairs',
    priceRange: '$22 - $32',
    featured: false
  },
  {
    id: 'teddy-bears',
    name: 'Teddy Bears',
    description: 'Adorable resin teddy bear figurines and accessories',
    image: 'Teddy Bear Collection',
    itemCount: '8+ bears',
    priceRange: '$40 - $45',
    featured: false
  },
  {
    id: 'celestial',
    name: 'Celestial',
    description: 'Moon, stars, and cosmic-themed resin art pieces',
    image: 'Celestial Collection',
    itemCount: '12+ pieces',
    priceRange: '$55 - $85',
    featured: true
  },
  {
    id: 'dream-catchers',
    name: 'Dream Catchers',
    description: 'Mystical dream catchers with resin elements and natural materials',
    image: 'Dream Catcher Collection',
    itemCount: '6+ catchers',
    priceRange: '$52 - $60',
    featured: false
  },
  {
    id: 'seconds-sale',
    name: 'Seconds Sale',
    description: 'Quality pieces with minor imperfections at discounted prices',
    image: 'Sale Collection',
    itemCount: 'Limited stock',
    priceRange: '$15 - $45',
    featured: true
  },
  {
    id: 'memory-pieces',
    name: 'Memory Pieces',
    description: 'Preserve precious memories in beautiful resin keepsakes',
    image: 'Memory Collection',
    itemCount: '8+ pieces',
    priceRange: '$55 - $75',
    featured: true
  },
  {
    id: 'ornaments',
    name: 'Ornaments',
    description: 'Holiday and decorative ornaments for year-round celebration',
    image: 'Ornament Collection',
    itemCount: '12+ ornaments',
    priceRange: '$18 - $28',
    featured: false
  },
  {
    id: 'keychains',
    name: 'Keychains',
    description: 'Perfect gifts and personal accessories with custom colors and designs',
    image: 'Keychain Collection',
    itemCount: '20+ designs',
    priceRange: '$12 - $18',
    featured: false
  },
  {
    id: 'games',
    name: 'Games',
    description: 'Fun resin game pieces and board game accessories',
    image: 'Gaming Collection',
    itemCount: '15+ items',
    priceRange: '$25 - $120',
    featured: false
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Beautiful resin pendant necklaces and statement pieces',
    image: 'Necklace Collection',
    itemCount: '18+ pieces',
    priceRange: '$42 - $55',
    featured: false
  },
  {
    id: 'skulls',
    name: 'Skulls',
    description: 'Gothic and anatomical skull-themed resin art pieces',
    image: 'Skull Collection',
    itemCount: '8+ pieces',
    priceRange: '$45 - $85',
    featured: false
  },
  {
    id: 'magnets',
    name: 'Magnets',
    description: 'Functional and decorative resin magnets for your fridge or office',
    image: 'Magnet Collection',
    itemCount: '15+ sets',
    priceRange: '$18 - $25',
    featured: false
  },
  {
    id: 'recreational',
    name: 'Recreational',
    description: 'Fun and playful resin items for leisure and entertainment',
    image: 'Recreational Collection',
    itemCount: '10+ items',
    priceRange: '$28 - $65',
    featured: false
  },
  {
    id: 'hanging-items',
    name: 'Hanging Items',
    description: 'Decorative pieces designed to hang and catch the light',
    image: 'Hanging Collection',
    itemCount: '12+ pieces',
    priceRange: '$35 - $75',
    featured: false
  },
  {
    id: 'custom-orders',
    name: 'Custom Orders',
    description: 'Work directly with the artist to create completely personalized pieces',
    image: 'Custom Work',
    itemCount: 'Unlimited',
    priceRange: 'From $40',
    featured: true
  }
]

export default function ShopPage() {
  const featuredCategories = categories.filter(cat => cat.featured)
  const otherCategories = categories.filter(cat => !cat.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shop Resin Art
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our collection of handcrafted resin art pieces. Each category offers 
              unique designs that blend functionality with artistic beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#featured" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Categories
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section id="featured" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Collections</h2>
              <p className="text-lg text-gray-600">Our most popular and signature pieces</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/shop/${category.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300"></div>
                    <span className="text-gray-700 font-medium text-lg z-10">{category.image}</span>
                    {category.featured && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-600 font-semibold">{category.itemCount}</span>
                      <span className="text-gray-500">{category.priceRange}</span>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>Shop Now</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">More Categories</h2>
              <p className="text-lg text-gray-600">Explore our complete range of resin art pieces</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherCategories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/shop/${category.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-blue-200/50 group-hover:from-purple-300/60 group-hover:to-blue-300/60 transition-all duration-300"></div>
                    <span className="text-gray-700 font-medium text-sm z-10 text-center px-2">{category.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-600 font-medium">{category.itemCount}</span>
                      <span className="text-gray-500">{category.priceRange}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Resin Art?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handcrafted Quality</h3>
                <p className="text-gray-600">Each piece is individually made with premium materials and attention to detail</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Options</h3>
                <p className="text-gray-600">Many items can be customized with your choice of colors and designs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
                <p className="text-gray-600">Every piece is created with passion and care in our dedicated studio</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something custom just for you. Every piece tells a story - what's yours?
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Request Custom Piece
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}