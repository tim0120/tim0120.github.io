'use client';

import { useEffect, useRef, useState } from 'react';

// Dense (dark) → light. Indexed by luminance; dark pixels get the inkiest glyph.
const RAMP = '@%#*+=-:. ';

// Renders an image as monospace ASCII art (converted in the browser via canvas;
// Twitter's CDN allows cross-origin reads). The art fills the container width,
// so glyph size follows the card — fewer `cols` ⇒ larger glyphs.
export default function AsciiArt({
  src,
  cols = 70,
  className = '',
}: {
  src: string;
  cols?: number;
  className?: string;
}) {
  const [art, setArt] = useState('');
  const [fontPx, setFontPx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const charRatio = useRef(0.6); // monospace advance width per 1px of font-size

  // Measure the actual character advance ratio once.
  useEffect(() => {
    const m = document.createElement('span');
    m.style.cssText =
      'position:absolute;visibility:hidden;white-space:pre;font-size:100px;font-family:var(--font-geist-mono),ui-monospace,monospace';
    m.textContent = 'M'.repeat(100);
    document.body.appendChild(m);
    charRatio.current = m.getBoundingClientRect().width / 100 / 100 || 0.6;
    document.body.removeChild(m);
  }, []);

  // Size the font so `cols` characters fill the container width.
  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.clientWidth ?? 0;
      if (w) setFontPx(w / (cols * charRatio.current));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [cols]);

  // Convert the image to ASCII.
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      // Rows are scaled by the character cell's width/height ratio so the art
      // keeps the image's aspect (cells are taller than wide).
      const rows = Math.max(1, Math.round(cols * ratio * charRatio.current));
      const canvas = document.createElement('canvas');
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, cols, rows);

      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, cols, rows).data;
      } catch {
        return;
      }

      let out = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const alpha = data[i + 3] / 255;
          const lum =
            (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) * alpha +
            255 * (1 - alpha);
          const idx = Math.min(RAMP.length - 1, Math.floor((lum / 255) * RAMP.length));
          out += RAMP[idx];
        }
        out += '\n';
      }
      setArt(out);
    };
    img.src = src;
  }, [src, cols]);

  useEffect(() => {
    if (art && fontPx && preRef.current) preRef.current.style.opacity = '1';
  }, [art, fontPx]);

  return (
    <div ref={wrapRef} className={className}>
      {art && fontPx > 0 && (
        <pre
          ref={preRef}
          aria-hidden="true"
          className="m-0 select-none overflow-hidden leading-none text-gray-700 transition-opacity duration-500 dark:text-gray-300"
          style={{ fontSize: `${fontPx}px`, lineHeight: `${fontPx}px`, opacity: 0 }}
        >
          {art}
        </pre>
      )}
    </div>
  );
}
