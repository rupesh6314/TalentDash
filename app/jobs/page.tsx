import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export const metadata = { title: 'Jobs | TalentDash' };

export default function JobsPage() {
  const jobs = [
    { id: 1, title: 'Senior Frontend Engineer', company: 'Google', location: 'Mountain View, CA', salary: '$180k - $250k', type: 'Full-time' },
    { id: 2, title: 'Product Manager', company: 'Stripe', location: 'Remote', salary: '$150k - $210k', type: 'Full-time' },
    { id: 3, title: 'Backend Developer', company: 'Netflix', location: 'Los Gatos, CA', salary: '$200k - $300k', type: 'Full-time' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-2">Find Your Next Role</h1>
        <p className="text-body-text text-lg">Curated tech jobs from top companies.</p>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} hover className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-deep-text">{job.title}</h2>
              <div className="text-muted text-sm mt-1">{job.company} • {job.location} • {job.type}</div>
            </div>
            <div className="text-right">
              <div className="text-success font-bold mb-2">{job.salary}</div>
              <Link href="/apply" className="text-sm bg-primary hover:brightness-110 text-white px-5 py-2 rounded font-medium transition-all">Apply</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
