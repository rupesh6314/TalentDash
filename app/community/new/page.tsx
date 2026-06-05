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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 transition-colors duration-200">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            💬
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Discussion Posted!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your discussion has been published to the community.</p>
          <Button href="/community" variant="primary">Back to Forum</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block font-medium">
          ← Back to Forum
        </Link>
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Start a Discussion</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Share your thoughts, ask questions, or start a debate with the tech community.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input required type="text" className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3" placeholder="What's on your mind?" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Community Tag</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3">
                <option>General</option>
                <option>Software Engineering</option>
                <option>Product Management</option>
                <option>Data Science</option>
                <option>Career Advice</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
              <textarea required rows={8} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 resize-none" placeholder="Write the details here..."></textarea>
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
