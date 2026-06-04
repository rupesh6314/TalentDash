import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { CompareDropdowns } from '@/components/compare/CompareDropdowns';
import { CompareContent } from '@/components/compare/CompareContent';

export const revalidate = 60; // Revalidate every minute

export default async function ComparePage() {
  // Fetch all salaries to populate the dropdowns
  const salaries = await prisma.salary.findMany({
    include: {
      company: true,
    },
    orderBy: [
      { company: { name: 'asc' } },
      { role: 'asc' }
    ]
  });

  const options = salaries.map(s => {
    const formattedComp = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: s.currency,
      maximumFractionDigits: 0
    }).format(Number(s.totalCompensation));

    return {
      id: s.id,
      label: `${s.company.name} - ${s.role} (${s.level}) - ${formattedComp}`
    };
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Offer Comparison</h1>
        
        <Suspense fallback={<div className="h-24 bg-gray-200 animate-pulse rounded-xl mb-8"></div>}>
          <CompareDropdowns options={options} />
        </Suspense>

        <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading compare page...</div>}>
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}