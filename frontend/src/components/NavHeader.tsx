'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/buildings', label: 'Buildings' },
  { href: '/maintenance', label: 'Maintenance' },
];

export function NavHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border-col)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg text-[var(--text)]">
              DClaw Building
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={
                      isActive
                        ? 'px-3 py-1.5 rounded-md font-medium bg-[var(--accent-col)] text-white transition-colors'
                        : 'px-3 py-1.5 rounded-md font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border-col)]/40 transition-colors'
                    }
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
