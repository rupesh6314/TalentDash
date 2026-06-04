# TalentDash – Full‑Stack Salary Platform

## Architecture Decisions (FS4)

### Static vs ISR vs Dynamic

| Page                | Strategy         | Rationale                                                                 |
|---------------------|------------------|---------------------------------------------------------------------------|
| `/salaries`         | ISR (300s)       | Frequently updated – 5min CDN cache, background revalidate.              |
| `/companies/[slug]` | Static + ISR     | Slugs from DB at build time. ISR updates pages when new salaries arrive. |
| `/compare`          | Dynamic (client) | User‑selected records – no caching benefit.                              |

### Pagination

**Page‑based (offset/limit)** – simple, SEO‑friendly. With proper indexes, fast up to 100k rows. Future: cursor‑based for larger scale.

### Cache Headers

- `/api/salaries`: `s-maxage=300, stale-while-revalidate=3600` – 5 min fresh, serve stale for 1h.
- `/api/companies/:slug`: `s-maxage=3600, stale-while-revalidate=86400` – 1h fresh, stale for 1d.

### What I would build differently with another day

- Authentication (NextAuth)
- Webhook to trigger ISR after POST
- Unit/integration tests
- Full‑text search

### What I did NOT build (scope)

- User accounts
- Email notifications
- Export CSV
- Dark mode (functional but not pixel‑perfect)

## Setup

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run build
npm start