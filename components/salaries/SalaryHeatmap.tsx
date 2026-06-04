'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SalaryHeatmap({ data }: { data: { location: string; role: string; avgComp: number }[] }) {
  const [view, setView] = useState<'role' | 'location'>('role');
  const grouped = data.reduce((acc, item) => {
    const key = view === 'role' ? item.role : item.location;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof data>);

  return (
    <Card className="p-6">
      <div className="flex gap-2 mb-6">
        <Button variant={view === 'role' ? 'primary' : 'outline'} size="sm" onClick={() => setView('role')}>By Role</Button>
        <Button variant={view === 'location' ? 'primary' : 'outline'} size="sm" onClick={() => setView('location')}>By Location</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(grouped).slice(0, 6).map(([key, items]) => {
          const maxComp = Math.max(...items.map(i => i.avgComp));
          const intensity = (items[0].avgComp / maxComp) * 100;
          return (
            <div key={key} className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50" style={{ borderLeftColor: `rgba(59,130,246,${intensity/100})`, borderLeftWidth: '4px' }}>
              <div className="font-semibold text-lg">{key}</div>
              <div className="text-brand-600 text-xl font-bold">${Math.round(items[0].avgComp).toLocaleString('en-US')}</div>
              <div className="text-xs text-gray-500 mt-1">{items[0].location} · {items[0].role}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}