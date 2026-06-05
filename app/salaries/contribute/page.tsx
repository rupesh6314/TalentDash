'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ContributeSalaryPage() {
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
          <h2 className="text-2xl font-bold text-deep-text mb-2">Thank you!</h2>
          <p className="text-body-text mb-6">Your salary information has been submitted securely and anonymously. It will help thousands of engineers make better career decisions.</p>
          <Button href="/salaries" variant="primary">Back to Salaries</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/salaries" className="text-primary hover:underline mb-6 inline-block font-medium">
          ← Back to Salary Explorer
        </Link>
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-deep-text mb-2">Contribute Your Salary</h1>
          <p className="text-body-text mb-8">Your submission is 100% anonymous. Help the community by sharing accurate data.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Company</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Google" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Role</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Level</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. L4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Location</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Bengaluru" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Years of Experience</label>
                <input required type="number" min="0" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. 5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Currency</label>
                <select className="w-full border border-border bg-surface text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-lg font-medium text-deep-text mb-4">Compensation Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">Base Salary</label>
                  <input required type="number" min="0" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="Amount" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">Stock / Equity (per year)</label>
                  <input type="number" min="0" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="Amount" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">Bonus</label>
                  <input type="number" min="0" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="Amount" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition w-full md:w-auto">
                Submit Anonymously
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
