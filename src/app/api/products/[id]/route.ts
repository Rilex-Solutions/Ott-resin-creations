import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id

    const [product] = await db
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
        categoryId: products.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, productId))
      .limit(1)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product })

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id
    const body = await request.json()
    const { name, description, price, categorySlug, image, imageUrl, inStock, featured, inventoryCount } = body

    // Find the category ID by slug if categorySlug is provided
    let categoryId = undefined
    if (categorySlug) {
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
      categoryId = category.id
    }

    // Update the product
    const [updatedProduct] = await db
      .update(products)
      .set({
        name,
        description,
        price,
        ...(categoryId && { categoryId }),
        image: image || name,
        imageUrl: imageUrl || null,
        inStock: inStock ?? true,
        featured: featured ?? false,
        inventoryCount: inventoryCount ?? 1,
        updatedAt: new Date()
      })
      .where(eq(products.id, productId))
      .returning()

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct
    })

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id

    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning({ id: products.id, name: products.name })

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Product "${deletedProduct.name}" deleted successfully`
    })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}