'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type CompareOption = {
  id: string;
  label: string;
};

export function CompareDropdowns({ options }: { options: CompareOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialS1 = searchParams.get('s1') || '';
  const initialS2 = searchParams.get('s2') || '';

  const [s1, setS1] = useState(initialS1);
  const [s2, setS2] = useState(initialS2);

  // Sync state if URL changes externally
  useEffect(() => {
    if (initialS1 !== s1) setS1(initialS1);
    if (initialS2 !== s2) setS2(initialS2);
  }, [initialS1, initialS2]);

  const handleCompare = () => {
    if (s1 && s2 && s1 !== s2) {
      router.push(`/compare?s1=${s1}&s2=${s2}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Select Records to Compare</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Record A</label>
          <select 
            className="w-full border-gray-300 border rounded-lg px-4 py-2 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            value={s1}
            onChange={(e) => {
              setS1(e.target.value);
            }}
          >
            <option value="">— Select a record —</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id} disabled={opt.id === s2}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Record B</label>
          <select 
            className="w-full border-gray-300 border rounded-lg px-4 py-2 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            value={s2}
            onChange={(e) => {
              setS2(e.target.value);
            }}
          >
            <option value="">— Select a record —</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id} disabled={opt.id === s1}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleCompare}
          disabled={!s1 || !s2 || s1 === s2}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Compare Offers
        </button>
      </div>
    </div>
  );
}
