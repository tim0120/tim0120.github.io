'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type Segment = { text: string; href?: string; hidden?: boolean };
type Cell = { ch: string; href?: string; hidden?: boolean };

// Noise the field denoises out of.
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789/\\<>{}[]()=+*#@%&~^.,;:';
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

const FONT_PX = 13;
const LINE_PX = 20;

const LINK_CLASS =
  'underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors';

// Word-wrap a stream of cells into grid lines no wider than `cols`. Honors
// explicit '\n' (so '\n\n' yields a blank line between paragraphs) and carries
// each character's link href along for the ride.
function layoutLines(cells: Cell[], cols: number): Cell[][] {
  const lines: Cell[][] = [];
  let line: Cell[] = [];
  let word: Cell[] = [];

  const flushWord = () => {
    if (word.length === 0) return;
    while (word.length > cols) {
      if (line.length > 0) {
        lines.push(line);
        line = [];
      }
      lines.push(word.slice(0, cols));
      word = word.slice(cols);
    }
    if (line.length + word.length > cols) {
      lines.push(line);
      line = [];
    }
    line = line.concat(word);
    word = [];
  };

  for (const cell of cells) {
    if (cell.ch === '\n') {
      flushWord();
      lines.push(line);
      line = [];
    } else if (cell.ch === ' ') {
      flushWord();
      if (line.length >= cols) {
        lines.push(line);
        line = [];
      } else if (line.length > 0) {
        // Keep the segment's href/hidden on the space so multi-word links
        // stay one contiguous <a> instead of splitting at each space.
        line.push({ ch: ' ', href: cell.href, hidden: cell.hidden });
      }
    } else {
      word.push(cell);
    }
  }
  flushWord();
  lines.push(line);
  return lines;
}

// A full teletype field: the content area starts as monospace noise that
// diffuses, each cell settling at a staggered random time. The bio resolves at
// the top-left (links included); every other cell resolves to blank.
export default function DiffusionField({
  segments,
  duration = 2400,
}: {
  segments: Segment[];
  duration?: number;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [display, setDisplay] = useState('');
  const [resolved, setResolved] = useState(false);
  const raf = useRef(0);
  const target = useRef<Cell[]>([]);
  const dims = useRef({ rows: 0, cols: 0 });

  const measureCharWidth = () => {
    const m = document.createElement('span');
    m.style.position = 'absolute';
    m.style.visibility = 'hidden';
    m.style.whiteSpace = 'pre';
    m.style.fontFamily = 'var(--font-geist-mono), ui-monospace, monospace';
    m.style.fontSize = `${FONT_PX}px`;
    m.textContent = 'M'.repeat(200);
    document.body.appendChild(m);
    const w = m.getBoundingClientRect().width / 200;
    document.body.removeChild(m);
    return w || FONT_PX * 0.6;
  };

  const build = useCallback(() => {
    const pre = preRef.current;
    if (!pre) return;
    const charW = measureCharWidth();
    const rect = pre.getBoundingClientRect();
    const cols = Math.max(1, Math.floor(rect.width / charW));
    const rows = Math.max(1, Math.floor(rect.height / LINE_PX));

    const cells: Cell[] = [];
    for (const seg of segments)
      for (const ch of seg.text) cells.push({ ch, href: seg.href, hidden: seg.hidden });
    const lines = layoutLines(cells, cols);

    const grid = new Array<Cell>(rows * cols);
    for (let r = 0; r < rows; r++) {
      const ln = lines[r] || [];
      for (let c = 0; c < cols; c++) grid[r * cols + c] = c < ln.length ? ln[c] : { ch: ' ' };
    }
    dims.current = { rows, cols };
    target.current = grid;
  }, [segments]);

  const animate = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setResolved(false);
    const { rows, cols } = dims.current;
    const cells = target.current;
    const n = rows * cols;
    if (!n) return;

    const settle = new Array<number>(n);
    for (let i = 0; i < n; i++) settle[i] = duration * (0.08 + 0.84 * Math.random());
    const cur = new Array<string>(n).fill('');

    let start = 0;
    let lastFlip = -Infinity;
    const toStr = () => {
      const rowStrs: string[] = [];
      for (let r = 0; r < rows; r++) rowStrs.push(cur.slice(r * cols, (r + 1) * cols).join(''));
      return rowStrs.join('\n');
    };

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const flip = elapsed - lastFlip > 55;
      if (flip) lastFlip = elapsed;

      let done = true;
      for (let i = 0; i < n; i++) {
        if (elapsed >= settle[i]) {
          // Hidden (background-blended) cells stay blank during the animation —
          // the plain-text grid can't color them, so they'd flash in visibly.
          // They only enter via the resolved render, already invisible.
          cur[i] = cells[i].hidden ? ' ' : cells[i].ch;
        } else {
          done = false;
          if (flip || cur[i] === '') cur[i] = randGlyph();
        }
      }
      if (done) setResolved(true); // swap to the link-aware render
      else setDisplay(toStr());
      if (!done) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [duration]);

  const run = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      build();
      setResolved(true);
      return;
    }
    build();
    animate();
  }, [build, animate]);

  useEffect(() => {
    run();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(run, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [run]);

  // Final render: same monospace grid, but contiguous link cells become <a>.
  const resolvedNodes = () => {
    const { rows, cols } = dims.current;
    const cells = target.current;
    const nodes: React.ReactNode[] = [];
    for (let r = 0; r < rows; r++) {
      const parts: React.ReactNode[] = [];
      let c = 0;
      while (c < cols) {
        const href = cells[r * cols + c]?.href;
        const hidden = cells[r * cols + c]?.hidden;
        let j = c;
        let s = '';
        while (
          j < cols &&
          cells[r * cols + j]?.href === href &&
          cells[r * cols + j]?.hidden === hidden
        ) {
          s += cells[r * cols + j].ch;
          j++;
        }
        if (href) {
          parts.push(
            <a key={c} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {s}
            </a>
          );
        } else if (hidden) {
          // Blended into the background — invisible, but real selectable text.
          parts.push(
            <span key={c} style={{ color: 'var(--background)' }}>
              {s}
            </span>
          );
        } else {
          parts.push(s);
        }
        c = j;
      }
      nodes.push(<span key={r}>{parts}</span>);
      if (r < rows - 1) nodes.push('\n');
    }
    return nodes;
  };

  return (
    <>
      {/* Screen-reader copy (the animated grid is decorative). */}
      <p className="sr-only">
        {segments.map((s, i) =>
          s.href ? (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.text}
            </a>
          ) : (
            <span key={i}>{s.text}</span>
          )
        )}
      </p>
      <pre
        ref={preRef}
        aria-hidden="true"
        className="m-0 h-[76vh] w-full overflow-hidden whitespace-pre text-gray-700 dark:text-gray-300"
        style={{
          fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
          fontSize: `${FONT_PX}px`,
          lineHeight: `${LINE_PX}px`,
        }}
      >
        {resolved ? resolvedNodes() : display}
      </pre>
    </>
  );
}
