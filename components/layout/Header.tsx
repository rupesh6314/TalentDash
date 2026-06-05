'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';


const navItems = [
  { label: 'Companies', href: '/companies' },
  { label: 'Salaries', href: '/salaries' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Interviews', href: '/interviews' },
  { label: 'Community', href: '/community' },
  { label: 'Tools', href: '/tools' },
  { label: 'Compare', href: '/compare' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-deep-text flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">T</div>
          TalentDash
        </Link>
        <nav className="hidden md:flex gap-6 font-medium">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="text-body-text hover:text-primary transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Log in</Button>
          <Button variant="primary">Sign up</Button>
        </div>
        <button className="md:hidden text-deep-text" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border p-4 space-y-2 bg-surface">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="block py-2 text-body-text hover:text-primary">
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
}