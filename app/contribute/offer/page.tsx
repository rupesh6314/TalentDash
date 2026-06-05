'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContributeOfferPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-xl shadow-sm border border-border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-deep-text mb-2">Offer Submitted!</h2>
          <p className="text-body-text mb-6">Your offer details have been shared with the community for evaluation.</p>
          <Button href="/contribute" variant="primary">Back to Contribute</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/contribute" className="text-primary hover:underline mb-6 inline-block font-medium">
          ← Back to Contribute
        </Link>
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-deep-text mb-2">Evaluate an Offer</h1>
          <p className="text-body-text mb-8">Share your offer details to get negotiation advice and see if it aligns with market rates.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Company</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Amazon" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Role / Level</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. SDE II (L5)" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Base Salary</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. $150k" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Sign-on Bonus</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. $20k" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Stock (4 yr)</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. $100k RSUs" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition w-full md:w-auto">
                Post Offer
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
