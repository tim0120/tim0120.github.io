'use client';

import { usePathname } from 'next/navigation';
import PageSearch from '@/components/PageSearch';

export default function NotFound() {
  const pathname = usePathname();
  // Clean up the pathname to use as initial query
  // Remove leading slash and any trailing slashes
  const initialQuery = pathname.replace(/^\/|\/$/g, '').replace(/-/g, ' ');

  return (
    <div className="flex flex-col items-center min-h-[60vh] py-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-2">Page not found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you&apos;re looking for doesn&apos;t exist. Try searching below:
      </p>
      <PageSearch initialQuery={initialQuery} />
    </div>
  );
}
