'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface Page {
  title: string;
  path: string;
  description: string;
}

const pages: Page[] = [
  { title: 'Home', path: '/', description: 'About me and my work' },
  { title: 'Projects', path: '/projects', description: 'Things I\'ve built' },
  { title: 'Previous Work', path: '/previous-work', description: 'Past work and research' },
  { title: 'Miscellany', path: '/miscellany', description: 'Basketball, tools, and reading' },
  { title: 'Now', path: '/now', description: 'What I\'m up to right now' },
  { title: 'Blog', path: '/blog', description: 'Writing and thoughts' },
];

interface PageSearchProps {
  initialQuery?: string;
}

export default function PageSearch({ initialQuery = '' }: PageSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const fuse = useMemo(
    () =>
      new Fuse(pages, {
        keys: ['title', 'description', 'path'],
        threshold: 0.6, // More permissive to always find matches
        includeScore: true,
      }),
    []
  );

  const results = query
    ? fuse.search(query).map((result) => result.item)
    : pages;

  // Always show at least 3 results, even if fuzzy search returns fewer
  const displayResults = results.length > 0 ? results : pages.slice(0, 3);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search pages..."
        className="w-full px-4 py-3 mb-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
        autoFocus
      />

      <div className="space-y-2">
        {displayResults.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="font-medium text-lg mb-1">{page.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {page.description}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {page.path}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
