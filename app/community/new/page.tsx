'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NewDiscussionPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-xl shadow-sm border border-border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            💬
          </div>
          <h2 className="text-2xl font-bold text-deep-text mb-2">Discussion Posted!</h2>
          <p className="text-body-text mb-6">Your discussion has been published to the community.</p>
          <Button href="/community" variant="primary">Back to Forum</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/community" className="text-primary hover:underline mb-6 inline-block font-medium">
          ← Back to Forum
        </Link>
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-deep-text mb-2">Start a Discussion</h1>
          <p className="text-body-text mb-8">Share your thoughts, ask questions, or start a debate with the tech community.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Title</label>
              <input required type="text" className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary" placeholder="What's on your mind?" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Community Tag</label>
              <select className="w-full border border-border bg-surface text-body-text rounded-lg px-4 py-3 focus:outline-none focus:border-primary">
                <option>General</option>
                <option>Software Engineering</option>
                <option>Product Management</option>
                <option>Data Science</option>
                <option>Career Advice</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Content</label>
              <textarea required rows={8} className="w-full border border-border bg-transparent text-body-text rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-primary" placeholder="Write the details here..."></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:brightness-110 transition w-full md:w-auto">
                Post Discussion
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
