'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type CompanyOption = { slug: string; name: string };
type CompanyData = {
  company: { name: string; industry: string; headquarters: string };
  medianTotalCompensation: number;
  minTotalCompensation: number;
  maxTotalCompensation: number;
  salaries: any[];
};

export default function OfferComparator({ companies }: { companies: CompanyOption[] }) {
  const [c1Slug, setC1Slug] = useState<string>('');
  const [c2Slug, setC2Slug] = useState<string>('');
  const [data1, setData1] = useState<CompanyData | null>(null);
  const [data2, setData2] = useState<CompanyData | null>(null);
  
  const [isManual, setIsManual] = useState(false);
  const [manual1, setManual1] = useState<number>(0);
  const [manual2, setManual2] = useState<number>(0);

  useEffect(() => {
    // Read from URL initially if present
    const params = new URLSearchParams(window.location.search);
    const p1 = params.get('c1');
    const p2 = params.get('c2');
    if (p1) setC1Slug(p1);
    if (p2) setC2Slug(p2);
  }, []);

  useEffect(() => {
    if (c1Slug) {
      fetch(`/api/companies/${c1Slug}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.company) {
            setData1(data);
          } else {
            setData1(null);
          }
        })
        .catch(() => setData1(null));
      const url = new URL(window.location.href);
      url.searchParams.set('c1', c1Slug);
      window.history.replaceState({}, '', url);
    } else {
      setData1(null);
    }
  }, [c1Slug]);

  useEffect(() => {
    if (c2Slug) {
      fetch(`/api/companies/${c2Slug}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.company) {
            setData2(data);
          } else {
            setData2(null);
          }
        })
        .catch(() => setData2(null));
      const url = new URL(window.location.href);
      url.searchParams.set('c2', c2Slug);
      window.history.replaceState({}, '', url);
    } else {
      setData2(null);
    }
  }, [c2Slug]);

  const val1 = isManual ? manual1 : (data1?.medianTotalCompensation || 0);
  const val2 = isManual ? manual2 : (data2?.medianTotalCompensation || 0);

  const deltaAbs = Math.abs(val1 - val2);
  const deltaPct = val2 > 0 ? (deltaAbs / Math.min(val1, val2)) * 100 : 0;
  
  return (
    <div className="space-y-8">
      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <label className="block text-sm font-bold text-deep-text mb-2">Company 1</label>
          <select 
            className="w-full p-3 bg-surface border border-border rounded-lg text-body-text outline-none focus:border-primary"
            value={c1Slug}
            onChange={(e) => setC1Slug(e.target.value)}
          >
            <option value="">Select a company...</option>
            {companies.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </Card>
        <Card className="p-6">
          <label className="block text-sm font-bold text-deep-text mb-2">Company 2</label>
          <select 
            className="w-full p-3 bg-surface border border-border rounded-lg text-body-text outline-none focus:border-primary"
            value={c2Slug}
            onChange={(e) => setC2Slug(e.target.value)}
          >
            <option value="">Select a company...</option>
            {companies.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-body-text">Use API Data</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isManual} onChange={(e) => setIsManual(e.target.checked)} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
        <span className="text-sm font-medium text-body-text">Manual Override</span>
      </div>

      {isManual && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-6 rounded-xl border border-border">
          <div>
            <label className="block text-sm font-bold text-deep-text mb-2">Your Offer 1 (USD)</label>
            <input type="number" value={manual1} onChange={(e) => setManual1(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-deep-text mb-2">Your Offer 2 (USD)</label>
            <input type="number" value={manual2} onChange={(e) => setManual2(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-lg" />
          </div>
        </div>
      )}

      {/* Comparison Display */}
      {data1 && data2 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className={`p-6 border-2 ${val1 > val2 ? 'border-success' : 'border-border'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-deep-text">{data1.company.name}</h2>
                  <p className="text-sm text-body-text">{data1.company.industry}</p>
                </div>
                {val1 > val2 && <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Winner</span>}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted">Median Total Compensation</div>
                  <div className={`text-4xl font-bold ${val1 > val2 ? 'text-success' : 'text-deep-text'}`}>
                    ${val1.toLocaleString()}
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <div className="text-sm text-muted">Records</div>
                  <div className="font-medium text-deep-text">{data1.salaries.length}</div>
                </div>
              </div>
            </Card>

            <Card className={`p-6 border-2 ${val2 > val1 ? 'border-success' : 'border-border'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-deep-text">{data2.company.name}</h2>
                  <p className="text-sm text-body-text">{data2.company.industry}</p>
                </div>
                {val2 > val1 && <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Winner</span>}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted">Median Total Compensation</div>
                  <div className={`text-4xl font-bold ${val2 > val1 ? 'text-success' : 'text-deep-text'}`}>
                    ${val2.toLocaleString()}
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <div className="text-sm text-muted">Records</div>
                  <div className="font-medium text-deep-text">{data2.salaries.length}</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 text-center bg-gradient-to-br from-[#F2F7F5] to-surface border-success/20">
            <h3 className="text-lg font-bold text-deep-text mb-2">Compensation Delta</h3>
            <div className="flex items-center justify-center gap-4 text-3xl font-bold text-success">
              <span>${deltaAbs.toLocaleString()}</span>
              <span className="text-muted text-2xl font-normal">|</span>
              <span>{deltaPct.toFixed(1)}% difference</span>
            </div>
            <p className="text-sm text-body-text mt-4">
              {val1 > val2 ? data1.company.name : (val2 > val1 ? data2.company.name : 'Both')} offers a more competitive median package based on {isManual ? 'your input' : 'community data'}.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
