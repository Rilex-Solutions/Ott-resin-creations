// Load environment variables FIRST
import { config } from 'dotenv'
config({ path: '.env.local' })

// Then import database modules
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function updatePhoneCategory() {
  try {
    console.log('Updating phone-stands category to phone-accessories...')

    // First, delete any duplicate phone-accessories category (from seed)
    const deleteResult = await db
      .delete(categories)
      .where(eq(categories.slug, 'phone-accessories'))
      .returning()

    if (deleteResult.length > 0) {
      console.log('✓ Removed duplicate phone-accessories category')
    }

    // Now update the existing phone-stands category
    const result = await db
      .update(categories)
      .set({
        slug: 'phone-accessories',
        name: 'Phone Accessories',
        description: 'Functional and beautiful phone accessories for your desk or nightstand',
        hero: 'Keep your phone stylishly displayed with our resin phone accessories',
      })
      .where(eq(categories.slug, 'phone-stands'))
      .returning()

    if (result.length > 0) {
      console.log('✓ Successfully updated category!')
      console.log('  Old slug: phone-stands')
      console.log('  New slug: phone-accessories')
      console.log('  New name: Phone Accessories')
      console.log(`  All products from phone-stands now appear under /shop/phone-accessories`)
    } else {
      console.log('⚠ No category found with slug "phone-stands"')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error updating category:', error)
    process.exit(1)
  }
}

updatePhoneCategory()
