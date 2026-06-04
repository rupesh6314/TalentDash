'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/Button';

export function FilterBar({ initialFilters = {} }: { initialFilters?: Record<string, string> }) {
  const router = useRouter();
  const pathname = usePathname();
  const update = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl shadow-sm border">
      <input type="text" placeholder="Company" defaultValue={initialFilters.company} onChange={e => update('company', e.target.value)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
      <input type="text" placeholder="Role" defaultValue={initialFilters.role} onChange={e => update('role', e.target.value)} className="px-4 py-2 border rounded-lg" />
      <select defaultValue={initialFilters.level} onChange={e => update('level', e.target.value)} className="px-4 py-2 border rounded-lg">
        <option value="">All Levels</option>
        <option value="L3">L3</option><option value="L4">L4</option><option value="L5">L5</option>
        <option value="STAFF">Staff</option><option value="PRINCIPAL">Principal</option>
      </select>
      <input type="text" placeholder="Location" defaultValue={initialFilters.location} onChange={e => update('location', e.target.value)} className="px-4 py-2 border rounded-lg" />
      {(initialFilters.company || initialFilters.role || initialFilters.level || initialFilters.location) && (
        <Button variant="outline" onClick={() => router.push(pathname)}>Clear all</Button>
      )}
    </div>
  );
}