import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Custom Resin Art
                <span className="block text-blue-600">Made Just For You</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover unique, handcrafted resin pieces that blend artistry with functionality. 
                Each creation is custom-made to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/gallery" 
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Gallery
                </Link>
                <Link 
                  href="/shop/custom-orders" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Request Custom Piece
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Preview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Creations</h2>
              <p className="text-lg text-gray-600">A glimpse of our most popular resin art pieces</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Product Image {item}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Resin Piece {item}</h3>
                    <p className="text-gray-600 mb-4">Beautiful handcrafted resin art with unique design elements.</p>
                    <Link 
                      href={`/products/${item}`}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/products" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Art of Resin</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Every piece is meticulously crafted with high-quality epoxy resin, pigments, and artistic techniques 
                  that create stunning visual effects. From functional coasters to decorative art pieces, 
                  each creation tells its own unique story.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We work closely with each client to understand their vision and create something truly special. 
                  Whether it&rsquo;s matching your home decor or creating a meaningful gift, we&rsquo;re here to bring your ideas to life.
                </p>
                <Link 
                  href="/about" 
                  className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors"
                >
                  Learn More About Our Process →
                </Link>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-500">Artist at Work Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Something Beautiful?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let&rsquo;s discuss your custom resin art project. We&rsquo;ll work together to create a piece that&rsquo;s uniquely yours.
            </p>
            <Link 
              href="/shop/custom-orders" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Custom Order
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
