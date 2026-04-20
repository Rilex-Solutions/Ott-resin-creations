import { NextRequest, NextResponse } from 'next/server'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { siteSettings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Configure database connection
neonConfig.fetchConnectionCache = true
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

// GET - Fetch site settings
export async function GET() {
  try {
    // Get the first (and should be only) settings record
    const settings = await db.select().from(siteSettings).limit(1)

    // If no settings exist, create default settings
    if (settings.length === 0) {
      const newSettings = await db.insert(siteSettings).values({
        springSaleActive: false,
        salePercentage: '50.00'
      }).returning()

      return NextResponse.json({
        success: true,
        settings: {
          springSaleActive: newSettings[0].springSaleActive,
          salePercentage: parseFloat(newSettings[0].salePercentage)
        }
      })
    }

    return NextResponse.json({
      success: true,
      settings: {
        springSaleActive: settings[0].springSaleActive,
        salePercentage: parseFloat(settings[0].salePercentage)
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { springSaleActive, salePercentage } = body

    // Validate input
    if (typeof springSaleActive !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'springSaleActive must be a boolean' },
        { status: 400 }
      )
    }

    if (salePercentage !== undefined) {
      const percentage = parseFloat(salePercentage)
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        return NextResponse.json(
          { success: false, error: 'salePercentage must be between 0 and 100' },
          { status: 400 }
        )
      }
    }

    // Get existing settings
    const existing = await db.select().from(siteSettings).limit(1)

    let updatedSettings

    if (existing.length === 0) {
      // Create new settings if none exist
      updatedSettings = await db.insert(siteSettings).values({
        springSaleActive,
        salePercentage: salePercentage?.toString() || '50.00'
      }).returning()
    } else {
      // Update existing settings
      updatedSettings = await db.update(siteSettings)
        .set({
          springSaleActive,
          salePercentage: salePercentage?.toString() || existing[0].salePercentage,
          updatedAt: new Date()
        })
        .where(eq(siteSettings.id, existing[0].id))
        .returning()
    }

    return NextResponse.json({
      success: true,
      settings: {
        springSaleActive: updatedSettings[0].springSaleActive,
        salePercentage: parseFloat(updatedSettings[0].salePercentage)
      }
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
