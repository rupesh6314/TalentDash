type CardProps = { children: React.ReactNode; className?: string; hover?: boolean };

export function Card({ children, className = '', hover = false }: CardProps) {
  const base = 'bg-surface rounded-xl shadow-sm border border-border overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`${base} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}