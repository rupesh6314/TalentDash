import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = { title: 'Contribute | TalentDash' };

export default function ContributePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 bg-background min-h-screen text-center">
      <h1 className="text-[42px] font-bold text-deep-text mb-4">Help the Community Grow</h1>
      <p className="text-body-text text-lg mb-10">Your anonymous contributions help millions of professionals make better career decisions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <Link href="/salaries/contribute" className="block">
          <Card hover className="p-6 h-full border-transparent hover:border-primary/50 transition">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2 text-deep-text">Add a Salary</h3>
            <p className="text-sm text-body-text">Share your compensation details to help demystify tech salaries.</p>
          </Card>
        </Link>
        <Link href="/contribute/review" className="block">
          <Card hover className="p-6 h-full border-transparent hover:border-primary/50 transition">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="font-bold text-lg mb-2 text-deep-text">Write a Review</h3>
            <p className="text-sm text-body-text">Review your current or past employer's culture and benefits.</p>
          </Card>
        </Link>
        <Link href="/contribute/interview" className="block">
          <Card hover className="p-6 h-full border-transparent hover:border-primary/50 transition">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-bold text-lg mb-2 text-deep-text">Share Interview Experience</h3>
            <p className="text-sm text-body-text">Help others prepare by sharing the questions you were asked.</p>
          </Card>
        </Link>
        <Link href="/contribute/offer" className="block">
          <Card hover className="p-6 h-full border-transparent hover:border-primary/50 transition">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="font-bold text-lg mb-2 text-deep-text">Evaluate an Offer</h3>
            <p className="text-sm text-body-text">Post your offer details to get negotiation advice from peers.</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
