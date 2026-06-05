export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'info' | 'error' }) {
  const variants = {
    default: 'bg-hover text-deep-text',
    success: 'bg-[#E5F3E6] text-success',
    warning: 'bg-[#FFF7E5] text-warning',
    error: 'bg-[#FBEAEA] text-error',
    info: 'bg-[#E5F0F6] text-data-blue',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>;
}