'use client';

import { usePathname } from 'next/navigation';
import DiffusionField from '@/components/DiffusionField';
import { a, dim, norm, type Piece } from '@/lib/segments';

// Each page with the words someone might have typed for it.
const pages: { label: string; href: string; aliases: string[] }[] = [
  { label: 'home', href: '/', aliases: ['index', 'about', 'bio', 'me', 'tim'] },
  { label: 'cv', href: '/cv', aliases: ['about', 'resume', 'work', 'history', 'experience', 'publications', 'papers', 'basketball'] },
  { label: 'projects', href: '/projects', aliases: ['project', 'code', 'tools', 'memex'] },
  { label: 'writing', href: '/writing', aliases: ['blog', 'posts', 'papers', 'publications', 'previous-work', 'essays'] },
  { label: 'links', href: '/links', aliases: ['miscellany', 'misc', 'friends', 'sites', 'curius', 'bookmarks'] },
  { label: 'vibes', href: '/vibes', aliases: ['photos', 'pictures', 'gallery', 'images'] },
  { label: 'now', href: '/now', aliases: ['status', 'current', 'today'] },
];

function levenshtein(x: string, y: string) {
  const d = Array.from({ length: x.length + 1 }, (_, i) => [i, ...new Array<number>(y.length).fill(0)]);
  for (let j = 1; j <= y.length; j++) d[0][j] = j;
  for (let i = 1; i <= x.length; i++)
    for (let j = 1; j <= y.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
  return d[x.length][y.length];
}

// 0 = identical, 1 = nothing in common. Substring matches count as close.
function distance(q: string, word: string) {
  if (!q || !word) return 1;
  if (q === word) return 0;
  if (word.includes(q) || q.includes(word)) return 0.2;
  return levenshtein(q, word) / Math.max(q.length, word.length);
}

export default function NotFound() {
  const pathname = usePathname();
  const q = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';

  const ranked = pages
    .map((p) => ({ ...p, score: Math.min(...[p.label, ...p.aliases].map((w) => distance(q, w))) }))
    .sort((x, y) => x.score - y.score);
  const best = ranked[0];
  const confident = best.score <= 0.5;

  const segments = norm([
    '404\n\n',
    dim(`nothing at ${pathname}`),
    '\n\n',
    ...(confident
      ? (['did you mean ', a(best.label, best.href), '?\n\nor:\n'] as Piece[])
      : (['maybe you wanted:\n'] as Piece[])),
    ...ranked.slice(confident ? 1 : 0).flatMap((p) => [a(p.label, p.href), '\n']),
  ]);
  return <DiffusionField segments={segments} />;
}
