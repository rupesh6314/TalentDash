const levelBadges: Record<string, string> = {
  L3: 'bg-gray-200', L4: 'bg-blue-200', L5: 'bg-indigo-200',
  STAFF: 'bg-purple-200', PRINCIPAL: 'bg-navy-800 text-white',
};

export function SalaryTable({ salaries }: { salaries: any[] }) {
  const formatMoney = (amount: number) => `$${amount.toLocaleString('en-US')}`;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Company</th><th>Role</th><th>Level</th>
            <th>Location</th><th>Exp</th><th>Base</th><th>Bonus</th><th>Stock</th>
            <th className="text-brand">Total</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(s => {
            const companySlug = s.company?.slug || 'unknown';
            const companyName = s.company?.name || 'Unknown';
            return (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <a href={`/companies/${companySlug}`} className="text-blue-600">
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
                <td className="font-bold text-brand text-lg">{formatMoney(s.totalCompensation)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}