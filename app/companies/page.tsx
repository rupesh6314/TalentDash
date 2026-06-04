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
  const companies = await getCompaniesData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse by Company</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Research compensation, reviews, and interviews for top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.slug}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {company.name}
              </h2>
              <div className="text-xs text-gray-500 space-y-1">
                <div>{company._count.salaries} Salaries</div>
                <div>{company._count.reviews} Reviews</div>
              </div>
            </Link>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No companies found. Add some companies to the database.
          </div>
        )}
      </div>
    </div>
  );
}
