# Huberduberkid Resin Creations

A full-stack e-commerce platform built for Huberduberkid Resin Creations, a Colorado-based artisan resin craft business specializing in handcrafted resin art pieces and custom orders.

## Live Site

[huberduberresincreations.vercel.app](https://huberduberresincreations.vercel.app)

## About This Project

This is production client work built for a real small business owner to showcase and sell their handcrafted resin art online. The site includes a custom-built product management system, cart functionality, and automated customer communication flows. This repository is shared with permission from the client.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 18, TypeScript
- **Styling**: SCSS Modules with custom design system
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Email**: Resend API
- **Deployment**: Vercel
- **Testing**: Jest, React Testing Library

## Key Features

### Product Catalog System
- Dynamic product browsing with category filtering
- Featured products showcase on homepage
- Image modal for detailed product views
- Responsive grid layouts optimized for mobile and desktop
- Real-time inventory tracking and stock status display

### Custom Admin Dashboard
- Product management (create, edit, delete)
- Category management with dynamic dropdown population
- Inventory control with low stock warnings
- Featured product toggle
- Product preview system
- Image URL management supporting Google Drive and direct links

### Custom Order Flow
- Multi-step custom order form with validation
- Automated email notifications to business owner and customer
- Order inquiry tracking
- Contact form with inquiry type categorization

### Cart System
- Client-side cart state management with Context API
- Cart inquiry submission
- Email notifications for cart submissions
- Persistent cart data during session

### Email Automation
- Customer confirmation emails
- Business owner notifications
- Custom order inquiry handling
- Contact form submissions

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and product management
│   ├── api/               # API routes for products, orders, contact
│   ├── cart/              # Shopping cart page
│   ├── shop/              # Product catalog and category pages
│   └── contact/           # Contact form page
├── components/
│   ├── admin/             # Admin-specific components
│   ├── forms/             # Custom order and contact forms
│   ├── layout/            # Header, Footer, navigation
│   ├── shop/              # Product cards, category cards, CTAs
│   └── ui/                # Reusable UI components
├── contexts/              # React Context (CartContext)
├── lib/                   # Database connection and schema
├── scripts/               # Database seeding and migration scripts
└── types/                 # TypeScript type definitions
```

## Database Schema

**Products Table**
- Product information (name, description, price)
- Inventory management (stock count, availability)
- Category relationship
- Featured product status
- Image URLs

**Categories Table**
- Category name and slug
- Used for product organization and filtering

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Resend API key for email functionality

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rilex-Solutions/Ott-resin-creations.git
cd Ott-resin-creations
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (see `.env.example`)
```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `RESEND_API_KEY` - Resend API key for email sending

4. Run database migrations
```bash
npm run db:migrate
```

5. Seed categories (optional)
```bash
npm run db:seed-categories
```

6. Start development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Push migrations to database
- `npm run db:studio` - Open Drizzle Studio GUI

## Testing

Tests are implemented using Jest and React Testing Library for critical user flows including cart functionality, product display, and form submissions.

```bash
npm test
```

## Admin Access

Admin product management is available at `/admin/products` with the following capabilities:
- Add new products at `/admin/products/add`
- Edit existing products at `/admin/products/edit/[id]`
- View all products and inventory at `/admin/products`
- Dashboard analytics at `/admin/dashboard`

## Notes

- This is production code actively used by a real business
- Client personal information has been redacted for security
- Built with performance, accessibility, and SEO in mind
- Responsive design tested across mobile, tablet, and desktop

## License

This code is shared for portfolio purposes only. All rights reserved by the client, Huberduberkid Resin Creations.
