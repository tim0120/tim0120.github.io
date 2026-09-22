import sharp from "sharp";
import fs from "fs";
import path from "path";

// Dense (dark) → light. Indexed by luminance; dark pixels get the inkiest glyph.
// No "=": in Geist Mono its runs fuse into solid bars.
const RAMP = "@%#*+~-:. ";

// Geist Mono advance width per 1px of font-size. Rows are scaled by it so the
// art keeps the image's aspect (character cells are taller than wide).
export const ASCII_CHAR_RATIO = 0.6;

type Options = {
  cols?: number;
  // Cell width / cell height of the grid the art will sit in. Defaults to a
  // square-ish line-height-1 grid; the DiffusionField's is ~0.39.
  cellAspect?: number;
  // Center-crop to a square before converting.
  square?: boolean;
  // Source-pixel region to use (applied before any resizing).
  crop?: { left: number; top: number; width: number; height: number };
  // Trim transparent margins first (for cut-outs), so the art bounds the subject.
  trim?: boolean;
};

async function bufferToAscii(buf: Buffer, opts: Options): Promise<string> {
  const cols = opts.cols ?? 70;
  const cellAspect = opts.cellAspect ?? ASCII_CHAR_RATIO;
  let img = sharp(buf);
  if (opts.crop) img = img.extract(opts.crop);
  let w: number;
  let h: number;
  if (opts.trim) {
    const t = await img.trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 }).toBuffer({ resolveWithObject: true });
    img = sharp(t.data);
    w = t.info.width;
    h = t.info.height;
  } else {
    const meta = await img.metadata();
    w = opts.crop?.width ?? meta.width ?? 1;
    h = opts.crop?.height ?? meta.height ?? 1;
  }
  const ratio = opts.square ? 1 : h / w;
  const rows = Math.max(1, Math.round(cols * ratio * cellAspect));

  const { data } = await img
    .resize(cols, rows, { fit: opts.square ? "cover" : "fill" })
    .flatten({ background: "#fff" }) // transparent (cut-out) background → blank
    .normalise() // stretch contrast so flat photos still get the full ramp
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let out = "";
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
    out += "\n";
  }
  return out;
}

// Fetch an image and convert it to monospace ASCII art at build time, so
// static pages ship with the art already in the HTML.
export async function imageToAscii(src: string, cols = 70): Promise<string | undefined> {
  try {
    const res = await fetch(src);
    if (!res.ok) return undefined;
    return await bufferToAscii(Buffer.from(await res.arrayBuffer()), { cols });
  } catch {
    return undefined;
  }
}

// Same, for a file under /public (path relative to it).
export async function fileToAscii(publicPath: string, opts: Options = {}): Promise<string | undefined> {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", publicPath));
    return await bufferToAscii(buf, opts);
  } catch {
    return undefined;
  }
}
