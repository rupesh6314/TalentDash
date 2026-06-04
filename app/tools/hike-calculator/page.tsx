'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function HikeCalculatorPage() {
  const [currentSalary, setCurrentSalary] = useState<number>(100000);
  const [hikePercent, setHikePercent] = useState<number>(15);
  const newSalary = currentSalary * (1 + hikePercent / 100);
  const increase = newSalary - currentSalary;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Hike Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your new salary after a hike.</p>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Current Salary ($)</label>
            <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hike Percentage (%)</label>
            <input type="number" value={hikePercent} onChange={(e) => setHikePercent(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-500">New Salary</div>
            <div className="text-3xl font-bold text-green-600">${newSalary.toLocaleString('en-US')}</div>
            <div className="text-sm text-green-600 mt-1">+${increase.toLocaleString('en-US')} increase</div>
          </div>
        </div>
      </Card>
    </div>
  );
}