import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = { title: 'RSU Vesting Tracker | TalentDash' };

export default function RSUTrackerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-background min-h-screen">
      <Link href="/tools" className="text-primary hover:underline mb-6 inline-block font-bold">← Back to Tools</Link>
      <h1 className="text-[36px] font-bold text-deep-text mb-2">RSU Vesting Tracker</h1>
      <p className="text-body-text text-lg mb-8">Visualize your stock vesting schedule and predict your upcoming refreshers.</p>

      <Card className="p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Company Ticker</label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-2 bg-surface" placeholder="AAPL" />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Initial Grant Value ($)</label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-2 bg-surface" placeholder="$200,000" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-deep-text mb-1">Vesting Schedule</label>
            <select className="w-full border border-border rounded-lg px-4 py-2 bg-surface">
              <option>4 Years (1-year cliff, then monthly)</option>
              <option>4 Years (1-year cliff, then quarterly)</option>
              <option>3 Years (Equal annually)</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="button" className="bg-primary text-white w-full py-3 rounded-lg font-bold">Generate Vesting Schedule</button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-xl font-bold text-deep-text mb-4">Upcoming Vests (Mock Data)</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-surface rounded-lg border border-border">
              <div>
                <div className="font-bold text-deep-text">Oct 15, 2026</div>
                <div className="text-sm text-muted">Quarterly vest (125 shares)</div>
              </div>
              <div className="text-success font-bold text-xl">~$24,500</div>
            </div>
            <div className="flex justify-between items-center p-4 bg-surface rounded-lg border border-border">
              <div>
                <div className="font-bold text-deep-text">Jan 15, 2027</div>
                <div className="text-sm text-muted">Quarterly vest (125 shares)</div>
              </div>
              <div className="text-success font-bold text-xl">~$24,500</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
