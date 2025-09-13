// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { products } from '@/lib/db/schema'
import { eq, like } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function updateProducts() {
  try {
    console.log('🔄 Updating products...\n')

    // 1. Update Christmas coaster prices from $6 to $5
    console.log('Updating Christmas coaster prices...')
    const christmasCoastersUpdate = await db
      .update(products)
      .set({ price: '$5' })
      .where(like(products.name, '%Christmas coasters%'))
    console.log('✅ Christmas coaster prices updated\n')

    // 2. Update memorial items
    console.log('Updating memorial items...')

    // Update sleeping kitty and puppy descriptions to include "medium" and price options
    await db
      .update(products)
      .set({
        name: 'Sleeping kitty memorial - medium',
        description: 'Medium sleeping kitty memorial piece. Regular: $3, Special (with ashes): $6'
      })
      .where(like(products.name, '%Sleeping kitty%'))

    await db
      .update(products)
      .set({
        name: 'Sleeping puppy memorial - medium',
        description: 'Medium sleeping puppy memorial piece. Regular: $3, Special (with ashes): $6'
      })
      .where(like(products.name, '%Sleeping puppy%'))

    // Update paw print prices to $5
    await db
      .update(products)
      .set({ price: '$5' })
      .where(like(products.name, '%paw print%'))

    // Update jumping spider memorial keychain price to $5
    await db
      .update(products)
      .set({ price: '$5' })
      .where(like(products.name, '%jumping spider%'))

    // Update German shepherd with ashes price to $6
    await db
      .update(products)
      .set({ price: '$6' })
      .where(like(products.name, '%German shepherd%'))

    console.log('✅ Memorial items updated\n')

    console.log('✅ All product updates completed successfully!')

  } catch (error) {
    console.error('❌ Error updating products:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

updateProducts()