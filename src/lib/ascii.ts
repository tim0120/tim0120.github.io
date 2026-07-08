import sharp from "sharp";

// Dense (dark) → light. Indexed by luminance; dark pixels get the inkiest glyph.
const RAMP = "@%#*+=-:. ";

// Geist Mono advance width per 1px of font-size. Rows are scaled by it so the
// art keeps the image's aspect (character cells are taller than wide).
export const ASCII_CHAR_RATIO = 0.6;

// Fetch an image and convert it to monospace ASCII art at build time, so
// static pages ship with the art already in the HTML.
export async function imageToAscii(src: string, cols = 70): Promise<string | undefined> {
  try {
    const res = await fetch(src);
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());

    const meta = await sharp(buf).metadata();
    const ratio = (meta.height ?? 1) / (meta.width ?? 1);
    const rows = Math.max(1, Math.round(cols * ratio * ASCII_CHAR_RATIO));

    const { data } = await sharp(buf)
      .resize(cols, rows, { fit: "fill" })
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
  } catch {
    return undefined;
  }
}
