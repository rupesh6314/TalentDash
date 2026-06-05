import React from 'react';
import Link from 'next/link';

import { Card } from '@/components/ui/Card';

export const metadata = { title: 'Offers | TalentDash' };

export default function OffersPage() {
  const offers = [
    { id: 1, title: 'SDE II Offer', company: 'Amazon', tc: '₹45 LPA', status: 'Accepted' },
    { id: 2, title: 'Data Scientist Offer', company: 'Meta', tc: '₹55 LPA', status: 'Negotiating' },
    { id: 3, title: 'Product Manager Offer', company: 'Uber', tc: '₹38 LPA', status: 'Declined' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-2">Offer Evaluations</h1>
        <p className="text-body-text text-lg">Compare recent job offers and learn negotiation strategies.</p>
        <Link href="/" className="text-primary font-bold mt-4 inline-block">← Back to Home</Link>
      </div>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} hover className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-deep-text">{offer.title} @ {offer.company}</h2>
              <div className="text-muted text-sm mt-1">Status: {offer.status}</div>
            </div>
            <div className="text-right">
              <div className="text-pink-600 font-bold text-xl">{offer.tc}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
