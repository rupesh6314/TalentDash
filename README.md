# TalentDash

TalentDash is a verified compensation intelligence platform. It provides a community-driven database for professionals to explore real salaries, read honest company reviews, and prepare for interviews.

## 🚀 Architecture Decisions

This project is built as a production-grade full-stack application using **Next.js 15 (App Router)** and **Prisma ORM**, adhering strictly to modern Data-First design principles.

### React Server Components (RSC) vs Client Components
We heavily leverage Server Components to push data fetching to the edge and reduce client-side JavaScript bundles:
- **Server Components:** Pages like `/` (Home), `/salaries` (Salary Explorer), and `/companies/[slug]` fetch data directly via internal APIs or Prisma on the server. They render static HTML that is instantly interactive and SEO-friendly.
- **Client Components:** We strictly isolate interactive elements (e.g., the `OfferComparator` on the `/compare` page, the salary filtering logic) into Client Components (`'use client'`). This ensures the majority of the page remains server-rendered while preserving stateful interactivity where needed.

### Caching Strategy & ISR
To ensure the application can handle millions of users and maintain an LCP (Largest Contentful Paint) of < 2s:
- **Incremental Static Regeneration (ISR):** Critical pages use `export const revalidate = 3600;` to serve cached static pages that revalidate in the background every hour.
- **API Edge Caching:** Public API routes (like `GET /api/salaries`) use `Cache-Control: s-maxage=300, stale-while-revalidate=3600` to offload database reads to the CDN.
- **Static Generation:** The company pages (`/companies/[slug]`) use `generateStaticParams()` to pre-build company profiles at deployment time, ensuring instantaneous navigation.

### Design System
- **No Generic Templates:** Built from scratch following a strict **Airbnb-style Data-First Design System**. 
- **Semantic CSS:** Custom Tailwind tokens (`bg-background`, `text-primary`, `bg-surface`) manage consistent styling across the application without hardcoded colors.
- **Light-Mode Only:** Optimized for clarity and data visualization, avoiding the distraction of dark mode for analytical dashboards.

## 🗄️ Database Schema & Normalisation
- **PostgreSQL via Neon DB:** A highly scalable remote database.
- **Company Normalisation:** An intelligent pipeline automatically strips punctuation and standardizes capitalization during ingestion, ensuring that "Google India", "google", and "GOOGLE" all resolve to the unified `google` slug.
- **Validation:** Strict validation rules (0.0-1.0 confidence score bounds, experience ranges) using Prisma models and Next.js API routes.

## 🏃‍♂️ Getting Started

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up your `.env` file with your Postgres database URL:
```env
DATABASE_URL="postgresql://user:password@host/db?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. Push the schema and seed the database:
```bash
npx prisma db push
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev
```