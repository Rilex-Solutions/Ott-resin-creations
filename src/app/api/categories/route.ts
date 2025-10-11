import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, hero, productType, featured } = body

    const [newCategory] = await db
      .insert(categories)
      .values({
        name,
        slug,
        description,
        hero,
        productType: productType ?? 'resin',
        featured: featured ?? false
      })
      .returning()

    return NextResponse.json({
      success: true,
      category: newCategory
    })

  } catch (error) {
    console.error('Error adding category:', error)
    return NextResponse.json(
      { error: 'Failed to add category' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const allCategories = await db.select().from(categories)
    return NextResponse.json({ categories: allCategories })

  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}