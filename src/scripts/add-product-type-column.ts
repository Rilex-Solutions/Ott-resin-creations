// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { sql } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function addProductTypeColumn() {
  try {
    console.log('Adding product_type column to categories table...')

    // Add the column if it doesn't exist
    await db.execute(sql`
      ALTER TABLE categories
      ADD COLUMN IF NOT EXISTS product_type VARCHAR(50) DEFAULT 'resin' NOT NULL
    `)

    console.log('✓ Successfully added product_type column')
    console.log('All existing categories have been set to productType: "resin"')

    process.exit(0)
  } catch (error) {
    console.error('Error adding product_type column:', error)
    process.exit(1)
  }
}

addProductTypeColumn()
