// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { products } from '@/lib/db/schema'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function clearProducts() {
  try {
    console.log('🗑️ Clearing all products from database...\n')
    
    // Delete all products
    const result = await db.delete(products)
    
    console.log('✅ All products have been cleared from the database')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error clearing products:', error)
    process.exit(1)
  }
}

clearProducts()