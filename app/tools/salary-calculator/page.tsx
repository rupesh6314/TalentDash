'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SalaryCalculatorPage() {
  const [salary, setSalary] = useState<number>(100000);
  const [taxRate, setTaxRate] = useState<number>(30);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  const takeHome = salary * (1 - taxRate / 100);
  const monthly = takeHome / 12;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Salary Calculator</h1>
      <p className="text-gray-600 mb-8">Estimate your take‑home pay after taxes.</p>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Annual Salary ({currency})</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div className="pt-4 border-t">
            <div className="text-lg font-semibold">Results</div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <div className="text-sm text-gray-500">Gross Annual</div>
                <div className="text-xl font-bold">{currency === 'USD' ? '$' : '₹'}{salary.toLocaleString('en-US')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Taxes</div>
                <div className="text-xl text-red-600">-{currency === 'USD' ? '$' : '₹'}{((salary * taxRate) / 100).toLocaleString('en-US')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Take‑Home Annual</div>
                <div className="text-xl font-bold text-green-600">{currency === 'USD' ? '$' : '₹'}{takeHome.toLocaleString('en-US')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Take‑Home Monthly</div>
                <div className="text-xl font-bold text-green-600">{currency === 'USD' ? '$' : '₹'}{monthly.toLocaleString('en-US')}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}