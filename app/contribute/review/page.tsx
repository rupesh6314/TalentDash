'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContributeReviewPage() {
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
          <h2 className="text-2xl font-bold text-deep-text mb-2">Review Submitted!</h2>
          <p className="text-body-text mb-6">Thank you for sharing your experience. Your review helps others make informed decisions.</p>
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
          <h1 className="text-3xl font-bold text-deep-text mb-2">Write a Review</h1>
          <p className="text-body-text mb-8">Share your honest feedback about your current or past employer.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Company Name</label>
              <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. Meta" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Overall Rating (1-5)</label>
              <input required type="number" min="1" max="5" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary" placeholder="e.g. 4" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Pros</label>
              <textarea required rows={3} className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-primary" placeholder="What are the best parts about working here?"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Cons</label>
              <textarea required rows={3} className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-primary" placeholder="What could be improved?"></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition w-full md:w-auto">
                Submit Review
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
