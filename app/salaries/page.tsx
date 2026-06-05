import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';

export const revalidate = 60;

function getLevelBadgeClass(level: string) {
  if (['L3', 'SDE_I'].includes(level)) return 'bg-slate-100 text-slate-800';
  if (['L4', 'SDE_II'].includes(level)) return 'bg-blue-100 text-blue-800';
  if (['L5', 'SDE_III'].includes(level)) return 'bg-indigo-100 text-indigo-800';
  if (['L6', 'STAFF'].includes(level)) return 'bg-purple-100 text-purple-800';
  if (['PRINCIPAL', 'IC4', 'IC5'].includes(level)) return 'bg-sky-900 text-white';
  return 'bg-gray-100 text-gray-800';
}

export default async function SalariesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const company = resolvedSearchParams.company ? String(resolvedSearchParams.company) : undefined;
  const role = resolvedSearchParams.role ? String(resolvedSearchParams.role) : undefined;
  const location = resolvedSearchParams.location ? String(resolvedSearchParams.location) : undefined;
  
  let salaries: any[] = [];
  
  try {
    // Direct Prisma Query
    const salariesData = await prisma.salary.findMany({
      where: {
        AND: [
          company ? { company: { name: { contains: company, mode: 'insensitive' } } } : {},
          role ? { role: { contains: role, mode: 'insensitive' } } : {},
          location ? { location: { contains: location, mode: 'insensitive' } } : {}
        ]
      },
      include: { company: true },
      orderBy: { submittedAt: 'desc' },
      take: 100
    });

    salaries = salariesData.map(s => ({
      ...s,
      baseSalary: Number(s.baseSalary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      totalCompensation: Number(s.totalCompensation),
      confidenceScore: Number(s.confidenceScore)
    }));
  } catch (error) {
    salaries = [
      { id: 'mock-1', company: { name: 'Google', slug: 'google' }, role: 'Software Engineer', level: 'L4', location: 'Mountain View, CA', baseSalary: 160000, bonus: 24000, stock: 80000, totalCompensation: 264000, yearsOfExperience: 3, confidenceScore: 95, submittedAt: new Date() },
      { id: 'mock-2', company: { name: 'Meta', slug: 'meta' }, role: 'Frontend Engineer', level: 'E5', location: 'Menlo Park, CA', baseSalary: 200000, bonus: 30000, stock: 120000, totalCompensation: 350000, yearsOfExperience: 6, confidenceScore: 92, submittedAt: new Date() },
      { id: 'mock-3', company: { name: 'Amazon', slug: 'amazon' }, role: 'Data Scientist', level: 'L5', location: 'Seattle, WA', baseSalary: 165000, bonus: 0, stock: 95000, totalCompensation: 260000, yearsOfExperience: 4, confidenceScore: 88, submittedAt: new Date() }
    ];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Tech Salaries Database',
    description: 'Verified compensation records from engineers across top tech companies.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/salaries`,
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-wider mb-2 uppercase">
              <span className="w-5 h-5 rounded bg-purple-100 text-purple-600 flex items-center justify-center">📈</span>
              SALARIES
            </div>
            <h1 className="text-[36px] font-bold text-deep-text mb-2">Real salary insights. Real career growth.</h1>
            <p className="text-body-text text-lg">Explore verified compensation data from professionals around the world.</p>
          </div>
          <Button variant="ghost" className="text-primary font-bold hidden md:flex border border-border bg-white" href="/salaries">
            Explore all salaries →
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-success text-xl">👥</div>
            <div><div className="font-bold text-deep-text text-lg">12.8M+</div><div className="text-[10px] font-medium text-muted">Salary data points<br/>Updated daily</div></div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">🏢</div>
            <div><div className="font-bold text-deep-text text-lg">35K+</div><div className="text-[10px] font-medium text-muted">Companies<br/>Across 50+ countries</div></div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl">💼</div>
            <div><div className="font-bold text-deep-text text-lg">900+</div><div className="text-[10px] font-medium text-muted">Job titles<br/>From entry to executive</div></div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xl">📈</div>
            <div><div className="font-bold text-deep-text text-lg">18%</div><div className="text-[10px] font-medium text-muted">YoY salary growth<br/>For tech roles globally</div></div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-success text-xl">✓</div>
            <div><div className="font-bold text-deep-text text-lg">100%</div><div className="text-[10px] font-medium text-muted">Verified & anonymous<br/>Real professionals only</div></div>
          </div>
        </div>

        {/* Explore Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-muted">Top paying companies</h3>
                <Link href="/companies" className="text-primary text-xs font-semibold">View all companies →</Link>
              </div>
              <div className="flex gap-4 overflow-hidden">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold mx-auto mb-2 text-lg">G</div>
                  <div className="text-xs font-bold">Google</div>
                  <div className="text-[10px] text-muted">$186K</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mx-auto mb-2 text-lg">M</div>
                  <div className="text-xs font-bold">Microsoft</div>
                  <div className="text-[10px] text-muted">$167K</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold mx-auto mb-2 text-lg">∞</div>
                  <div className="text-xs font-bold">Meta</div>
                  <div className="text-[10px] text-muted">$165K</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold mx-auto mb-2 text-lg"></div>
                  <div className="text-xs font-bold">Apple</div>
                  <div className="text-[10px] text-muted">$164K</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-bold mx-auto mb-2 text-lg">a</div>
                  <div className="text-xs font-bold">Amazon</div>
                  <div className="text-[10px] text-muted">$146K</div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-muted">Salary heatmap by role & location</h3>
                <Link href="/heatmap" className="text-primary text-xs font-semibold">View full heatmap →</Link>
              </div>
              <div className="flex flex-col gap-1 text-[8px] font-medium">
                <div className="flex gap-1 justify-end text-muted mb-1 w-full">
                  <span className="w-10 text-center">NY</span><span className="w-10 text-center">SF</span><span className="w-10 text-center">LDN</span><span className="w-10 text-center">BLR</span>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <span className="flex-1 text-deep-text">Software Eng</span>
                  <span className="w-10 py-1 bg-green-500 text-white text-center rounded">$158K</span><span className="w-10 py-1 bg-green-600 text-white text-center rounded">$178K</span><span className="w-10 py-1 bg-green-300 text-green-900 text-center rounded">$112K</span><span className="w-10 py-1 bg-yellow-200 text-yellow-900 text-center rounded">$67K</span>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <span className="flex-1 text-deep-text">Product Mgr</span>
                  <span className="w-10 py-1 bg-green-600 text-white text-center rounded">$175K</span><span className="w-10 py-1 bg-green-700 text-white text-center rounded">$196K</span><span className="w-10 py-1 bg-green-400 text-white text-center rounded">$129K</span><span className="w-10 py-1 bg-yellow-300 text-yellow-900 text-center rounded">$78K</span>
                </div>
                <div className="flex gap-1 items-center w-full">
                  <span className="flex-1 text-deep-text">Data Scientist</span>
                  <span className="w-10 py-1 bg-green-400 text-white text-center rounded">$145K</span><span className="w-10 py-1 bg-green-500 text-white text-center rounded">$160K</span><span className="w-10 py-1 bg-green-200 text-green-900 text-center rounded">$106K</span><span className="w-10 py-1 bg-orange-200 text-orange-900 text-center rounded">$57K</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-5 bg-gradient-to-b from-[#F2F7F5] to-white border-primary/20">
            <h3 className="font-bold text-sm text-muted mb-4">Explore salaries by</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-2 border border-border rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary">
                <span className="text-success">👥</span><span className="text-xs font-bold">Role</span>
              </div>
              <div className="bg-white p-2 border border-border rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary">
                <span className="text-blue-500">🏢</span><span className="text-xs font-bold">Company</span>
              </div>
              <div className="bg-white p-2 border border-border rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary">
                <span className="text-purple-500">📍</span><span className="text-xs font-bold">Location</span>
              </div>
              <div className="bg-white p-2 border border-border rounded flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary">
                <span className="text-orange-500">🎓</span><span className="text-xs font-bold">Experience</span>
              </div>
            </div>
          </Card>
        </div>

        
        {/* We will build SalaryExplorer as a Client Component for interactivity later */}
        <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-hover">
                <th className="p-4 font-bold text-deep-text text-sm">Company</th>
                <th className="p-4 font-bold text-deep-text text-sm">Role</th>
                <th className="p-4 font-bold text-deep-text text-sm">Level</th>
                <th className="p-4 font-bold text-deep-text text-sm">Location</th>
                <th className="p-4 font-bold text-deep-text text-sm">Experience</th>
                <th className="p-4 font-bold text-deep-text text-sm">Base Salary</th>
                <th className="p-4 font-bold text-deep-text text-sm">Stock</th>
                <th className="p-4 font-bold text-deep-text text-sm">Total Comp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {salaries.map((s: any) => (
                <tr key={s.id} className="hover:bg-hover transition-colors">
                  <td className="p-4 text-body-text text-sm font-medium capitalize">{s.company.name}</td>
                  <td className="p-4 text-body-text text-sm">{s.role}</td>
                  <td className="p-4 text-body-text text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getLevelBadgeClass(s.level)}`}>{s.level}</span>
                  </td>
                  <td className="p-4 text-body-text text-sm">{s.location}</td>
                  <td className="p-4 text-body-text text-sm">{s.experienceYears} yrs</td>
                  <td className="p-4 text-body-text text-sm">{s.currency} {s.baseSalary.toLocaleString()}</td>
                  <td className="p-4 text-body-text text-sm">{s.stock > 0 ? s.stock.toLocaleString() : '—'}</td>
                  <td className="p-4 text-data-blue font-bold text-lg">{s.currency} {s.totalCompensation.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {salaries.length === 0 && (
            <div className="p-8 text-center text-body-text">
              No records found for these filters. Try removing a filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}