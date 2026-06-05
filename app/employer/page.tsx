import { Card } from '@/components/ui/Card';

export const metadata = { title: 'For Employers | TalentDash' };

export default function EmployerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-background min-h-screen text-center">
      <h1 className="text-[42px] font-bold text-deep-text mb-4">TalentDash for Employers</h1>
      <p className="text-body-text text-lg mb-10">Attract top tech talent, manage your employer brand, and gain insights into compensation trends.</p>

      <Card className="p-8 text-left bg-gradient-to-br from-surface to-blue-50 border-blue-100 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-deep-text">Claim your Company Profile</h2>
        <p className="mb-6 text-body-text">Join hundreds of companies managing their brand directly on TalentDash. Respond to reviews, update your perks, and post jobs directly to active candidates.</p>
        <button className="bg-deep-text text-white px-6 py-3 rounded-lg font-bold">Get Started for Free</button>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4">
          <div className="text-blue-600 font-bold text-xl mb-2">10M+</div>
          <div className="text-sm text-muted">Active job seekers</div>
        </div>
        <div className="p-4">
          <div className="text-blue-600 font-bold text-xl mb-2">Real-time</div>
          <div className="text-sm text-muted">Market intelligence</div>
        </div>
        <div className="p-4">
          <div className="text-blue-600 font-bold text-xl mb-2">Targeted</div>
          <div className="text-sm text-muted">Job postings</div>
        </div>
      </div>
    </div>
  );
}
