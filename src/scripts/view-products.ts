// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { categories, products } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function viewProducts() {
  try {
    console.log('📦 Checking products in database...\n')
    
    // Get all products with their categories
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        description: products.description,
        imageUrl: products.imageUrl,
        inStock: products.inStock,
        featured: products.featured,
        categoryName: categories.name
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
    
    if (allProducts.length === 0) {
      console.log('❌ No products found in database')
      return
    }
    
    console.log(`✅ Found ${allProducts.length} product(s):\n`)
    
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`)
      console.log(`   Category: ${product.categoryName}`)
      console.log(`   Price: ${product.price}`)
      console.log(`   In Stock: ${product.inStock ? 'Yes' : 'No'}`)
      console.log(`   Featured: ${product.featured ? 'Yes' : 'No'}`)
      console.log(`   Image URL: ${product.imageUrl || 'None'}`)
      console.log(`   Description: ${product.description?.substring(0, 60)}...`)
      console.log('   ---')
    })
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error viewing products:', error)
    process.exit(1)
  }
}

viewProducts()