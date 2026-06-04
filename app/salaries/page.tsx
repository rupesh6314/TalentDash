import { prisma } from '@/lib/prisma';
import SalaryExplorer from '@/components/salaries/SalaryExplorer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const revalidate = 60; // Revalidate every minute

export default async function SalariesPage() {
  const salaries = await prisma.salary.findMany({
    include: {
      company: true,
    },
    orderBy: {
      totalCompensation: 'desc'
    }
  });

  const serializedSalaries = salaries.map(s => ({
    id: s.id,
    companyName: s.company.name,
    role: s.role,
    level: s.level,
    location: s.location,
    experienceYears: s.experienceYears,
    baseSalary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    totalCompensation: Number(s.totalCompensation),
    currency: s.currency
  }));

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Salary Data</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Verified compensation records from engineers across top tech companies.</p>
          </div>
          <div>
            {/* Keeping the add salary functionality accessible somewhere, maybe redirect it to a new page or just a button */}
            <Button variant="primary" href="/salaries/contribute">
              Contribute Salary
            </Button>
          </div>
        </div>
        
        <SalaryExplorer salaries={serializedSalaries} />
      </div>
    </div>
  );
}