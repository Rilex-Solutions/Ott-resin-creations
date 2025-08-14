// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function addCategoryImageColumn() {
  try {
    console.log('Adding imageUrl column to categories table...')
    
    // Add imageUrl column to categories table
    await db.execute(`
      ALTER TABLE categories 
      ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)
    `)
    
    console.log('✓ Added image_url column to categories table')
    
    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error running migration:', error)
    process.exit(1)
  }
}

addCategoryImageColumn()