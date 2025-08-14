// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { products, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function checkFeaturedProducts() {
  try {
    console.log('Checking featured products by category...\n')
    
    // Get all categories
    const allCategories = await db.select().from(categories)
    
    for (const category of allCategories) {
      console.log(`\n📁 Category: ${category.name} (${category.slug})`)
      
      // Get all products in this category
      const categoryProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, category.id))
      
      console.log(`  Total products: ${categoryProducts.length}`)
      
      // Check for featured products
      const featuredProducts = categoryProducts.filter(p => p.featured)
      console.log(`  Featured products: ${featuredProducts.length}`)
      
      if (featuredProducts.length > 0) {
        featuredProducts.forEach(product => {
          console.log(`    ✨ ${product.name} - Image: ${product.imageUrl ? '✅ Has image' : '❌ No image'}`)
        })
      } else {
        console.log(`    ⚠️  No featured products`)
      }
    }
    
    console.log('\n✓ Check completed!')
    process.exit(0)
  } catch (error) {
    console.error('Error checking featured products:', error)
    process.exit(1)
  }
}

checkFeaturedProducts()