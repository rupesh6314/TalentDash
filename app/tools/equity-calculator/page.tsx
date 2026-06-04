'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function EquityCalculatorPage() {
  const [shares, setShares] = useState<number>(1000);
  const [strikePrice, setStrikePrice] = useState<number>(10);
  const [currentPrice, setCurrentPrice] = useState<number>(50);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  const value = shares * (currentPrice - strikePrice);
  const isPositive = value > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Equity Calculator</h1>
      <p className="text-gray-600 mb-8">Estimate the value of your equity compensation.</p>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Number of Shares</label>
            <input type="number" value={shares} onChange={(e) => setShares(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Strike Price ({currency})</label>
            <input type="number" value={strikePrice} onChange={(e) => setStrikePrice(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Current Price ({currency})</label>
            <input type="number" value={currentPrice} onChange={(e) => setCurrentPrice(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')} className="w-full px-4 py-2 border rounded-lg">
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-500">Estimated Equity Value</div>
            <div className={`text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {currency === 'USD' ? '$' : '₹'}{Math.abs(value).toLocaleString('en-US')}
              {!isPositive && ' (negative)'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}