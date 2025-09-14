# Huberduberkid Resin Creations

This is a [Next.js](https://nextjs.org) e-commerce website for Huberduberkid Resin Creations, featuring handcrafted resin art pieces and custom orders.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin Product Upload System

### ✅ Features Already Implemented:
- **Form Fields**: Name, Description, Price, Category, Image Description, Image URL
- **Inventory Management**: Stock status, inventory count
- **Product Settings**: Featured product toggle
- **Category Integration**: Fetches categories from database dynamically
- **API Integration**: POST endpoint to save products to database
- **Success/Error Handling**: User feedback on form submission
- **Database Storage**: Full integration with your Drizzle/PostgreSQL setup

### 🎯 Current Workflow:
1. Admin fills out product form
2. Selects category from dropdown (populated from database)
3. Adds image URL (supports Google Drive and direct image links)
4. Sets inventory and featured status
5. Submits to `/api/products` endpoint
6. Product gets saved to database with category relationship

### 📍 Admin Access:
- **Add Products**: `/admin/products/add`
- **API Endpoint**: `/api/products` (POST for creating, GET for listing)

### 🚀 Planned Improvements:
- Product management interface (edit/delete existing products)
- Live preview of how product will look on site
- Enhanced form validation and required field indicators
- Improved styling and mobile experience for admin forms
