'use client';

import { useEffect, useRef, useState } from 'react';

export type SizedImage = { src: string; w: number; h: number };
type Measured = SizedImage;
type Placed = { src: string; left: number; top: number; width: number; height: number };

// Roughly how big an "average" image should render to (w * h, in px).
const TARGET_PIXELS = 420 * 280;
// Breathing room between images, in px.
const GAP = 12;
const MOBILE_BREAKPOINT = 768;

// Container width at which images render at the full TARGET_PIXELS area.
const REFERENCE_WIDTH = 1100;

// Scale every image so its area is ~TARGET_PIXELS at the reference width, then
// shrink proportionally on narrower containers so images stay small and pack
// tightly on smaller screens. Aspect ratios are preserved.
function scaleImage(w: number, h: number, containerWidth: number): [number, number] {
  const toTarget = Math.sqrt(TARGET_PIXELS / (w * h));
  const widthFactor = Math.min(1, Math.max(0.5, containerWidth / REFERENCE_WIDTH));
  const s = toTarget * widthFactor;
  return [Math.max(1, Math.floor(w * s)), Math.max(1, Math.floor(h * s))];
}

// Greedily pack each image at the highest (lowest-top) free slot, sliding it
// across the row. This fills gaps tightly instead of scattering, while the
// varied image sizes keep the collage feeling organic.
function layout(measured: Measured[], containerWidth: number, isMobile: boolean) {
  const placed: Placed[] = [];
  // Step size for candidate horizontal positions — smaller packs tighter.
  const STEP = isMobile ? 12 : 20;

  // Smallest top at which an image of the given width can sit at `left`
  // without colliding with anything already placed.
  function topFor(left: number, width: number): number {
    let top = 0;
    for (const p of placed) {
      const overlapsX = left < p.left + p.width + GAP && left + width + GAP > p.left;
      if (overlapsX) top = Math.max(top, p.top + p.height + GAP);
    }
    return top;
  }

  for (const m of measured) {
    let [width, height] = scaleImage(m.w, m.h, containerWidth);

    // Never let an image overflow the container horizontally.
    if (width > containerWidth) {
      const s = containerWidth / width;
      width = Math.floor(width * s);
      height = Math.floor(height * s);
    }

    const wMax = Math.max(containerWidth - width, 0);

    // Scan candidate x positions and keep the one that sits highest. Include
    // the right edge so we always use the full container width.
    let best: Placed | null = null;
    for (let left = 0; left <= wMax + STEP; left += STEP) {
      const x = Math.min(left, wMax);
      const top = topFor(x, width);
      if (!best || top < best.top) {
        best = { src: m.src, left: x, top, width, height };
      }
    }

    if (best) {
      placed.push({
        src: best.src,
        left: Math.round(best.left),
        top: Math.round(best.top),
        width,
        height,
      });
    }
  }

  const totalHeight = placed.reduce((max, p) => Math.max(max, p.top + p.height), 0) + 20;
  return { placed, totalHeight };
}

export default function VibesGallery({ images }: { images: SizedImage[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measuredRef = useRef<Measured[]>([]);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [height, setHeight] = useState(0);

  // Dimensions arrive from the server (build time), so we can pack the collage
  // immediately — no need to download every image first. The <img> tags below
  // use loading="lazy", so the browser fetches each as it scrolls into view.
  // Images are pre-sorted (newest first), so we pack them in that order.
  useEffect(() => {
    if (images.length === 0) return;
    measuredRef.current = images;
    relayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  function relayout() {
    const container = containerRef.current;
    if (!container || measuredRef.current.length === 0) return;
    const containerWidth = container.getBoundingClientRect().width;
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const { placed, totalHeight } = layout(measuredRef.current, containerWidth, isMobile);
    setPlaced(placed);
    setHeight(totalHeight);
  }

  // Re-pack on resize (debounced) so the collage stays responsive.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(relayout, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: height ? `${height}px` : '60vh' }}
    >
      {placed.map((p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.src}
          src={`/vibes/images/${p.src}`}
          alt=""
          loading="lazy"
          width={p.width}
          height={p.height}
          onLoad={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          className="absolute rounded-sm border border-gray-200 dark:border-gray-700 shadow-sm transition-opacity duration-500"
          style={{
            left: `${p.left}px`,
            top: `${p.top}px`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
