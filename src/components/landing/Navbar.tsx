'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1D4641] shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              Eulogy<span className="text-[#85F199]">Writer</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#D4E9CA] hover:text-white transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-[#D4E9CA] hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* CTA */}
          <Link href="/generate">
            <Button variant="secondary" size="sm">
              Create yours free
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
