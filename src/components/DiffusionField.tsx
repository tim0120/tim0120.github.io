'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FONT_PX, LINE_PX, type Segment } from '@/lib/segments';
import { navState } from '@/lib/nav';

type Cell = {
  ch: string;
  href?: string;
  copy?: string;
  dim?: boolean;
  bold?: boolean;
  hidden?: boolean;
  indent?: number;
};
type Grid = { cells: Cell[]; rows: number; cols: number };

const BLANK: Cell = { ch: ' ' };

// Noise the field denoises out of.
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789/\\<>{}[]()=+*#@%&~^.,;:';
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

const MIN_VH = 0.76; // the field is at least this tall, so short pages don't collapse
const FIRST_MS = 2400; // first paint: everything resolves out of noise
const FLIP_MS = 70;
// Route change: a wave sweeps the grid top-left → bottom-right. Each changed
// cell holds its old glyph until the wave reaches it, passes through a short
// burst of noise, then lands on the new glyph.
const WAVE_MS = 750; // time for the wave front to cross the grid
const JITTER_MS = 220; // per-cell randomness added to the wave arrival
const AMBIENT_P = 0.035; // share of empty cells that shimmer as the wave passes

const LINK_CLASS =
  'underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors';

// The last grid shown, kept across route changes (module scope survives the
// page component remounting) so the next page can morph from it with a
// minimal edit instead of starting from full noise.
let lastGrid: Grid | null = null;

const same = (x: Cell | undefined, y: Cell) =>
  !!x &&
  x.ch === y.ch &&
  x.href === y.href &&
  !!x.dim === !!y.dim &&
  !!x.bold === !!y.bold &&
  !!x.hidden === !!y.hidden;

const styleKey = (c: Cell) => `${c.href ?? ''}|${c.copy ?? ''}|${c.dim ? 1 : 0}|${c.bold ? 1 : 0}|${c.hidden ? 1 : 0}`;

const isInternal = (href: string) => href.startsWith('/') && !/\.[a-z0-9]+$/i.test(href);

// Word-wrap a stream of cells into grid lines no wider than `cols`. Honors
// explicit '\n' and carries each character's style along. A wrapped
// continuation line starts at the word's `indent` (hanging indent).
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
      let ind = word[0].indent ?? 0;
      if (ind + word.length > cols) ind = 0;
      line = Array.from({ length: ind }, () => BLANK);
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
      // A space on a full line is dropped; the next word wraps (with indent).
      if (line.length > 0 && line.length < cols) {
        // Keep the style on the space so multi-word links stay one <a>.
        line.push({ ...cell });
      }
    } else {
      word.push(cell);
    }
  }
  flushWord();
  lines.push(line);
  return lines;
}

// One cell per user-perceived character, so combining marks stay attached.
const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;
function graphemes(text: string): string[] {
  if (!segmenter) return Array.from(text);
  return Array.from(segmenter.segment(text), (s) => s.segment);
}

function measureCharWidth() {
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
}

// Render a grid as rows of styled runs. Contiguous cells with the same style
// collapse into one span/anchor.
const COPIED_MS = 1500;

