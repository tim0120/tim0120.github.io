import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import VibesGallery, { type SizedImage } from '@/components/VibesGallery';
import { imageSize } from '@/lib/imageSize';
import { captureDates } from './captureDates';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

// Read filenames AND dimensions at build time (static export — runs during
// `next build`), so the gallery can pack the collage without preloading every
// image; the browser then lazy-loads them as they scroll into view. Ordered
// newest → oldest by Photos capture date (undated images last).
function getImages(): SizedImage[] {
  const dir = path.join(process.cwd(), 'public', 'vibes', 'images');
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .map((src) => {
        const size = imageSize(path.join(dir, src));
        return size ? { src, w: size.w, h: size.h } : null;
      })
      .filter((x): x is SizedImage => x !== null)
      .sort((a, b) => {
        const da = captureDates[a.src] ? Date.parse(captureDates[a.src]) : -Infinity;
        const db = captureDates[b.src] ? Date.parse(captureDates[b.src]) : -Infinity;
        return db - da; // most recent first
      });
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'vibes',
};

export default function VibesPage() {
  const images = getImages();

  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        inspired by{' '}
        <a href="https://xavicf.com/vibes/" className="underline hover:no-underline">
          xavi
        </a>
        .
      </p>

      {/* Left edge aligned with the text column; width runs toward the right
          edge (see .vibes-bleed in globals.css). */}
      <div className="vibes-bleed">
        <VibesGallery images={images} />
      </div>
    </div>
  );
}
