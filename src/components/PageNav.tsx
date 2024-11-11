import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function PageNav() {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="space-x-4">
          <Link href="/">home</Link>
          <Link href="/blog">blog</Link>
          <Link href="/projects">projects</Link>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
