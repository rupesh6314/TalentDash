'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export function CompareContent() {
  const searchParams = useSearchParams();
  const s1 = searchParams.get('s1');
  const s2 = searchParams.get('s2');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (s1 && s2 && s1 !== s2) {
      setLoading(true);
      setError(null);
      fetch(`/api/compare?s1=${s1}&s2=${s2}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch comparison data');
          return res.json();
        })
        .then(setData)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setData(null);
      setError(null);
    }
  }, [s1, s2]);

  if (!s1 || !s2) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="text-5xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compare Two Offers</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Select two salary records from above or the Salary Explorer to compare them side-by-side.</p>
        <Link href="/salaries" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Go to Salary Explorer
        </Link>
      </div>
    );
  }

  if (loading) return <div className="text-center py-12 text-gray-500 animate-pulse">Analyzing compensation data...</div>;
  if (error) return <div className="text-center py-12 text-red-600 font-medium">Error: {error}</div>;
  if (!data) return <div className="text-center py-12 text-gray-600">No data found. Try a different selection.</div>;

  const { record1, record2, delta } = data;
  const winner = delta.tcDelta > 0 ? 'Record A' : delta.tcDelta < 0 ? 'Record B' : 'Tie';
  
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') return val.toLocaleString('en-US');
    return val;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Record 1 */}
        <Card className={`p-8 border-2 ${winner === 'Record A' ? 'border-green-400 bg-green-50/10 dark:bg-green-900/10' : 'border-transparent'}`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{record1.company.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{record1.role} · {record1.level}</p>
            </div>
            {winner === 'Record A' && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Winner
              </span>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="text-gray-500 dark:text-gray-400">Location</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{record1.location}</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="text-gray-500 dark:text-gray-400">Experience</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{record1.experienceYears} years</span>
            </div>
            <div className="pt-4">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Total Compensation ({record1.currency})</span>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {record1.currency === 'USD' ? '$' : '₹'}{formatValue(record1.totalCompensation)}
              </p>
            </div>
          </div>
        </Card>

        {/* Record 2 */}
        <Card className={`p-8 border-2 ${winner === 'Record B' ? 'border-green-400 bg-green-50/10 dark:bg-green-900/10' : 'border-transparent'}`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{record2.company.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{record2.role} · {record2.level}</p>
            </div>
            {winner === 'Record B' && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Winner
              </span>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="text-gray-500 dark:text-gray-400">Location</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{record2.location}</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="text-gray-500 dark:text-gray-400">Experience</span>
              <span className="font-medium text-gray-900 dark:text-gray-200">{record2.experienceYears} years</span>
            </div>
            <div className="pt-4">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Total Compensation ({record2.currency})</span>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {record2.currency === 'USD' ? '$' : '₹'}{formatValue(record2.totalCompensation)}
              </p>
            </div>
          </div>
        </Card>

        {/* Delta / Difference */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mt-4">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b dark:border-gray-800 pb-4">Comparison Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Comp Diff</div>
              <div className={`text-xl font-bold ${delta.tcDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {delta.tcDelta > 0 ? '+' : ''}{formatValue(delta.tcDelta)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Base Salary Diff</div>
              <div className={`text-xl font-bold ${delta.baseDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {delta.baseDelta > 0 ? '+' : ''}{formatValue(delta.baseDelta)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bonus Diff</div>
              <div className={`text-xl font-bold ${delta.bonusDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {delta.bonusDelta > 0 ? '+' : ''}{formatValue(delta.bonusDelta)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Stock Diff</div>
              <div className={`text-xl font-bold ${delta.stockDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {delta.stockDelta > 0 ? '+' : ''}{formatValue(delta.stockDelta)}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-6 text-center">
            * Positive numbers mean Record A pays more. Negative numbers mean Record B pays more. 
            Comparisons are best made when both currencies are the same.
          </p>
        </div>
      </div>
    </div>
  );
}
