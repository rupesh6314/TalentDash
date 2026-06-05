import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Button({ children, variant = 'primary', size = 'md', isLoading, className = '', onClick, href }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  const variants = {
    primary: 'bg-primary text-white hover:brightness-110 focus:ring-primary shadow-sm',
    secondary: 'bg-hover text-deep-text hover:bg-gray-200 focus:ring-muted',
    outline: 'border border-border text-body-text hover:bg-hover focus:ring-primary',
    ghost: 'text-muted hover:bg-hover focus:ring-muted hover:text-deep-text',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' };
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) return <Link href={href} className={classes} prefetch={true}>{children}</Link>;
  return <button onClick={onClick} disabled={isLoading} className={classes}>{isLoading ? '...' : children}</button>;
}