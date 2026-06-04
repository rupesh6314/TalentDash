import { prisma } from '@/lib/prisma';
import { SalaryTable } from '@/components/ui/SalaryTable';
import { LevelDistribution } from '@/components/ui/LevelDistribution';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';

export async function generateStaticParams() {
  const companies = await prisma.company.findMany({ select: { slug: true } });
  return companies.map(({ slug }) => ({ slug }));
}

export const revalidate = 3600;

async function getCompanyData(slug: string) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      salaries: { include: { company: true }, orderBy: { totalCompensation: 'desc' } },
      reviews: true,
      interviews: true,
    },
  });
  if (!company) return null;
  const tcValues = company.salaries.map(s => Number(s.totalCompensation));
  const median = tcValues.sort((a,b)=>a-b)[Math.floor(tcValues.length/2)] || 0;
  const levelDist: Record<string, number> = {};
  company.salaries.forEach(s => levelDist[s.level] = (levelDist[s.level] || 0) + 1);
  const salaries = company.salaries.map(s => ({
    ...s,
    baseSalary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    totalCompensation: Number(s.totalCompensation),
  }));
  return { company, salaries, median, levelDist, reviews: company.reviews, interviews: company.interviews };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCompanyData(slug);
  if (!data) notFound();
  const { company, salaries, median, levelDist } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{company.name}</h1>
      <p className="text-gray-600 dark:text-gray-400">{company.headquarters} · Founded {company.foundedYear || 'N/A'}</p>

      <div className="grid grid-cols-3 gap-4 my-6">
        <Card className="p-4 text-center"><div className="text-sm text-gray-500 dark:text-gray-400">Median TC</div><div className="text-2xl font-bold text-gray-900 dark:text-white">${median.toLocaleString('en-US')}</div></Card>
        <Card className="p-4 text-center"><div className="text-sm text-gray-500 dark:text-gray-400">Salaries</div><div className="text-2xl font-bold text-gray-900 dark:text-white">{salaries.length}</div></Card>
        <Card className="p-4 text-center"><div className="text-sm text-gray-500 dark:text-gray-400">Industry</div><div className="text-2xl font-bold text-gray-900 dark:text-white">{company.industry || '—'}</div></Card>
      </div>

      <LevelDistribution distribution={levelDist} />
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Salaries at {company.name}</h2>
      <SalaryTable salaries={salaries} />
    </div>
  );
}