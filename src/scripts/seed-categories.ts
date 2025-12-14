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
  // Resin Categories
  {
    slug: 'coasters',
    name: 'Coasters',
    description: 'Functional art for your home - custom resin coasters in various designs',
    hero: 'Protect your surfaces in style with our handcrafted resin coasters',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'trays',
    name: 'Trays',
    description: 'Beautiful serving and decorative trays for your home',
    hero: 'Elevate your space with stunning handcrafted resin trays',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'dragons',
    name: 'Dragons',
    description: 'Mystical dragon-themed resin art pieces and collectibles',
    hero: 'Unleash the magic with our dragon-inspired resin creations',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'home-decor',
    name: 'Home Decor',
    description: 'Decorative resin pieces to beautify your living space',
    hero: 'Transform your home with unique resin decorative pieces',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'phone-accessories',
    name: 'Phone Accessories',
    description: 'Functional and beautiful phone accessories for your desk or nightstand',
    hero: 'Keep your phone stylishly displayed with our resin phone accessories',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'spooky',
    name: 'Spooky',
    description: 'Halloween and gothic-themed resin art for those who love the macabre',
    hero: 'Embrace the dark side with our spooky resin creations',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'tea-lights',
    name: 'Tea Lights',
    description: 'Atmospheric tea light holders that create beautiful ambient lighting',
    hero: 'Set the mood with our enchanting resin tea light holders',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'bookmarks',
    name: 'Bookmarks',
    description: 'Beautiful resin bookmarks for book lovers with embedded designs and colors',
    hero: 'Never lose your place with these artistic resin bookmarks',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    description: 'Unique resin earrings in various styles and colors',
    hero: 'Express yourself with our handcrafted resin earrings',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'teddy-bears',
    name: 'Teddy Bears',
    description: 'Adorable resin teddy bear figurines and accessories',
    hero: 'Cuddly charm meets artistry in our teddy bear collection',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'celestial',
    name: 'Celestial',
    description: 'Moon, stars, and cosmic-themed resin art pieces',
    hero: 'Bring the magic of the cosmos into your space',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'dream-catchers',
    name: 'Dream Catchers',
    description: 'Mystical dream catchers with resin elements and natural materials',
    hero: 'Protect your dreams with our artistic resin dream catchers',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'memory-pieces',
    name: 'Memory Pieces',
    description: 'Preserve precious memories in beautiful resin keepsakes',
    hero: 'Honor special moments and loved ones with custom memorial pieces',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'ornaments',
    name: 'Ornaments',
    description: 'Holiday and decorative ornaments for year-round celebration',
    hero: 'Add sparkle to your holidays with handcrafted resin ornaments',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'keychains',
    name: 'Keychains',
    description: 'Perfect gifts and personal accessories with custom colors and designs',
    hero: 'Carry a piece of art with you - perfect for gifts or personal use',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'games',
    name: 'Games',
    description: 'Fun resin game pieces and board game accessories',
    hero: 'Level up your game night with custom resin gaming accessories',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    description: 'Beautiful resin pendant necklaces and statement pieces',
    hero: 'Wear your art with stunning resin necklaces and pendants',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'skulls',
    name: 'Skulls',
    description: 'Gothic and anatomical skull-themed resin art pieces',
    hero: 'Embrace the darker aesthetic with our skull collection',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'magnets',
    name: 'Magnets',
    description: 'Functional and decorative resin magnets for your fridge or office',
    hero: 'Add artistic flair to your magnetic surfaces',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'recreational',
    name: 'Recreational',
    description: 'Fun and playful resin items for leisure and entertainment',
    hero: 'Discover unique pieces designed for fun and relaxation',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'hanging-items',
    name: 'Hanging Items',
    description: 'Decorative pieces designed to hang and catch the light',
    hero: 'Create beautiful displays with our hanging resin art',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'trinket-dish',
    name: 'Trinket Dish',
    description: 'Small decorative dishes perfect for jewelry, keys, or other treasures',
    hero: 'Keep your precious items organized in style with handcrafted trinket dishes',
    productType: 'resin',
    featured: false
  },
  {
    slug: 'seconds-sale',
    name: 'Seconds Sale',
    description: 'Quality pieces with minor imperfections at discounted prices',
    hero: 'Discover beautiful resin art at unbeatable prices',
    productType: 'resin',
    featured: true
  },
  {
    slug: 'christmas',
    name: 'Christmas',
    description: 'Festive Christmas-themed resin art and decorations for the holiday season',
    hero: 'Make your holidays magical with handcrafted Christmas resin decorations',
    productType: 'resin',
    featured: true
  },

  // Crochet Categories
  {
    slug: 'crochet-blankets',
    name: 'Blankets',
    description: 'Cozy handmade crocheted blankets in various patterns and colors',
    hero: 'Wrap yourself in warmth with our handcrafted crochet blankets',
    productType: 'crochet',
    featured: true
  },
  {
    slug: 'crochet-amigurumi',
    name: 'Amigurumi',
    description: 'Adorable crocheted stuffed animals and characters',
    hero: 'Discover whimsical crochet creatures that bring joy',
    productType: 'crochet',
    featured: true
  },
  {
    slug: 'crochet-accessories',
    name: 'Accessories',
    description: 'Handmade crocheted hats, scarves, and wearable items',
    hero: 'Stay stylish and cozy with handcrafted crochet accessories',
    productType: 'crochet',
    featured: false
  },
  {
    slug: 'crochet-home',
    name: 'Home Items',
    description: 'Decorative crocheted pieces for your living space',
    hero: 'Add handmade charm to your home with crochet decor',
    productType: 'crochet',
    featured: false
  },

  // 3D Print Categories
  {
    slug: '3d-miniatures',
    name: 'Miniatures',
    description: 'Detailed 3D printed miniatures for gaming and collecting',
    hero: 'Bring your tabletop games to life with custom 3D printed miniatures',
    productType: '3d-print',
    featured: true
  },
  {
    slug: '3d-organizers',
    name: 'Organizers',
    description: 'Functional 3D printed organizers and storage solutions',
    hero: 'Organize your space with custom 3D printed solutions',
    productType: '3d-print',
    featured: false
  },
  {
    slug: '3d-decorative',
    name: 'Decorative',
    description: 'Unique 3D printed decorative items and art pieces',
    hero: 'Transform your space with innovative 3D printed decor',
    productType: '3d-print',
    featured: false
  },
  {
    slug: '3d-gaming',
    name: 'Gaming Accessories',
    description: '3D printed dice towers, token holders, and gaming accessories',
    hero: 'Enhance your gaming experience with custom 3D printed accessories',
    productType: '3d-print',
    featured: true
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