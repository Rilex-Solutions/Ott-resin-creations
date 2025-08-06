import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our Studio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to my world of custom resin art, where creativity meets craftsmanship 
              to create unique pieces that tell your story.
            </p>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-500">Artist Portrait</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey into Resin Art</h2>
                <p className="text-lg text-gray-600 mb-6">
                  What started as a creative hobby quickly blossomed into a passion for creating 
                  beautiful, functional art pieces. I discovered the endless possibilities of resin 
                  and fell in love with how each piece becomes a unique masterpiece.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  As a small business owner, I take pride in every single creation that leaves my studio. 
                  Each piece is handled with care, from the initial concept to the final polish, 
                  ensuring that you receive something truly special.
                </p>
                <p className="text-lg text-gray-600">
                  When I'm not in the studio, I love spending time with my family and drawing inspiration 
                  from nature, which often finds its way into my color palettes and designs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">My Creative Process</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Every piece is thoughtfully crafted through a meticulous process that ensures 
                quality, beauty, and durability in every creation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Consultation & Design</h3>
                <p className="text-gray-600">
                  We start with a conversation about your vision, style preferences, and intended use. 
                  I'll create initial design concepts and color schemes for your approval.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Crafting & Creation</h3>
                <p className="text-gray-600">
                  Using premium epoxy resin and high-quality pigments, I carefully pour and manipulate 
                  each layer to achieve the desired effects, patterns, and depth.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Finishing & Quality</h3>
                <p className="text-gray-600">
                  After curing, each piece is sanded, polished, and inspected to ensure it meets 
                  my high standards before being carefully packaged for delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives My Work</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality First</h3>
                  <p className="text-gray-600">
                    I use only premium materials and proven techniques to ensure your piece 
                    will be beautiful and durable for years to come.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Touch</h3>
                  <p className="text-gray-600">
                    Every piece is handmade in my studio with attention to detail that 
                    mass-produced items simply can't match.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Care</h3>
                  <p className="text-gray-600">
                    Your satisfaction is my priority. I work closely with you throughout 
                    the process to ensure the final piece exceeds expectations.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
                  <p className="text-gray-600">
                    I'm committed to responsible practices, from sourcing eco-friendly 
                    materials to minimizing waste in my creative process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">My Studio</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Located in my home studio, this creative space is where the magic happens. 
                  It's equipped with professional-grade tools, proper ventilation, and organized 
                  storage for all my materials and works in progress.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  The studio is designed for both functionality and inspiration, with natural light 
                  flooding in during the day and carefully controlled lighting for evening work sessions. 
                  Every corner is thoughtfully arranged to support the creative process.
                </p>
                <p className="text-lg text-gray-600">
                  I welcome clients to visit by appointment to see works in progress and discuss 
                  custom projects in person. There's something special about experiencing the 
                  creative environment where your piece will come to life.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg aspect-[4/3] flex items-center justify-center">
                <span className="text-gray-500">Studio Workspace Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Let's Create Something Together</h2>
            <p className="text-xl mb-8 opacity-90">
              I'd love to hear about your project and discuss how we can bring your vision to life. 
              Every custom piece starts with a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get In Touch
              </Link>
              <Link 
                href="/gallery" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-400 hover:bg-blue-400 transition-colors"
              >
                View My Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}