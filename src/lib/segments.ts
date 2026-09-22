// Every text page on the site is authored as a flat list of segments that the
// DiffusionField lays out on a monospace grid. Style is per-segment and
// deliberately tiny: link, dim (secondary), bold (heading), hidden (blended
// into the background), and a hanging indent for wrapped continuation lines.
// Grid metrics shared by the field and by build-time art generation.
export const FONT_PX = 13;
export const LINE_PX = 20;
export const CHAR_W = FONT_PX * 0.6; // Geist Mono advance

export type Segment = {
  text: string;
  href?: string;
  dim?: boolean;
  bold?: boolean;
  hidden?: boolean;
  indent?: number;
  // Stretch this segment's single character across the full grid width.
  rule?: boolean;
  // Only show when the grid is at least / narrower than this many columns.
  minCols?: number;
  maxCols?: number;
  // Clicking this text copies the given string to the clipboard.
  copy?: string;
};

export type Piece = string | Segment;

export const norm = (pieces: Piece[]): Segment[] =>
  pieces.map((p) => (typeof p === 'string' ? { text: p } : p));

export const a = (text: string, href: string, o: Partial<Segment> = {}): Segment => ({
  text,
  href,
  ...o,
});
export const dim = (text: string, o: Partial<Segment> = {}): Segment => ({ text, dim: true, ...o });
export const bold = (text: string, o: Partial<Segment> = {}): Segment => ({ text, bold: true, ...o });
// Section divider on its own line, with a blank line either side.
export const DIVIDER = 'ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ';
export const rule = (): Piece[] => ['\n', dim(DIVIDER), '\n\n'];

// Section heading: a rule separating it from the previous section (unless
// it's the first), then the bold title plus anything trailing on the line.
export const h = (text: string, trailing: Piece[] = [], opts: { first?: boolean } = {}): Piece[] => [
  ...(opts.first ? [] : rule()),
  bold(text),
  ...trailing,
  '\n',
];

// Join pieces with a separator (e.g. ' · ').
export const joinWith = (sep: Piece, items: Piece[][]): Piece[] =>
  items.flatMap((it, i) => (i === 0 ? it : [sep, ...it]));

// Pad a label to a fixed column so the text after it lines up.
export const col = (label: string, width: number): Segment =>
  dim(label.padEnd(width, ' '));

// ASCII art rows: spaces become non-breaking so the layout keeps them literal.
export const art = (text: string, o: Partial<Segment> = {}): Piece[] =>
  text
    .trimEnd()
    .split('\n')
    .flatMap((row) => [{ text: row.replace(/ /g, '\u00A0'), ...o }, { text: '\n', ...o }]);
