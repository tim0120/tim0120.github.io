'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isPlainRoute, navState } from '@/lib/nav';

// Field → field navigation is handled by the DiffusionField morph. Anything
// involving a plain page (vibes, project detail) gets a quick fade out, then
// the route change, then a fade in.
const OUT_MS = 200;
const IN_MS = 260;

export default function Transitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [duration, setDuration] = useState(IN_MS);
  const navigating = useRef(false);

  // New route mounted → fade in (two frames out so 0 → 1 animates).
  useEffect(() => {
    navigating.current = false;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || anchor.getAttribute('target') === '_blank') return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const from = window.location.pathname;
      const to = url.pathname;
      if (to === from) return;
      const fromPlain = isPlainRoute(from);
      if (!fromPlain && !isPlainRoute(to)) return; // field → field: let the morph run

      e.preventDefault();
      e.stopPropagation();
      if (navigating.current) return;
      navigating.current = true;
      navState.fromPlain = fromPlain;
      setDuration(OUT_MS);
      setVisible(false);
      window.setTimeout(() => {
        setDuration(IN_MS);
        router.push(to + url.search + url.hash);
      }, OUT_MS);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return (
    <div
      className="transition-opacity ease-out"
      style={{ transitionDuration: `${duration}ms`, opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
