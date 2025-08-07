// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { categories } from '@/lib/db/schema'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

const categoryData = [
  {
    slug: 'coasters',
    name: 'Coasters',
    description: 'Functional art for your home - custom resin coasters in various designs',
    hero: 'Protect your surfaces in style with our handcrafted resin coasters',
    featured: true
  },
  {
    slug: 'trays',
    name: 'Trays',
    description: 'Beautiful serving and decorative trays for your home',
    hero: 'Elevate your space with stunning handcrafted resin trays',
    featured: true
  },
  {
    slug: 'dragons',
    name: 'Dragons',
    description: 'Mystical dragon-themed resin art pieces and collectibles',
    hero: 'Unleash the magic with our dragon-inspired resin creations',
    featured: true
  },
  {
    slug: 'home-decor',
    name: 'Home Decor',
    description: 'Decorative resin pieces to beautify your living space',
    hero: 'Transform your home with unique resin decorative pieces',
    featured: true
  },
  {
    slug: 'phone-stands',
    name: 'Phone Stands',
    description: 'Functional and beautiful phone stands for your desk or nightstand',
    hero: 'Keep your phone stylishly displayed with our resin phone stands',
    featured: false
  },
  {
    slug: 'spooky',
    name: 'Spooky',
    description: 'Halloween and gothic-themed resin art for those who love the macabre',
    hero: 'Embrace the dark side with our spooky resin creations',
    featured: false
  },
  {
    slug: 'tea-lights',
    name: 'Tea Lights',
    description: 'Atmospheric tea light holders that create beautiful ambient lighting',
    hero: 'Set the mood with our enchanting resin tea light holders',
    featured: false
  },
  {
    slug: 'bookmarks',
    name: 'Bookmarks',
    description: 'Beautiful resin bookmarks for book lovers with embedded designs and colors',
    hero: 'Never lose your place with these artistic resin bookmarks',
    featured: false
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    description: 'Unique resin earrings in various styles and colors',
    hero: 'Express yourself with our handcrafted resin earrings',
    featured: false
  },
  {
    slug: 'teddy-bears',
    name: 'Teddy Bears',
    description: 'Adorable resin teddy bear figurines and accessories',
    hero: 'Cuddly charm meets artistry in our teddy bear collection',
    featured: false
  },
  {
    slug: 'celestial',
    name: 'Celestial',
    description: 'Moon, stars, and cosmic-themed resin art pieces',
    hero: 'Bring the magic of the cosmos into your space',
    featured: true
  },
  {
    slug: 'dream-catchers',
    name: 'Dream Catchers',
    description: 'Mystical dream catchers with resin elements and natural materials',
    hero: 'Protect your dreams with our artistic resin dream catchers',
    featured: false
  },
  {
    slug: 'memory-pieces',
    name: 'Memory Pieces',
    description: 'Preserve precious memories in beautiful resin keepsakes',
    hero: 'Honor special moments and loved ones with custom memorial pieces',
    featured: true
  },
  {
    slug: 'ornaments',
    name: 'Ornaments',
    description: 'Holiday and decorative ornaments for year-round celebration',
    hero: 'Add sparkle to your holidays with handcrafted resin ornaments',
    featured: false
  },
  {
    slug: 'keychains',
    name: 'Keychains',
    description: 'Perfect gifts and personal accessories with custom colors and designs',
    hero: 'Carry a piece of art with you - perfect for gifts or personal use',
    featured: false
  },
  {
    slug: 'games',
    name: 'Games',
    description: 'Fun resin game pieces and board game accessories',
    hero: 'Level up your game night with custom resin gaming accessories',
    featured: false
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    description: 'Beautiful resin pendant necklaces and statement pieces',
    hero: 'Wear your art with stunning resin necklaces and pendants',
    featured: false
  },
  {
    slug: 'skulls',
    name: 'Skulls',
    description: 'Gothic and anatomical skull-themed resin art pieces',
    hero: 'Embrace the darker aesthetic with our skull collection',
    featured: false
  },
  {
    slug: 'magnets',
    name: 'Magnets',
    description: 'Functional and decorative resin magnets for your fridge or office',
    hero: 'Add artistic flair to your magnetic surfaces',
    featured: false
  },
  {
    slug: 'recreational',
    name: 'Recreational',
    description: 'Fun and playful resin items for leisure and entertainment',
    hero: 'Discover unique pieces designed for fun and relaxation',
    featured: false
  },
  {
    slug: 'hanging-items',
    name: 'Hanging Items',
    description: 'Decorative pieces designed to hang and catch the light',
    hero: 'Create beautiful displays with our hanging resin art',
    featured: false
  }
]

async function seedCategories() {
  try {
    console.log('Seeding categories...')
    
    for (const category of categoryData) {
      await db.insert(categories).values(category).onConflictDoNothing()
      console.log(`✓ Added category: ${category.name}`)
    }
    
    console.log('Categories seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding categories:', error)
    process.exit(1)
  }
}

seedCategories()