const levelBadges: Record<string, string> = {
  L3: 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200', L4: 'bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200', L5: 'bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200',
  STAFF: 'bg-purple-200 dark:bg-purple-900/50 dark:text-purple-200', PRINCIPAL: 'bg-navy-800 text-white dark:bg-indigo-600',
};

export function SalaryTable({ salaries }: { salaries: any[] }) {
  const formatMoney = (amount: number) => `$${amount.toLocaleString('en-US')}`;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead className="bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 text-left border-b border-gray-200 dark:border-gray-800">
          <tr>
            <th className="p-3 font-semibold">Company</th><th className="p-3 font-semibold">Role</th><th className="p-3 font-semibold">Level</th>
            <th className="p-3 font-semibold">Location</th><th className="p-3 font-semibold">Exp</th><th className="p-3 font-semibold">Base</th><th className="p-3 font-semibold">Bonus</th><th className="p-3 font-semibold">Stock</th>
            <th className="p-3 font-semibold text-brand dark:text-blue-400">Total</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(s => {
            const companySlug = s.company?.slug || 'unknown';
            const companyName = s.company?.name || 'Unknown';
            return (
              <tr key={s.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-300 transition-colors">
                <td className="p-3">
                  <a href={`/companies/${companySlug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {companyName}
                  </a>
                </td>
                <td className="p-3">{s.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${levelBadges[s.level] || 'bg-gray-100'}`}>
                    {s.level}
                  </span>
                </td>
                <td className="p-3">{s.location}</td>
                <td className="p-3">{s.experienceYears}y</td>
                <td className="p-3">{formatMoney(s.baseSalary)}</td>
                <td className="p-3">{s.bonus ? formatMoney(s.bonus) : '—'}</td>
                <td className="p-3">{s.stock ? formatMoney(s.stock) : '—'}</td>
                <td className="p-3 font-bold text-brand dark:text-blue-400 text-lg">{formatMoney(s.totalCompensation)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}