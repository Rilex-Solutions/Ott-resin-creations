import { pgTable, uuid, varchar, text, decimal, boolean, integer, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  hero: text('hero'), // Hero text for category pages
  productType: varchar('product_type', { length: 50 }).default('resin').notNull(), // 'resin', 'crochet', '3d-print'
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Products table
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description').notNull(),
  price: varchar('price', { length: 20 }).notNull(), // Store as string like "$35" to match current format
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  image: varchar('image', { length: 500 }).notNull(), // Image description/placeholder text
  imageUrl: varchar('image_url', { length: 500 }), // Optional: actual image URL for future use
  inStock: boolean('in_stock').default(true).notNull(),
  featured: boolean('featured').default(false).notNull(),
  inventoryCount: integer('inventory_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Custom orders table
export const customOrders = pgTable('custom_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending, in_progress, completed, cancelled
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}))

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  })
}))