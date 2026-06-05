import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = { title: 'Take-home Pay Calculator | TalentDash' };

export default function CalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-background min-h-screen">
      <Link href="/tools" className="text-primary hover:underline mb-6 inline-block font-bold">← Back to Tools</Link>
      <h1 className="text-[36px] font-bold text-deep-text mb-2">Take-home Pay Calculator</h1>
      <p className="text-body-text text-lg mb-8">Calculate your net income after taxes, 401(k), and deductions.</p>

      <Card className="p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">Base Salary</label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-2 bg-surface" placeholder="$150,000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-text mb-1">State</label>
              <select className="w-full border border-border rounded-lg px-4 py-2 bg-surface">
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
                <option>Washington</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-deep-text mb-1">401(k) Contribution (%)</label>
            <input type="number" className="w-full border border-border rounded-lg px-4 py-2 bg-surface" placeholder="5" />
          </div>

          <div className="pt-4">
            <button type="button" className="bg-primary text-white w-full py-3 rounded-lg font-bold">Calculate Net Pay</button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-xl font-bold text-deep-text mb-4">Estimated Take-home (Mock Data)</h3>
          <div className="flex justify-between items-center text-body-text mb-2"><span>Gross Pay (Monthly)</span> <span>$12,500</span></div>
          <div className="flex justify-between items-center text-body-text mb-2"><span>Federal Tax</span> <span className="text-danger">-$2,100</span></div>
          <div className="flex justify-between items-center text-body-text mb-2"><span>State Tax</span> <span className="text-danger">-$950</span></div>
          <div className="flex justify-between items-center text-deep-text font-bold text-lg mt-4 pt-4 border-t border-border">
            <span>Net Take-home</span>
            <span className="text-success">$9,450 / month</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
