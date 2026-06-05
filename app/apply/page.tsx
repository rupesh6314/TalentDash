'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ApplyPage() {
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
          <h2 className="text-2xl font-bold text-deep-text mb-2">Application Submitted!</h2>
          <p className="text-body-text mb-6">Your details have been successfully sent to the employer.</p>
          <Button href="/jobs" variant="primary">Back to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/jobs" className="text-primary hover:underline mb-6 inline-block font-medium">
          ← Back to Jobs
        </Link>
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-deep-text mb-2">Submit Your Details</h1>
          <p className="text-body-text mb-8">Please provide your contact information and experience to apply for this role.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Full Name</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Email Address</label>
                <input required type="email" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Phone Number</label>
                <input required type="tel" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. +1 234 567 890" />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-text mb-1">Location</label>
                <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Bengaluru, India" />
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-lg font-medium text-deep-text mb-4">Professional Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">Current Company</label>
                  <input type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. Google" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">Years of Experience</label>
                  <input required type="number" min="0" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="e.g. 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-text mb-1">LinkedIn Profile</label>
                  <input type="url" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-2 focus:outline-none focus:border-primary" placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition w-full md:w-auto">
                Submit Application
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
