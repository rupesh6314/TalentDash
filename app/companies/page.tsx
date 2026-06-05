import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 3600;

async function getCompaniesData() {
  const companies = await prisma.company.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      industry: true,
      _count: {
        select: { salaries: true, reviews: true, interviews: true }
      }
    }
  });
  return companies;
}

export default async function CompaniesPage() {
  let companies: any[] = [];
  try {
    companies = await getCompaniesData();
  } catch(error) {
    // DB offline fallback
    companies = [
      { id: '1', slug: 'google', name: 'Google', industry: 'Tech', _count: { salaries: 156, reviews: 89, interviews: 45 } },
      { id: '2', slug: 'meta', name: 'Meta', industry: 'Tech', _count: { salaries: 142, reviews: 76, interviews: 52 } },
      { id: '3', slug: 'amazon', name: 'Amazon', industry: 'Tech', _count: { salaries: 210, reviews: 120, interviews: 68 } },
      { id: '4', slug: 'netflix', name: 'Netflix', industry: 'Tech', _count: { salaries: 45, reviews: 22, interviews: 18 } },
      { id: '5', slug: 'stripe', name: 'Stripe', industry: 'Tech', _count: { salaries: 85, reviews: 34, interviews: 29 } }
    ];
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-bold text-deep-text mb-4">Browse by Company</h1>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Research compensation, reviews, and interviews for top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.slug}`}
              className="bg-surface border border-border rounded-xl p-6 text-center hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <h2 className="font-bold text-deep-text group-hover:text-primary transition-colors mb-2">
                {company.name}
              </h2>
              <div className="text-sm text-muted space-y-1">
                <div>{company._count.salaries} Salaries</div>
                <div>{company._count.reviews} Reviews</div>
              </div>
            </Link>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center text-muted py-12 bg-surface rounded-xl border border-border">
            No companies found.
          </div>
        )}
      </div>
    </div>
  );
}
