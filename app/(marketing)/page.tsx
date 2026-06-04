import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/ui/StatsCard';
import { TopCompanies } from '@/components/salaries/TopCompanies';
import { SalaryHeatmap } from '@/components/salaries/SalaryHeatmap';

export const revalidate = 3600; // ISR – revalidate every hour

async function getHomeData() {
  // Total counts
  const totalSalaries = await prisma.salary.count();
  const totalCompanies = await prisma.company.count();

  // Top 4 companies by highest salary (take the highest salary per company)
  const topCompaniesRaw = await prisma.company.findMany({
    take: 4,
    include: {
      salaries: {
        orderBy: { totalCompensation: 'desc' },
        take: 1,
      },
    },
  });

  const topCompanies = topCompaniesRaw.map((c) => ({
    name: c.name,
    slug: c.slug,
    avgComp: Number(c.salaries[0]?.totalCompensation || 0),
    growth: '+19% vs last year',
  }));

  // Heatmap: average total compensation by location and role (top 12)
  const heatmapDataRaw = await prisma.salary.groupBy({
    by: ['location', 'role'],
    _avg: { totalCompensation: true },
    take: 12,
    orderBy: { _avg: { totalCompensation: 'desc' } },
  });

  const heatmapData = heatmapDataRaw.map((d) => ({
    location: d.location,
    role: d.role,
    avgComp: Number(d._avg.totalCompensation),
  }));

  return { totalSalaries, totalCompanies, topCompanies, heatmapData };
}

export default async function HomePage() {
  const { totalSalaries, totalCompanies, topCompanies, heatmapData } = await getHomeData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 text-white overflow-hidden transition-colors duration-200">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">Explore. Compare. Grow.</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 dark:text-gray-300">
            Real salaries, honest reviews, and insider insights from millions of professionals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg" href="/salaries">
              Explore Salaries
            </Button>
            <Button variant="outline" size="lg" href="/community" className="border-white text-white hover:bg-white/10">
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              value={`${(totalSalaries / 1000).toFixed(1)}K+`}
              label="Salary Data Points"
              trend="Updated daily"
            />
            <StatsCard value={`${totalCompanies}+`} label="Companies Researched" trend="Across 50+ countries" />
            <StatsCard value="100% Free" label="No hidden charges" trend="Real professionals only" />
          </div>
        </div>
      </section>

      {/* Top Paying Companies */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Top Paying Companies</h2>
          <TopCompanies companies={topCompanies} />
          <div className="text-center mt-8">
            <Button variant="outline" href="/companies">
              View all companies →
            </Button>
          </div>
        </div>
      </section>

      {/* Salary Heatmap */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Salary Heatmap by Role & Location</h2>
          <SalaryHeatmap data={heatmapData} />
          <div className="text-center mt-8">
            <Button variant="outline" href="/salaries">
              Explore full heatmap →
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Add your salary & unlock all insights</h2>
          <p className="text-lg mb-6 opacity-90">
            Help thousands of professionals by sharing your salary anonymously.
          </p>
          <Button
            size="lg"
            href="/salaries/contribute"
            className="bg-white !text-blue-600 hover:bg-blue-50 font-bold shadow-lg"
          >
            Contribute now →
          </Button>
        </div>
      </section>
    </div>
  );
}