function renderRows(
  cells: Cell[],
  rows: number,
  cols: number,
  onCopy: (text: string, start: number, len: number) => void
) {
  const nodes: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const parts: React.ReactNode[] = [];
    let c = 0;
    while (c < cols) {
      const first = cells[r * cols + c] ?? BLANK;
      const key = styleKey(first);
      let j = c;
      let s = '';
      while (j < cols && styleKey(cells[r * cols + j] ?? BLANK) === key) {
        s += (cells[r * cols + j] ?? BLANK).ch;
        j++;
      }
      let cls = '';
      if (first.dim) cls += ' text-gray-500 dark:text-gray-400';
      if (first.bold) cls += ' font-semibold';
      if (first.hidden) {
        // Blended into the background — invisible, but real selectable text.
        parts.push(
          <span key={c} style={{ color: 'var(--background)' }}>
            {s}
          </span>
        );
      } else if (first.copy) {
        // Click-to-copy run; the field diffuses it to "copied!" and back.
        const copyText = first.copy;
        const start = r * cols + c;
        const len = j - c;
        parts.push(
          <span
            key={c}
            role="button"
            tabIndex={0}
            title="click to copy"
            onClick={() => onCopy(copyText, start, len)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onCopy(copyText, start, len);
            }}
            className={`cursor-pointer ${LINK_CLASS}${cls}`}
          >
            {s}
          </span>
        );
      } else if (first.href) {
        const className = `${LINK_CLASS}${cls}`;
        parts.push(
          isInternal(first.href) ? (
            <Link key={c} href={first.href} className={className}>
              {s}
            </Link>
          ) : (
            <a key={c} href={first.href} target="_blank" rel="noopener noreferrer" className={className}>
              {s}
            </a>
          )
        );
      } else if (cls) {
        parts.push(
          <span key={c} className={cls.trim()}>
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
}

// A full teletype field: the page is a monospace grid. On first paint it
// resolves out of noise; on navigation it morphs from the previous page's
// grid, re-noising only the cells whose content changed.
export type Aside = { segments: Segment[]; width: number; minCols: number };
const ASIDE_GAP = 3;

// `aside` is painted into the rightmost `width` columns when the grid has at
// least `minCols` columns; the main segments then wrap in the columns to its
// left. Narrower grids ignore it (pages can supply an inline fallback via
// `maxCols` segments).
export default function DiffusionField({ segments, aside }: { segments: Segment[]; aside?: Aside }) {
  const preRef = useRef<HTMLPreElement>(null);
  const target = useRef<Grid>({ cells: [], rows: 0, cols: 0 });
  const cur = useRef<Cell[]>([]);
  const raf = useRef(0);
  const started = useRef(false); // has any animation frame rendered yet
  const [, setTick] = useState(0);
  const [rows, setRows] = useState(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const copyOrig = useRef<{ start: number; chars: string[] } | null>(null);


  const build = useCallback(() => {
    const pre = preRef.current;
    if (!pre) return;
    const charW = measureCharWidth();
    const cols = Math.max(1, Math.floor(pre.getBoundingClientRect().width / charW));
    const asideOn = !!aside && cols >= aside.minCols;
    const mainCols = asideOn ? cols - aside!.width - ASIDE_GAP : cols;

    const toCells = (segs: Segment[], width: number) => {
      const cells: Cell[] = [];
      const shown = segs.filter(
        (seg) => !((seg.minCols && cols < seg.minCols) || (seg.maxCols && cols >= seg.maxCols))
      );
      shown.forEach((seg, i) => {
        const { text, rule, minCols, maxCols, ...style } = seg; // eslint-disable-line @typescript-eslint/no-unused-vars
        if (rule) {
          for (let c = 0; c < width; c++) cells.push({ ch: text[0] ?? '-', ...style });
          return;
        }
        for (const ch of graphemes(text)) cells.push({ ch, ...style });
        // Links that leave the site get a trailing arrow (once per link run).
        if (style.href && !isInternal(style.href) && shown[i + 1]?.href !== style.href) {
          for (const ch of ' ↗') cells.push({ ch, href: style.href, dim: true });
        }
      });
      return cells;
    };
    const lines = layoutLines(toCells(segments, mainCols), mainCols);
    const asideLines = asideOn ? layoutLines(toCells(aside!.segments, aside!.width), aside!.width) : [];
    const minRows = Math.ceil((window.innerHeight * MIN_VH) / LINE_PX);
    const nRows = Math.max(minRows, lines.length + 1, asideLines.length + 1);

    const grid = new Array<Cell>(nRows * cols).fill(BLANK);
    const paint = (ls: Cell[][], at: number, width: number) => {
      for (let r = 0; r < ls.length; r++) {
        const ln = ls[r];
        for (let c = 0; c < Math.min(ln.length, width); c++) grid[r * cols + at + c] = ln[c];
      }
    };
    paint(lines, 0, mainCols);
    if (asideOn) paint(asideLines, cols - aside!.width, aside!.width);
    target.current = { cells: grid, rows: nRows, cols };
    setRows(nRows);
  }, [segments, aside]);

  const animate = useCallback((from: Grid | null, instant: boolean, local = false) => {
    cancelAnimationFrame(raf.current);
    const { cells, rows, cols } = target.current;
    const n = rows * cols;
    if (!n) return;

    const visible = (c: Cell) => c.ch !== ' ' && c.ch !== '\u00A0' && !c.hidden;
    const aligned = !!from && from.cols === cols;
    // Per cell: old glyph shown until `hold`, noise until `end`, then the new
    // glyph. `ambient` cells are empty before and after and just shimmer.
    const old = new Array<Cell>(n);
    const hold = new Float64Array(n);
    const end = new Float64Array(n);
    const ambient = new Uint8Array(n);
    let any = false;

    for (let i = 0; i < n; i++) {
      const prev = aligned ? (from!.cells[i] ?? BLANK) : BLANK;
      const next = cells[i];
      old[i] = prev;
      if (instant) continue;
      if (!from) {
        // First paint: everything resolves out of noise at a random moment.
        end[i] = FIRST_MS * (0.08 + 0.84 * Math.random());
        any = true;
        continue;
      }
      const r = (i / cols) | 0;
      const c = i % cols;
      // A local change (e.g. click-to-copy) starts at once; a page change
      // sweeps across the grid.
      const arrive = local
        ? 120 * Math.random()
        : WAVE_MS * (0.55 * (r / rows) + 0.45 * (c / cols)) + JITTER_MS * Math.random();
      if (same(prev, next) || (!visible(prev) && !visible(next))) {
        // Unchanged (or invisible both before and after). Empty cells occasionally shimmer as the wave passes —
        // movement that belongs to neither page.
        if (!local && !visible(prev) && Math.random() < AMBIENT_P) {
          ambient[i] = 1;
          hold[i] = arrive;
          end[i] = arrive + 60 + 110 * Math.random();
          any = true;
        }
        continue;
      }
      const wasText = visible(prev);
      const isText = visible(next);
      hold[i] = arrive;
      // Text → text tumbles longest; appearing or vanishing is a brief flicker.
      const burst = wasText && isText ? 120 + 220 * Math.random() : wasText ? 40 + 90 * Math.random() : 60 + 130 * Math.random();
      end[i] = arrive + burst;
      any = true;
    }

    if (instant || !any) {
      cur.current = cells.slice();
      setTick((t) => t + 1);
      started.current = true;
      lastGrid = target.current;
      return;
    }

    const glyphAt = (i: number) => (ambient[i] ? { ch: randGlyph(), dim: true } : { ch: randGlyph() });
    const paint = (elapsed: number, flip: boolean) => {
      const c = cur.current;
      let done = true;
      for (let i = 0; i < n; i++) {
        if (elapsed >= end[i]) c[i] = cells[i];
        else if (elapsed >= hold[i]) {
          done = false;
          if (flip || c[i] === old[i] || c[i] === cells[i]) c[i] = glyphAt(i);
        } else {
          done = false;
          c[i] = old[i];
        }
      }
      return done;
    };

    cur.current = new Array<Cell>(n);
    paint(0, true);
    setTick((t) => t + 1);

    let start = 0;
    let lastFlip = -Infinity;
    const step = (ts: number) => {
      if (!start) start = ts;
      started.current = true;
      const elapsed = ts - start;
      const flip = elapsed - lastFlip > FLIP_MS;
      if (flip) lastFlip = elapsed;
      const done = paint(elapsed, flip);
      setTick((t) => t + 1);
      if (done) lastGrid = target.current;
      else raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  // Rewrite a run of target cells (keeping their style) and diffuse to it.
  const rewriteRun = useCallback(
    (start: number, chars: string[]) => {
      const t = target.current;
      const from: Grid = { ...t, cells: t.cells.slice() };
      for (let k = 0; k < chars.length; k++) t.cells[start + k] = { ...t.cells[start + k], ch: chars[k] };
      animate(from, false, true);
    },
    [animate]
  );

  const onCopy = useCallback(
    (text: string, start: number, len: number) => {
      navigator.clipboard?.writeText(text).then(() => {
        clearTimeout(copyTimer.current);
        if (!copyOrig.current) {
          copyOrig.current = { start, chars: target.current.cells.slice(start, start + len).map((c) => c.ch) };
        }
        rewriteRun(start, Array.from('copied!'.padEnd(len).slice(0, len)));
        copyTimer.current = setTimeout(() => {
          const orig = copyOrig.current;
          copyOrig.current = null;
          if (orig) rewriteRun(orig.start, orig.chars);
        }, COPIED_MS);
      });
    },
    [rewriteRun]
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    build();
    // Arriving from a plain page: the Transitions fade covers the change, so
    // resolve at once rather than morphing from a stale field.
    const fromPlain = navState.fromPlain;
    navState.fromPlain = false;
    animate(fromPlain ? null : lastGrid, reduced || fromPlain);

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const from = target.current;
        build();
        animate(from, reduced);
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(t);
      clearTimeout(copyTimer.current);
      copyOrig.current = null;
      window.removeEventListener('resize', onResize);
      // What's on screen right now is what the next page morphs from. (Skip
      // if nothing rendered yet — e.g. strict mode's synchronous remount.)
      const { rows, cols } = target.current;
      if (started.current && rows && cur.current.length === rows * cols) {
        lastGrid = { cells: cur.current.slice(), rows, cols };
      }
    };
  }, [build, animate]);

  const { cols } = target.current;

  return (
    <>
      {/* Screen-reader copy (the animated grid is decorative). */}
      <p className="sr-only">
        {[...segments, ...(aside?.segments ?? [])].map((s, i) =>
          s.href ? (
            <a key={i} href={s.href}>
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
        className="m-0 w-full overflow-hidden whitespace-pre text-gray-700 dark:text-gray-300"
        style={{
          fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
          fontSize: `${FONT_PX}px`,
          lineHeight: `${LINE_PX}px`,
          minHeight: `${MIN_VH * 100}vh`,
          height: rows ? `${rows * LINE_PX}px` : undefined,
        }}
      >
        {rows ? renderRows(cur.current, rows, cols, onCopy) : null}
      </pre>
    </>
  );
}
