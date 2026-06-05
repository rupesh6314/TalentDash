import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = { title: 'Global Tech Salary Heatmap | TalentDash' };

export default function HeatmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-[36px] font-bold text-deep-text mb-2">Global Tech Salary Heatmap</h1>
        <p className="text-body-text text-lg">Visualizing software engineering compensation across the world.</p>
        <Link href="/salaries" className="text-primary font-bold mt-4 inline-block">← Back to Salaries</Link>
      </div>

      <Card className="p-8 text-center bg-surface border-border">
        <div className="w-full flex justify-center bg-black rounded-lg border border-border overflow-hidden shadow-lg">
          <img 
            src="/heatmap.png" 
            alt="Global Tech Salary Heatmap Visualization" 
            className="w-full max-h-[600px] object-cover opacity-90 hover:opacity-100 transition duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
          <div className="p-4 bg-white rounded shadow-sm border border-border">
            <h3 className="font-bold text-deep-text text-lg mb-1">San Francisco Bay Area</h3>
            <div className="text-success font-bold text-xl">$180k - $250k</div>
            <div className="text-sm text-muted">Median Base Salary</div>
          </div>
          <div className="p-4 bg-white rounded shadow-sm border border-border">
            <h3 className="font-bold text-deep-text text-lg mb-1">New York City</h3>
            <div className="text-success font-bold text-xl">$160k - $220k</div>
            <div className="text-sm text-muted">Median Base Salary</div>
          </div>
          <div className="p-4 bg-white rounded shadow-sm border border-border">
            <h3 className="font-bold text-deep-text text-lg mb-1">London, UK</h3>
            <div className="text-success font-bold text-xl">£90k - £130k</div>
            <div className="text-sm text-muted">Median Base Salary</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
