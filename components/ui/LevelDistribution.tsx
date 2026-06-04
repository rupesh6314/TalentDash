const COLORS = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 
  'bg-pink-500', 'bg-cyan-500', 'bg-rose-500', 'bg-indigo-500'
];

export function LevelDistribution({ distribution }: { distribution: Record<string, number> }) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  const entries = Object.entries(distribution).map(([level, count]) => ({ level, percent: (count / total) * 100 }));
  return (
    <div className="my-6">
      <div className="h-4 flex rounded-full overflow-hidden mb-3">
        {entries.map(({ level, percent }, idx) => (
          <div 
            key={level} 
            style={{ width: `${percent}%` }} 
            className={`${COLORS[idx % COLORS.length]} transition-all duration-300 hover:opacity-80`} 
            title={`${level}: ${percent.toFixed(1)}%`} 
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
        {entries.map(({ level, percent }, idx) => (
          <div key={level} className="flex items-center gap-1.5 uppercase tracking-wide">
            <span className={`w-3 h-3 rounded-full ${COLORS[idx % COLORS.length]}`}></span>
            {level} <span className="text-gray-400">({percent.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}