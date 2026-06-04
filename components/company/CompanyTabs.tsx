'use client';
import { useState } from 'react';

export function CompanyTabs({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <>
      <div className="border-b mb-4 flex gap-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)} className={`py-2 px-1 -mb-px ${active === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find(t => t.id === active)?.content}</div>
    </>
  );
}