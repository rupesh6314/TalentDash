type CardProps = { children: React.ReactNode; className?: string; hover?: boolean };

export function Card({ children, className = '', hover = false }: CardProps) {
  const base = 'bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`${base} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}