'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

type NavItem = { href: string; label: string; external?: boolean };

const navItems: NavItem[] = [
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/writing', label: 'writing' },
  { href: '/miscellany', label: 'miscellany' },
  { href: '/vibes', label: 'vibes' },
  { href: '/now', label: 'now' },
];

// How far around the menu's own box the cursor still wakes it (px).
const PROXIMITY_X = 150; // horizontal reach (toward the content)
const PROXIMITY_Y = 90; // vertical reach (around the items only)
// Above this (with a real pointer) we show the rail and reserve a left gutter
// for it in CSS (see globals.css); below it we fall back to the hamburger.
const SIDEBAR_MIN_WIDTH = 768;

export default function PageNav() {
  const pathname = usePathname();
  // 'sidebar' = proximity rail (mouse + room); 'drawer' = tap-to-toggle (touch / narrow).
  const [mode, setMode] = useState<'sidebar' | 'drawer'>('sidebar');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Mode from input capability, not just width.
  useEffect(() => {
    const hoverQuery = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const compute = () => {
      setMode(hoverQuery.matches && window.innerWidth >= SIDEBAR_MIN_WIDTH ? 'sidebar' : 'drawer');
    };
    compute();
    window.addEventListener('resize', compute);
    hoverQuery.addEventListener('change', compute);
    return () => {
      window.removeEventListener('resize', compute);
      hoverQuery.removeEventListener('change', compute);
    };
  }, []);

  // Proximity: wake the menu when the cursor nears the left side — even while
  // it's still over the main text — rather than only on direct hover.
  useEffect(() => {
    if (mode !== 'sidebar') return;
    const onMove = (e: MouseEvent) => {
      const el = navRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setActive(
        e.clientX >= r.left - PROXIMITY_X &&
          e.clientX <= r.right + PROXIMITY_X &&
          e.clientY >= r.top - PROXIMITY_Y &&
          e.clientY <= r.bottom + PROXIMITY_Y
      );
    };
    const onLeave = () => setActive(false);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [mode]);

  // Close the drawer on navigation.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (mode === 'drawer') {
    return (
      <div>
        <button
          type="button"
          aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((o) => !o)}
          className="fixed left-4 top-4 z-[60] rounded-md p-1.5 text-gray-700 backdrop-blur-sm transition-colors hover:bg-gray-200/60 dark:text-gray-200 dark:hover:bg-gray-700/50"
        >
          {drawerOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        {/* Drawer */}
        <nav
          className={`fixed left-0 top-0 z-50 flex h-full w-56 flex-col gap-4 border-r border-gray-200 bg-white px-6 pt-16 dark:border-gray-800 dark:bg-[#1A1A1E] transition-transform duration-300 ease-out ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Link
            href="/"
            aria-label="Home"
            onClick={() => setDrawerOpen(false)}
            className="mb-2 flex-shrink-0"
          >
            <Image src="/favicon.png" alt="favicon" width={24} height={24} />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={() => setDrawerOpen(false)}
              className={`whitespace-nowrap text-sm hover:underline ${
                pathname === item.href ? 'underline' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    );
  }

  // mode === 'sidebar' — the menu words rest in a fixed strip hugging the left
  // edge, right-aligned so they line up neatly, brightening as the cursor nears.
  // Pinning to a fixed-width strip (rather than the centered content) keeps a
  // small constant margin from the page edge and never lets labels run off-page.
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-40 w-32">
      <nav
        ref={navRef}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="pointer-events-auto absolute right-0 top-[4.5rem] flex flex-col items-end gap-3 pr-4 text-right"
      >
        <Link href="/" aria-label="Home" className="mb-2 flex-shrink-0">
          <Image src="/favicon.png" alt="favicon" width={24} height={24} />
        </Link>
        {navItems.map((item) => {
          const current = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`whitespace-nowrap text-sm hover:underline transition-opacity duration-300 ease-out ${
                active ? 'opacity-100' : current ? 'opacity-40' : 'opacity-0'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <div
          className={`mt-2 transition-opacity duration-300 ease-out ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
