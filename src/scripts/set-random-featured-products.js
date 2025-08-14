// Load environment variables FIRST
require('dotenv').config({ path: '.env.local' })

// Then import database modules
const { drizzle } = require('drizzle-orm/neon-serverless')
const { Pool, neonConfig } = require('@neondatabase/serverless')
const { products, categories } = require('../lib/db/schema')
const { eq } = require('drizzle-orm')

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function setRandomFeaturedProducts() {
  try {
    console.log('Setting random featured products for each category...\n')
    
    // Get all categories
    const allCategories = await db.select().from(categories)
    
    for (const category of allCategories) {
      console.log(`📁 Processing category: ${category.name} (${category.slug})`)
      
      // Get all products in this category
      const categoryProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, category.id))
      
      if (categoryProducts.length === 0) {
        console.log(`  ⚠️  No products found in this category`)
        continue
      }
      
      // First, clear any existing featured products in this category
      await db
        .update(products)
        .set({ featured: false })
        .where(eq(products.categoryId, category.id))
      
      // Pick a random product from this category
      const randomIndex = Math.floor(Math.random() * categoryProducts.length)
      const selectedProduct = categoryProducts[randomIndex]
      
      // Mark this product as featured
      await db
        .update(products)
        .set({ featured: true })
        .where(eq(products.id, selectedProduct.id))
      
      console.log(`  ✨ Set as featured: "${selectedProduct.name}"`)
      console.log(`     Image URL: ${selectedProduct.imageUrl || 'None'}`)
    }
    
    console.log('\n✅ Successfully set random featured products for all categories!')
    console.log('\n🎨 Category cards should now display featured product images!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error setting featured products:', error)
    process.exit(1)
  }
}

setRandomFeaturedProducts()