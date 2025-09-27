import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export default function PageNav() {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" aria-label="Home">
            <Image src="/favicon.png" alt="favicon" width={24} height={24} />
          </Link>
          <Link href="/projects" className="hover:underline">projects</Link>
          <Link href="/previous-work" className="hover:underline">prior work</Link>
          <Link href="/miscellany" className="hover:underline">miscellany</Link>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
