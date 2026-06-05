'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';


const navItems = [
  { label: 'Companies', href: '/companies', hasDropdown: true },
  { label: 'Salaries', href: '/salaries' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Interviews', href: '/interviews' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Forum', href: '/community' },
  { label: 'Offers', href: '/offers' },
  { label: 'Tools', href: '/tools', hasDropdown: true },
  { label: 'Brands', href: '/brands', hasDropdown: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center text-sm">
        <Link href="/" className="text-xl font-bold text-deep-text flex items-center gap-2 mr-6">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs">T</div>
          TalentDash
        </Link>
        <nav className="hidden lg:flex gap-5 font-semibold">
          {navItems.map(item => (
            <Link key={item.label} href={item.href} className="text-deep-text hover:text-primary transition flex items-center gap-1">
              {item.label}
              {item.hasDropdown && (
                <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              )}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link href="/login" className="text-deep-text font-semibold hover:text-primary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
            Log in
          </Link>
          <Button variant="primary" className="font-bold px-4 py-2">Sign up</Button>
          <Link href="/contribute" className="text-deep-text font-semibold hover:text-primary flex items-center gap-2 ml-2">
            <span className="text-lg">♡</span> Contribute
          </Link>
          <Link href="/employer" className="text-deep-text font-semibold hover:text-primary flex items-center gap-2 ml-2">
            <span className="text-lg">💼</span> Employer
          </Link>
        </div>
        <button className="lg:hidden text-deep-text ml-auto" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border p-4 space-y-2 bg-surface">
          {navItems.map(item => (
            <Link key={item.label} href={item.href} className="block py-2 text-deep-text font-semibold hover:text-primary">
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Link href="/login" className="font-semibold text-deep-text">Log in</Link>
            <Button variant="primary" className="w-full justify-center">Sign up</Button>
            <Link href="/contribute" className="font-semibold text-deep-text">♡ Contribute</Link>
            <Link href="/employer" className="font-semibold text-deep-text">💼 Employer</Link>
          </div>
        </div>
      )}
    </header>
  );
}