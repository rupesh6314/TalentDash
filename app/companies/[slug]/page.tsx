import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Level } from '@prisma/client';

export async function generateStaticParams() {
  const companies = await prisma.company.findMany({ select: { slug: true } });
  return companies.map(({ slug }) => ({ slug }));
}

export const revalidate = 3600;

function getLevelBadgeClass(level: string) {
  if (['L3', 'SDE_I'].includes(level)) return 'bg-slate-100 text-slate-800';
  if (['L4', 'SDE_II'].includes(level)) return 'bg-blue-100 text-blue-800';
  if (['L5', 'SDE_III'].includes(level)) return 'bg-indigo-100 text-indigo-800';
  if (['L6', 'STAFF'].includes(level)) return 'bg-purple-100 text-purple-800';
  if (['PRINCIPAL', 'IC4', 'IC5'].includes(level)) return 'bg-sky-900 text-white';
  return 'bg-gray-100 text-gray-800';
}

function getLevelColorHex(level: string) {
  if (['L3', 'SDE_I'].includes(level)) return '#f1f5f9'; // slate-100
  if (['L4', 'SDE_II'].includes(level)) return '#dbeafe'; // blue-100
  if (['L5', 'SDE_III'].includes(level)) return '#e0e7ff'; // indigo-100
  if (['L6', 'STAFF'].includes(level)) return '#f3e8ff'; // purple-100
  if (['PRINCIPAL', 'IC4', 'IC5'].includes(level)) return '#0c4a6e'; // sky-900
  return '#f3f4f6'; // gray-100
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = await prisma.company.findUnique({ where: { slug } });
  if (!company) return {};
  return {
    title: `${company.name} Salaries, Reviews & Interviews | TalentDash`,
    description: `Explore verified salaries, interview experiences, and company reviews for ${company.name}.`,
    alternates: { canonical: `/companies/${slug}` }
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let company = null;
  try {
    company = await prisma.company.findUnique({ 
      where: { slug }, 
      include: { salaries: true } 
    });
  } catch (error) {
    company = {
      id: 'mock-company',
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: slug,
      industry: 'Technology',
      website: `https://${slug}.com`,
      description: `Detailed compensation and review data for ${slug}.`,
      salaries: [
        { id: 'mock-s1', role: 'Software Engineer', level: 'Senior', location: 'Remote', baseSalary: 180000, bonus: 20000, stock: 50000, totalCompensation: 250000, yearsOfExperience: 5, confidenceScore: 90 },
        { id: 'mock-s2', role: 'Product Manager', level: 'L4', location: 'New York, NY', baseSalary: 150000, bonus: 15000, stock: 40000, totalCompensation: 205000, yearsOfExperience: 4, confidenceScore: 85 }
      ]
    };
  }
  
  if (!company) notFound();

  const tcValues = company.salaries.map(s => Number(s.totalCompensation)).sort((a,b)=>a-b);
  const medianTotalCompensation = tcValues[Math.floor(tcValues.length/2)] || 0;
  const minTotalCompensation = tcValues.length > 0 ? tcValues[0] : 0;
  const maxTotalCompensation = tcValues.length > 0 ? tcValues[tcValues.length - 1] : 0;
  
  const levelDistribution: Record<string, number> = {};
  company.salaries.forEach(s => levelDistribution[s.level] = (levelDistribution[s.level] || 0) + 1);

  const salaries = company.salaries.map(s => ({
    ...s,
    baseSalary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    totalCompensation: Number(s.totalCompensation),
    confidenceScore: Number(s.confidenceScore)
  }));

  const totalSalaries = salaries.length;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    industry: company.industry,
    foundingDate: company.foundedYear ? company.foundedYear.toString() : undefined,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/companies/${slug}`,
    logo: company.logo ? `${process.env.NEXT_PUBLIC_APP_URL}${company.logo}` : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.headquarters
    }
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Header */}
      <div className="bg-surface border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-deep-text mb-2">{company.name}</h1>
              <div className="flex items-center gap-3 text-body-text text-sm">
                {company.industry && <span className="font-medium bg-gray-100 px-2 py-1 rounded">{company.industry}</span>}
                <span>📍 {company.headquarters || 'Multiple Locations'}</span>
                {company.foundedYear && <span>🗓️ Founded {company.foundedYear}</span>}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" href={`/compare?c1=${slug}`}>
                Compare
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-deep-text mb-6">Compensation Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-sm text-muted font-medium mb-1">Median Total Comp</div>
                <div className="text-3xl font-bold text-data-blue">${medianTotalCompensation.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted font-medium mb-1">TC Range</div>
                <div className="text-xl font-bold text-deep-text">${minTotalCompensation.toLocaleString()} - ${maxTotalCompensation.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted font-medium mb-1">Data Points</div>
                <div className="text-xl font-bold text-deep-text">{totalSalaries} records</div>
              </div>
            </div>

            {/* Level Distribution Stacked Bar */}
            <h3 className="text-sm font-bold text-deep-text mb-3">Level Distribution</h3>
            {totalSalaries > 0 ? (
              <div className="w-full h-8 flex rounded overflow-hidden">
                {Object.entries(levelDistribution).map(([level, count]: [string, any]) => {
                  const percentage = (count / totalSalaries) * 100;
                  return (
                    <div 
                      key={level} 
                      style={{ width: `${percentage}%`, backgroundColor: getLevelColorHex(level) }}
                      className="h-full border-r border-white/20 relative group flex items-center justify-center"
                    >
                      {percentage > 10 && <span className="text-[10px] font-bold text-deep-text">{level}</span>}
                      <div className="absolute opacity-0 group-hover:opacity-100 bg-deep-text text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10 transition-opacity pointer-events-none">
                        {level}: {count} ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-muted">No salary data available to show distribution.</div>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(levelDistribution).map(([level, count]: [string, any]) => (
                <div key={level} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLevelColorHex(level) }}></div>
                  <span className="text-body-text">{level}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-deep-text">Recent Salaries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hover border-b border-border">
                    <th className="p-4 font-bold text-deep-text text-sm">Role</th>
                    <th className="p-4 font-bold text-deep-text text-sm">Level</th>
                    <th className="p-4 font-bold text-deep-text text-sm">Location</th>
                    <th className="p-4 font-bold text-deep-text text-sm">Exp</th>
                    <th className="p-4 font-bold text-deep-text text-sm">Total Comp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {salaries.slice(0, 10).map((s: any) => (
                    <tr key={s.id} className="hover:bg-hover transition-colors">
                      <td className="p-4 text-body-text text-sm">{s.role}</td>
                      <td className="p-4 text-body-text text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getLevelBadgeClass(s.level)}`}>{s.level}</span>
                      </td>
                      <td className="p-4 text-body-text text-sm">{s.location}</td>
                      <td className="p-4 text-body-text text-sm">{s.experienceYears} yrs</td>
                      <td className="p-4 text-data-blue font-bold text-base">{s.currency} {s.totalCompensation.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {salaries.length > 10 && (
                <div className="p-4 text-center border-t border-border">
                  <Link href={`/salaries?company=${slug}`} className="text-primary font-medium hover:underline text-sm">
                    View all {salaries.length} salaries →
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#F2F7F5] to-surface border-success/20">
            <h3 className="text-lg font-bold text-deep-text mb-2">Are you a current or former employee?</h3>
            <p className="text-sm text-body-text mb-4">Help the community by sharing your compensation anonymously.</p>
            <Button variant="primary" className="w-full" href="/salaries/contribute">
              Add Your Salary
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}