'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Order of operations: fade the current page OUT, *then* navigate, then fade
// the new page IN. In the App Router the `children` slot always reflects the
// current route, so we can't buffer the old page — instead we intercept link
// clicks and hold off the actual navigation until the fade-out has finished.
const FADE_MS = 560; // fade in / out duration

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const navigating = useRef(false);

  // A new route has mounted → fade it in (two frames out so 0 → 1 animates).
  useEffect(() => {
    navigating.current = false;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Intercept internal link clicks during the capture phase (before Next's own
  // Link handler), fade out, then push the route once the fade completes.
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
      // Only same-origin navigations to a different path get the transition.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      if (navigating.current) return;
      navigating.current = true;

      setVisible(false); // fade current page out
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), FADE_MS);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return (
    <div
      className="transition-opacity ease-out"
      style={{ transitionDuration: `${FADE_MS}ms`, opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
