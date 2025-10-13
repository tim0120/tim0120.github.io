'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import HoverName from './HoverName';

export default function PageNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/projects', label: 'projects' },
    { href: '/previous-work', label: 'prior work' },
    { href: '/miscellany', label: 'miscellany' },
    { href: '/now', label: 'now' },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-6">
          <Link href="/" aria-label="Home" className="flex-shrink-0">
            <Image src="/favicon.png" alt="favicon" width={24} height={24} />
          </Link>
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'border-b border-current' : 'hover:border-b hover:border-current'}
              >
                <HoverName name={item.label} />
              </Link>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
