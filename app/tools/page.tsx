import React from 'react';
import Link from 'next/link';

import { Card } from '@/components/ui/Card';

export const metadata = { title: 'Career Tools | TalentDash' };

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-2">Career Tools</h1>
        <p className="text-body-text text-lg">Calculators and tools to help you manage your tech career.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover className="p-6">
          <h2 className="text-2xl font-bold text-deep-text mb-2">Take-home Pay Calculator</h2>
          <p className="text-body-text mb-4">Calculate your actual take-home pay after taxes and deductions.</p>
          <Link href="/tools/calculator" className="bg-primary text-white px-4 py-2 rounded font-bold inline-block">Try Calculator</Link>
        </Card>
        <Card hover className="p-6">
          <h2 className="text-2xl font-bold text-deep-text mb-2">RSU Vesting Tracker</h2>
          <p className="text-body-text mb-4">Visualize your stock vesting schedule and predict future net worth.</p>
          <Link href="/tools/rsu-tracker" className="bg-primary text-white px-4 py-2 rounded font-bold inline-block">Try Tracker</Link>
        </Card>
      </div>
    </div>
  );
}