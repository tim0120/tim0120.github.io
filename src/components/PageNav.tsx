import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export default function PageNav() {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/favicon.png" alt="favicon" className="w-6 h-6" />
          <Link href="/" className="hover:underline">home</Link>
          <Link href="/blog" className="hover:underline">blog</Link>
          <Link href="/projects" className="hover:underline">projects</Link>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
