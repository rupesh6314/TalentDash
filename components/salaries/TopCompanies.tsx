import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function TopCompanies({ companies }: { companies: { name: string; slug: string; avgComp: number; growth?: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {companies.map(c => (
        <Card key={c.slug} hover className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-lg">{c.name}</div>
              <div className="text-brand-600 text-2xl font-bold mt-1">${c.avgComp.toLocaleString('en-US')}</div>
              <div className="text-xs text-gray-500">Avg. total comp</div>
              {c.growth && <div className="text-green-600 text-sm mt-2">{c.growth}</div>}
            </div>
            <Button variant="outline" size="sm" href={`/companies/${c.slug}`}>View →</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}