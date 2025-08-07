import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

// Configure Neon for serverless environments
neonConfig.fetchConnectionCache = true

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)