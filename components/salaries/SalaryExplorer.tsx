'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export type SalaryRecord = {
  id: string;
  companyName: string;
  role: string;
  level: string;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus: number;
  stock: number;
  totalCompensation: number;
  currency: string;
};

export default function SalaryExplorer({ salaries }: { salaries: SalaryRecord[] }) {
  const router = useRouter();
  
  // Filters
  const [searchCompany, setSearchCompany] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [filterLocation, setFilterLocation] = useState('All Locations');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [filterCurrency, setFilterCurrency] = useState('All');
  
  // Compare selection
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const locations = useMemo(() => Array.from(new Set(salaries.map(s => s.location))).sort(), [salaries]);
  const levels = useMemo(() => Array.from(new Set(salaries.map(s => s.level))).sort(), [salaries]);

  const filteredSalaries = useMemo(() => {
    return salaries.filter(s => {
      const matchCompany = s.companyName.toLowerCase().includes(searchCompany.toLowerCase());
      const matchRole = s.role.toLowerCase().includes(searchRole.toLowerCase());
      const matchLocation = filterLocation === 'All Locations' || s.location === filterLocation;
      const matchLevel = filterLevel === 'All Levels' || s.level === filterLevel;
      const matchCurrency = filterCurrency === 'All' || s.currency === filterCurrency;
      return matchCompany && matchRole && matchLocation && matchLevel && matchCurrency;
    });
  }, [salaries, searchCompany, searchRole, filterLocation, filterLevel, filterCurrency]);

  const totalPages = Math.ceil(filteredSalaries.length / itemsPerPage);
  const paginatedSalaries = filteredSalaries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatMoney = (amount: number, currency: string) => {
    if (currency === 'INR') {
      if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
      return `₹${amount.toLocaleString('en-US')}`;
    }
    if (currency === 'USD') {
      if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
      return `$${amount.toLocaleString('en-US')}`;
    }
    return amount.toLocaleString('en-US');
  };

  const handleCompareToggle = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };



  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
      {/* Filter Bar */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Company</label>
          <input 
            type="text" 
            placeholder="Search company..." 
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={searchCompany}
            onChange={e => { setSearchCompany(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Role</label>
          <input 
            type="text" 
            placeholder="Search role..." 
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={searchRole}
            onChange={e => { setSearchRole(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Location</label>
          <select 
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={filterLocation}
            onChange={e => { setFilterLocation(e.target.value); setCurrentPage(1); }}
          >
            <option>All Locations</option>
            {locations.map(loc => <option key={loc}>{loc}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Level</label>
          <select 
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={filterLevel}
            onChange={e => { setFilterLevel(e.target.value); setCurrentPage(1); }}
          >
            <option>All Levels</option>
            {levels.map(lvl => <option key={lvl}>{lvl}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Currency</label>
          <select 
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            value={filterCurrency}
            onChange={e => { setFilterCurrency(e.target.value); setCurrentPage(1); }}
          >
            <option>All</option>
            <option>INR</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      {/* Compare Banner */}
      {selectedForCompare.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-3 border-b border-blue-100 dark:border-blue-800 flex items-center justify-between">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{selectedForCompare.length}</strong> salary record(s) selected for comparison.
          </div>
          {selectedForCompare.length === 2 ? (
            <Link 
              href={`/compare?s1=${selectedForCompare[0]}&s2=${selectedForCompare[1]}`}
              className="px-4 py-1.5 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 block"
            >
              Compare Selected
            </Link>
          ) : (
            <button 
              disabled
              className="px-4 py-1.5 text-sm font-semibold rounded bg-blue-200 text-blue-400 dark:bg-blue-800 dark:text-blue-500 cursor-not-allowed"
            >
              Compare Selected
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/80 border-b dark:border-gray-800">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Select</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Company</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Role</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Level</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Location</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Exp ↕</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Base ↕</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Stock</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Total Comp ↓</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginatedSalaries.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No salaries found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedSalaries.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={selectedForCompare.includes(s.id)}
                      onChange={() => handleCompareToggle(s.id)}
                      className="rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{s.companyName}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{s.role}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s.level}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s.location}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s.experienceYears}y</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatMoney(s.baseSalary, s.currency)}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{formatMoney(s.stock, s.currency)}</td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">{formatMoney(s.totalCompensation, s.currency)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredSalaries.length)} of {filteredSalaries.length} records
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
