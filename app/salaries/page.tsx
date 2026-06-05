import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const revalidate = 60; 

async function getSalaries(searchParams: { [key: string]: string | string[] | undefined }) {
  const urlParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) value.forEach(v => urlParams.append(key, v));
      else urlParams.append(key, value);
    }
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/salaries?${urlParams.toString()}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch salaries');
  return res.json();
}

function getLevelBadgeClass(level: string) {
  if (['L3', 'SDE_I'].includes(level)) return 'bg-slate-100 text-slate-800';
  if (['L4', 'SDE_II'].includes(level)) return 'bg-blue-100 text-blue-800';
  if (['L5', 'SDE_III'].includes(level)) return 'bg-indigo-100 text-indigo-800';
  if (['L6', 'STAFF'].includes(level)) return 'bg-purple-100 text-purple-800';
  if (['PRINCIPAL', 'IC4', 'IC5'].includes(level)) return 'bg-sky-900 text-white';
  return 'bg-gray-100 text-gray-800';
}

export default async function SalariesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { data: salaries, meta } = await getSalaries(searchParams);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[36px] font-bold text-deep-text mb-2">Real salary insights. Real career growth.</h1>
            <p className="text-body-text text-lg">Explore verified compensation data from professionals around the world.</p>
          </div>
          <div>
            <Button variant="primary" href="/salaries/contribute">
              Add your salary
            </Button>
          </div>
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