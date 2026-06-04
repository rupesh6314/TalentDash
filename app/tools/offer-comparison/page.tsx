'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function OfferComparisonPage() {
  const [offer1, setOffer1] = useState({ base: 120000, bonus: 20000, equity: 30000, currency: 'USD' });
  const [offer2, setOffer2] = useState({ base: 110000, bonus: 25000, equity: 35000, currency: 'USD' });

  const total1 = offer1.base + offer1.bonus + offer1.equity;
  const total2 = offer2.base + offer2.bonus + offer2.equity;
  const diff = total1 - total2;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Offer Comparison</h1>
      <p className="text-gray-600 mb-8">Compare two job offers side by side.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Offer A</h2>
          <div className="space-y-3">
            <div><label className="font-medium">Base Salary:</label> <input type="number" value={offer1.base} onChange={(e) => setOffer1({...offer1, base: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
            <div><label className="font-medium">Bonus:</label> <input type="number" value={offer1.bonus} onChange={(e) => setOffer1({...offer1, bonus: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
            <div><label className="font-medium">Equity:</label> <input type="number" value={offer1.equity} onChange={(e) => setOffer1({...offer1, equity: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
          </div>
          <div className="mt-4 pt-2 border-t"><span className="font-bold">Total: ${total1.toLocaleString('en-US')}</span></div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Offer B</h2>
          <div className="space-y-3">
            <div><label className="font-medium">Base Salary:</label> <input type="number" value={offer2.base} onChange={(e) => setOffer2({...offer2, base: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
            <div><label className="font-medium">Bonus:</label> <input type="number" value={offer2.bonus} onChange={(e) => setOffer2({...offer2, bonus: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
            <div><label className="font-medium">Equity:</label> <input type="number" value={offer2.equity} onChange={(e) => setOffer2({...offer2, equity: Number(e.target.value)})} className="ml-2 px-2 py-1 border rounded" /></div>
          </div>
          <div className="mt-4 pt-2 border-t"><span className="font-bold">Total: ${total2.toLocaleString('en-US')}</span></div>
        </Card>
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-semibold">Difference (A - B)</h3>
        <div className={`text-2xl font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {diff >= 0 ? '+' : ''}{diff.toLocaleString('en-US')} {diff >= 0 ? '→ Offer A pays more' : '→ Offer B pays more'}
        </div>
      </div>
    </div>
  );
}