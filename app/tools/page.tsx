import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const revalidate = 3600; // ISR

const tools = [
  {
    name: 'Salary Calculator',
    description: 'Calculate your take‑home salary after taxes and deductions.',
    href: '/tools/salary-calculator',
    icon: '💰',
  },
  {
    name: 'Equity Calculator',
    description: 'Estimate the value of your equity compensation.',
    href: '/tools/equity-calculator',
    icon: '📈',
  },
  {
    name: 'Offer Letter Comparison',
    description: 'Compare multiple job offers side by side.',
    href: '/tools/offer-comparison',
    icon: '⚖️',
  },
  {
    name: 'Salary Hike Calculator',
    description: 'Calculate your salary increase percentage.',
    href: '/tools/hike-calculator',
    icon: '📊',
  },
  {
    name: 'Tax Estimator',
    description: 'Estimate your taxes based on your salary and location.',
    href: '/tools/tax-estimator',
    icon: '🧾',
  },
  {
    name: 'Stock Option Simulator',
    description: 'Simulate the value of your stock options over time.',
    href: '/tools/stock-options',
    icon: '📉',
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Career Tools</h1>
      <p className="text-gray-600 mb-8">Free tools to help you make better career decisions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.name} hover className="p-6">
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <Button variant="outline" href={tool.href}>
              Use Tool →
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}