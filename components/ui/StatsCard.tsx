import { Card } from './Card';

export function StatsCard({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <Card className="p-6 text-center">
      <div className="text-3xl font-bold text-blue-600">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
      {trend && <div className="text-sm text-green-600 mt-2">{trend}</div>}
    </Card>
  );
}