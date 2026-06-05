import React from 'react';
import Link from 'next/link';

import { Card } from '@/components/ui/Card';

export const metadata = { title: 'Brands | TalentDash' };

export default function BrandsPage() {
  const brands = [
    { id: 1, name: 'Google', rating: 4.8, type: 'Tech Giant' },
    { id: 2, name: 'Stripe', rating: 4.9, type: 'Fintech' },
    { id: 3, name: 'OpenAI', rating: 4.7, type: 'AI Research' },
    { id: 4, name: 'Microsoft', rating: 4.6, type: 'Tech Giant' },
    { id: 5, name: 'Apple', rating: 4.5, type: 'Consumer Tech' },
    { id: 6, name: 'Netflix', rating: 4.4, type: 'Entertainment Tech' },
    { id: 7, name: 'Amazon', rating: 3.9, type: 'E-commerce & Cloud' },
    { id: 8, name: 'Meta', rating: 4.2, type: 'Social Media' },
    { id: 9, name: 'Nvidia', rating: 4.8, type: 'Hardware & AI' },
    { id: 10, name: 'Uber', rating: 4.1, type: 'Transportation Tech' },
    { id: 11, name: 'Airbnb', rating: 4.5, type: 'Travel Tech' },
    { id: 12, name: 'Snowflake', rating: 4.6, type: 'Cloud Data' },
    { id: 13, name: 'Databricks', rating: 4.5, type: 'Cloud Data' },
    { id: 14, name: 'Palantir', rating: 4.0, type: 'Data Analytics' },
    { id: 15, name: 'Atlassian', rating: 4.6, type: 'Enterprise Software' },
    { id: 16, name: 'Adobe', rating: 4.4, type: 'Creative Software' },
    { id: 17, name: 'Salesforce', rating: 4.3, type: 'Enterprise Software' },
    { id: 18, name: 'LinkedIn', rating: 4.7, type: 'Professional Network' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-2">Top Employer Brands</h1>
        <p className="text-body-text text-lg">Discover the most sought-after companies in tech.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} hover className="p-6 text-center">
            <h2 className="text-2xl font-bold text-deep-text mb-2">{brand.name}</h2>
            <div className="text-warning font-bold text-lg mb-1">⭐ {brand.rating}/5</div>
            <div className="text-muted text-sm">{brand.type}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
