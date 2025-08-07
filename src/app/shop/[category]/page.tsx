import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CustomOrderForm from '@/components/forms/CustomOrderForm'
import ProductCard from '@/components/ProductCard'
import { db } from '@/lib/db'
import { products, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const categoryInfo = {
  'coasters': {
    name: 'Coasters',
    description: 'Functional art for your home - custom resin coasters in various designs',
    hero: 'Protect your surfaces in style with our handcrafted resin coasters',
    products: [
      {
        id: 1,
        name: 'Ocean Wave Coaster Set',
        price: '$35',
        description: 'Set of 4 ocean-inspired coasters with flowing blue and white patterns',
        image: 'Ocean Wave Coasters',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Forest Green Coaster Set',
        price: '$32',
        description: 'Earthy green tones with gold accents, set of 4',
        image: 'Forest Coasters',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Galaxy Spiral Coasters',
        price: '$38',
        description: 'Cosmic swirl patterns in deep blues and purples',
        image: 'Galaxy Coasters',
        inStock: true,
        featured: false
      },
      {
        id: 4,
        name: 'Sunset Ombre Coasters',
        price: '$36',
        description: 'Warm sunset colors blending from orange to pink',
        image: 'Sunset Coasters',
        inStock: false,
        featured: false
      }
    ]
  },
  'trays': {
    name: 'Trays',
    description: 'Beautiful serving and decorative trays for your home',
    hero: 'Elevate your space with stunning handcrafted resin trays',
    products: [
      {
        id: 1,
        name: 'Large Geode Serving Tray',
        price: '$95',
        description: 'Large rectangular tray with gold geode design',
        image: 'Geode Tray',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Ocean Wave Round Tray',
        price: '$75',
        description: 'Round tray with flowing ocean-inspired patterns',
        image: 'Ocean Round Tray',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Marble Effect Tray',
        price: '$85',
        description: 'Elegant marble pattern with gold veining',
        image: 'Marble Tray',
        inStock: true,
        featured: false
      }
    ]
  },
  'dragons': {
    name: 'Dragons',
    description: 'Mystical dragon-themed resin art pieces and collectibles',
    hero: 'Unleash the magic with our dragon-inspired resin creations',
    products: [
      {
        id: 1,
        name: 'Crystal Dragon Figurine',
        price: '$65',
        description: 'Detailed dragon sculpture with embedded crystals and metallic accents',
        image: 'Crystal Dragon',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Dragon Egg Display',
        price: '$45',
        description: 'Mystical dragon egg with swirling colors and glitter effects',
        image: 'Dragon Egg',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Dragon Scale Coaster Set',
        price: '$42',
        description: 'Scale-textured coasters in dragon-inspired colors',
        image: 'Dragon Scale Coasters',
        inStock: true,
        featured: false
      }
    ]
  },
  'home-decor': {
    name: 'Home Decor',
    description: 'Decorative resin pieces to beautify your living space',
    hero: 'Transform your home with unique resin decorative pieces',
    products: [
      {
        id: 1,
        name: 'Geode Wall Art',
        price: '$120',
        description: 'Large geode slice wall hanging with gold veining',
        image: 'Geode Wall Art',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Abstract Flow Sculpture',
        price: '$85',
        description: 'Freestanding abstract piece with flowing colors',
        image: 'Flow Sculpture',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Ocean Wave Vase',
        price: '$55',
        description: 'Decorative vase with ocean-inspired patterns',
        image: 'Ocean Vase',
        inStock: false,
        featured: false
      }
    ]
  },
  'phone-stands': {
    name: 'Phone Stands',
    description: 'Functional and beautiful phone stands for your desk or nightstand',
    hero: 'Keep your phone stylishly displayed with our resin phone stands',
    products: [
      {
        id: 1,
        name: 'Galaxy Phone Stand',
        price: '$28',
        description: 'Cosmic-themed phone stand with glittery finish',
        image: 'Galaxy Phone Stand',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Wood & Resin Phone Stand',
        price: '$32',
        description: 'Natural wood base with colorful resin accent',
        image: 'Wood Resin Stand',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Marble Effect Phone Stand',
        price: '$25',
        description: 'Elegant marble pattern in neutral tones',
        image: 'Marble Phone Stand',
        inStock: true,
        featured: false
      }
    ]
  },
  'spooky': {
    name: 'Spooky',
    description: 'Halloween and gothic-themed resin art for those who love the macabre',
    hero: 'Embrace the dark side with our spooky resin creations',
    products: [
      {
        id: 1,
        name: 'Skull Trinket Dish',
        price: '$38',
        description: 'Gothic skull-shaped dish with dark metallic finish',
        image: 'Skull Dish',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Bat Wing Coasters',
        price: '$35',
        description: 'Set of 4 bat wing shaped coasters in dark colors',
        image: 'Bat Wing Coasters',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Potion Bottle Bookend',
        price: '$55',
        description: 'Decorative potion bottle with mysterious swirling contents',
        image: 'Potion Bookend',
        inStock: false,
        featured: false
      }
    ]
  },
  'tea-lights': {
    name: 'Tea Lights',
    description: 'Atmospheric tea light holders that create beautiful ambient lighting',
    hero: 'Set the mood with our enchanting resin tea light holders',
    products: [
      {
        id: 1,
        name: 'Galaxy Tea Light Holder',
        price: '$22',
        description: 'Cosmic swirl pattern that glows beautifully when lit',
        image: 'Galaxy Tea Light',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Ocean Wave Tea Light',
        price: '$20',
        description: 'Ocean-inspired holder with flowing blue patterns',
        image: 'Ocean Tea Light',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Forest Mushroom Tea Light',
        price: '$25',
        description: 'Whimsical mushroom-shaped holder with earthy tones',
        image: 'Mushroom Tea Light',
        inStock: true,
        featured: false
      }
    ]
  },
  'bookmarks': {
    name: 'Bookmarks',
    description: 'Beautiful resin bookmarks for book lovers with embedded designs and colors',
    hero: 'Never lose your place with these artistic resin bookmarks',
    products: [
      {
        id: 1,
        name: 'Pressed Flower Bookmark',
        price: '$22',
        description: 'Real pressed flowers in clear resin with ribbon',
        image: 'Flower Bookmark',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Galaxy Swirl Bookmark',
        price: '$20',
        description: 'Cosmic patterns with metallic accents',
        image: 'Galaxy Bookmark',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Ocean Depths Bookmark',
        price: '$25',
        description: 'Deep blue with pearl accents and gold ribbon',
        image: 'Ocean Bookmark',
        inStock: true,
        featured: false
      }
    ]
  },
  'earrings': {
    name: 'Earrings',
    description: 'Unique resin earrings in various styles and colors',
    hero: 'Express yourself with our handcrafted resin earrings',
    products: [
      {
        id: 1,
        name: 'Galaxy Drop Earrings',
        price: '$28',
        description: 'Lightweight cosmic-inspired drop earrings',
        image: 'Galaxy Drop Earrings',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Flower Petal Studs',
        price: '$22',
        description: 'Real flower petals preserved in clear resin studs',
        image: 'Flower Studs',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Geometric Statement Earrings',
        price: '$32',
        description: 'Bold geometric shapes in vibrant colors',
        image: 'Geometric Earrings',
        inStock: false,
        featured: false
      }
    ]
  },
  'teddy-bears': {
    name: 'Teddy Bears',
    description: 'Adorable resin teddy bear figurines and accessories',
    hero: 'Cuddly charm meets artistry in our teddy bear collection',
    products: [
      {
        id: 1,
        name: 'Galaxy Teddy Bear',
        price: '$45',
        description: 'Cosmic-themed teddy bear with swirling galaxy patterns',
        image: 'Galaxy Teddy',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Flower Garden Teddy',
        price: '$42',
        description: 'Sweet teddy with embedded dried flowers',
        image: 'Flower Teddy',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Rainbow Teddy Bear',
        price: '$40',
        description: 'Colorful rainbow gradient teddy bear',
        image: 'Rainbow Teddy',
        inStock: true,
        featured: false
      }
    ]
  },
  'celestial': {
    name: 'Celestial',
    description: 'Moon, stars, and cosmic-themed resin art pieces',
    hero: 'Bring the magic of the cosmos into your space',
    products: [
      {
        id: 1,
        name: 'Moon Phase Wall Art',
        price: '$75',
        description: 'Beautiful moon phases in metallic silver and gold',
        image: 'Moon Phase Art',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Star Constellation Tray',
        price: '$55',
        description: 'Night sky constellation map with glowing stars',
        image: 'Constellation Tray',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Cosmic Crystal Ball',
        price: '$85',
        description: 'Galaxy swirl sphere with stand for display',
        image: 'Cosmic Crystal',
        inStock: false,
        featured: false
      }
    ]
  },
  'dream-catchers': {
    name: 'Dream Catchers',
    description: 'Mystical dream catchers with resin elements and natural materials',
    hero: 'Protect your dreams with our artistic resin dream catchers',
    products: [
      {
        id: 1,
        name: 'Galaxy Dream Catcher',
        price: '$58',
        description: 'Large dream catcher with cosmic resin center and feathers',
        image: 'Galaxy Dream Catcher',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Ocean Waves Dream Catcher',
        price: '$52',
        description: 'Blue and white flowing patterns with shells and beads',
        image: 'Ocean Dream Catcher',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Forest Spirit Dream Catcher',
        price: '$60',
        description: 'Earthy tones with pressed flowers and natural elements',
        image: 'Forest Dream Catcher',
        inStock: true,
        featured: false
      }
    ]
  },
  'seconds-sale': {
    name: 'Seconds Sale',
    description: 'Quality pieces with minor imperfections at discounted prices',
    hero: 'Beautiful art at unbeatable prices - slight imperfections, major savings',
    products: [
      {
        id: 1,
        name: 'B-Grade Ocean Coasters',
        price: '$20',
        description: 'Set of 4 with minor bubble imperfections - Originally $35',
        image: 'B-Grade Coasters',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Slightly Uneven Tray',
        price: '$45',
        description: 'Beautiful galaxy tray with slight warping - Originally $75',
        image: 'B-Grade Tray',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Color Test Bookmark Set',
        price: '$15',
        description: 'Set of 3 bookmarks from color experiments - Originally $25 each',
        image: 'Test Bookmarks',
        inStock: false,
        featured: false
      }
    ]
  },
  'memory-pieces': {
    name: 'Memory Pieces',
    description: 'Preserve precious memories in beautiful resin keepsakes',
    hero: 'Honor special moments and loved ones with custom memorial pieces',
    products: [
      {
        id: 1,
        name: 'Memorial Flower Preservation',
        price: '$65',
        description: 'Preserve funeral or wedding flowers in a beautiful resin display',
        image: 'Memorial Flowers',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Pet Memorial Piece',
        price: '$55',
        description: 'Custom memorial with pet photo and fur/ashes incorporation',
        image: 'Pet Memorial',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Baby Keepsake Shadow Box',
        price: '$75',
        description: 'Hospital bracelet, first outfit pieces in resin display',
        image: 'Baby Keepsake',
        inStock: true,
        featured: false
      }
    ]
  },
  'ornaments': {
    name: 'Ornaments',
    description: 'Holiday and decorative ornaments for year-round celebration',
    hero: 'Add sparkle to your holidays with handcrafted resin ornaments',
    products: [
      {
        id: 1,
        name: 'Galaxy Christmas Ornaments',
        price: '$18',
        description: 'Set of 3 cosmic swirl ornaments with hanging ribbons',
        image: 'Galaxy Ornaments',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Pressed Flower Ornaments',
        price: '$22',
        description: 'Real flowers preserved in clear resin baubles',
        image: 'Flower Ornaments',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Custom Family Ornament',
        price: '$28',
        description: 'Personalized ornament with family names and colors',
        image: 'Family Ornament',
        inStock: true,
        featured: false
      }
    ]
  },
  'keychains': {
    name: 'Keychains',
    description: 'Perfect gifts and personal accessories with custom colors and designs',
    hero: 'Carry a piece of art with you - perfect for gifts or personal use',
    products: [
      {
        id: 1,
        name: 'Initial Letter Keychain',
        price: '$15',
        description: 'Personalized letter keychain in your choice of colors',
        image: 'Letter Keychain',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Dried Flower Keychain',
        price: '$18',
        description: 'Real pressed flowers preserved in clear resin',
        image: 'Flower Keychain',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Galaxy Heart Keychain',
        price: '$12',
        description: 'Heart-shaped with cosmic swirl patterns',
        image: 'Galaxy Heart',
        inStock: true,
        featured: false
      }
    ]
  },
  'games': {
    name: 'Games',
    description: 'Fun resin game pieces and board game accessories',
    hero: 'Level up your game night with custom resin gaming accessories',
    products: [
      {
        id: 1,
        name: 'Custom Dice Set',
        price: '$45',
        description: 'Set of 7 RPG dice with galaxy swirl patterns',
        image: 'Galaxy Dice Set',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Chess Piece Set',
        price: '$120',
        description: 'Complete chess set with cosmic and ocean themes',
        image: 'Resin Chess Set',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Game Token Collection',
        price: '$25',
        description: 'Set of 20 custom game tokens in various colors',
        image: 'Game Tokens',
        inStock: false,
        featured: false
      }
    ]
  },
  'necklaces': {
    name: 'Necklaces',
    description: 'Beautiful resin pendant necklaces and statement pieces',
    hero: 'Wear your art with stunning resin necklaces and pendants',
    products: [
      {
        id: 1,
        name: 'Galaxy Pendant Necklace',
        price: '$48',
        description: 'Large cosmic swirl pendant on adjustable chain',
        image: 'Galaxy Pendant',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Pressed Flower Pendant',
        price: '$42',
        description: 'Real flowers preserved in clear resin teardrop',
        image: 'Flower Pendant',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Geode Slice Necklace',
        price: '$55',
        description: 'Natural geode pattern with gold chain',
        image: 'Geode Necklace',
        inStock: true,
        featured: false
      }
    ]
  },
  'skulls': {
    name: 'Skulls',
    description: 'Gothic and anatomical skull-themed resin art pieces',
    hero: 'Embrace the darker aesthetic with our skull collection',
    products: [
      {
        id: 1,
        name: 'Galaxy Skull Display',
        price: '$85',
        description: 'Large decorative skull with cosmic swirl patterns',
        image: 'Galaxy Skull',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Mini Skull Collection',
        price: '$45',
        description: 'Set of 3 small skulls in different metallic finishes',
        image: 'Mini Skulls',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Anatomical Skull Bookend',
        price: '$65',
        description: 'Detailed skull bookend with realistic features',
        image: 'Skull Bookend',
        inStock: false,
        featured: false
      }
    ]
  },
  'magnets': {
    name: 'Magnets',
    description: 'Functional and decorative resin magnets for your fridge or office',
    hero: 'Add artistic flair to your magnetic surfaces',
    products: [
      {
        id: 1,
        name: 'Galaxy Magnet Set',
        price: '$20',
        description: 'Set of 6 cosmic-themed refrigerator magnets',
        image: 'Galaxy Magnets',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Flower Preservation Magnets',
        price: '$25',
        description: 'Real pressed flowers in clear resin magnets',
        image: 'Flower Magnets',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Ocean Wave Magnets',
        price: '$18',
        description: 'Set of 4 ocean-inspired round magnets',
        image: 'Ocean Magnets',
        inStock: true,
        featured: false
      }
    ]
  },
  'recreational': {
    name: 'Recreational',
    description: 'Fun and playful resin items for leisure and entertainment',
    hero: 'Discover unique pieces designed for fun and relaxation',
    products: [
      {
        id: 1,
        name: 'Stress Relief Fidget Cube',
        price: '$32',
        description: 'Galaxy-themed fidget cube with different textures',
        image: 'Fidget Cube',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Worry Stone Set',
        price: '$28',
        description: 'Set of 3 smooth worry stones in calming colors',
        image: 'Worry Stones',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Mini Zen Garden',
        price: '$65',
        description: 'Desktop zen garden with resin elements and sand',
        image: 'Zen Garden',
        inStock: false,
        featured: false
      }
    ]
  },
  'hanging-items': {
    name: 'Hanging Items',
    description: 'Decorative pieces designed to hang and catch the light',
    hero: 'Create beautiful displays with our hanging resin art',
    products: [
      {
        id: 1,
        name: 'Sun Catcher Collection',
        price: '$35',
        description: 'Set of 3 colorful sun catchers for windows',
        image: 'Sun Catchers',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Wind Chime Elements',
        price: '$45',
        description: 'Resin elements to create your own wind chime',
        image: 'Wind Chime Parts',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Hanging Mobile',
        price: '$75',
        description: 'Complete mobile with galaxy-themed hanging pieces',
        image: 'Hanging Mobile',
        inStock: true,
        featured: false
      }
    ]
  },
  'custom-orders': {
    name: 'Custom Orders',
    description: 'Work directly with the artist to create completely personalized pieces',
    hero: 'Bring your vision to life with completely custom resin art',
    products: [
      {
        id: 1,
        name: 'Custom Coaster Set',
        price: 'From $40',
        description: 'Personalized coaster set in your choice of colors and design',
        image: 'Custom Coasters',
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: 'Custom Wall Art',
        price: 'From $100',
        description: 'Bespoke wall art piece sized and designed to your specifications',
        image: 'Custom Wall Art',
        inStock: true,
        featured: true
      },
      {
        id: 3,
        name: 'Custom Memorial Piece',
        price: 'From $60',
        description: 'Personalized memorial incorporating your special items',
        image: 'Custom Memorial',
        inStock: true,
        featured: true
      }
    ]
  }
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

interface Product {
  id: string
  name: string
  price: string
  description: string
  image: string
  imageUrl: string | null
  inStock: boolean
  featured: boolean
  inventoryCount: number | null
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = categoryInfo[params.category as keyof typeof categoryInfo]
  
  if (!categoryData) {
    notFound()
  }

  // Fetch products from database for this category
  let categoryProducts: Product[] = []
  
  if (params.category !== 'custom-orders') {
    try {
      const dbProducts = await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          description: products.description,
          image: products.image,
          imageUrl: products.imageUrl,
          inStock: products.inStock,
          featured: products.featured,
          inventoryCount: products.inventoryCount
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(eq(categories.slug, params.category))
      
      categoryProducts = dbProducts
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fall back to empty array if database fails
      categoryProducts = []
    }
  }

  // Special handling for custom-orders page
  if (params.category === 'custom-orders') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Breadcrumb */}
          <div className="bg-[#FAF7FB] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex text-sm">
                <Link href="/" className="text-[#6B5B73] hover:text-[#2D1B36]">Home</Link>
                <span className="mx-2 text-[#A69BAA]">/</span>
                <Link href="/shop" className="text-[#6B5B73] hover:text-[#2D1B36]">Shop</Link>
                <span className="mx-2 text-[#A69BAA]">/</span>
                <span className="text-[#2D1B36] font-medium">Custom Orders</span>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[#F8F5FF] via-[#F0FDF9] to-[#FDF2F8] py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D1B36] mb-6">
                Custom Orders
              </h1>
              <p className="text-xl text-[#6B5B73] max-w-3xl mx-auto mb-8">
                Bring your vision to life with completely custom resin art pieces designed just for you
              </p>
            </div>
          </section>

          {/* Custom Order Form */}
          <section className="py-16 bg-[#FEFBFD]">
            <div className="px-4 sm:px-6 lg:px-8">
              <CustomOrderForm />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  const featuredProducts = categoryProducts.filter(product => product.featured)
  const otherProducts = categoryProducts.filter(product => !product.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{categoryData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {categoryData.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {categoryData.hero}
            </p>
            {params.category === 'custom' && (
              <Link 
                href="/shop/custom-orders" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Custom Order
              </Link>
            )}
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
                <p className="text-lg text-gray-600">Our most popular pieces in this category</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products */}
        {otherProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">All Products</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="regular" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Order CTA for non-custom categories */}
        {params.category !== 'custom' && (
          <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Want Something Different?</h2>
              <p className="text-xl mb-8 opacity-90">
                Don&apos;t see exactly what you&apos;re looking for? Let&apos;s create a custom piece just for you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/shop/custom-orders" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Custom Options
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-400 hover:bg-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((category) => ({
    category: category,
  }))
}