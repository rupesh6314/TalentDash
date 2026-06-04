'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

import { ThemeToggle } from '@/components/ui/ThemeToggle';

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
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          TalentDash
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="dark:text-gray-300 dark:hover:bg-gray-800">Log in</Button>
          <Button variant="primary">Sign up</Button>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="block py-2 text-gray-700 hover:text-blue-600">
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