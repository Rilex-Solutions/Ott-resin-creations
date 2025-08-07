import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, categorySlug, image, imageUrl, inStock, featured, inventoryCount } = body

    // Find the category ID by slug
    const [category] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1)

    if (!category) {
      return NextResponse.json(
        { error: `Category '${categorySlug}' not found` },
        { status: 400 }
      )
    }

    // Insert the product
    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        description,
        price,
        categoryId: category.id,
        image: image || name, // Fallback to product name if no image description
        imageUrl: imageUrl || null,
        inStock: inStock ?? true,
        featured: featured ?? false,
        inventoryCount: inventoryCount ?? 1
      })
      .returning()

    return NextResponse.json({
      success: true,
      product: newProduct
    })

  } catch (error) {
    console.error('Error adding product:', error)
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        image: products.image,
        imageUrl: products.imageUrl,
        inStock: products.inStock,
        featured: products.featured,
        inventoryCount: products.inventoryCount,
        categoryName: categories.name,
        categorySlug: categories.slug
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))

    return NextResponse.json({ products: allProducts })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}