import fs from 'fs';

export type ImageDimensions = { w: number; h: number };

// Minimal image-dimension reader (no deps): parses headers for PNG, GIF,
// JPEG, and WebP. Used at build time so the vibes gallery can lay out the
// collage without downloading every image up front.
export function imageSize(filePath: string): ImageDimensions | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(filePath);
  } catch {
    return null;
  }

  // PNG — IHDR width/height are big-endian uint32 at offsets 16 and 20.
  if (buf.length >= 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }

  // GIF — logical screen width/height are little-endian uint16 at 6 and 8.
  if (buf.length >= 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  }

  // JPEG — scan for a Start-Of-Frame marker and read its dimensions.
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) {
        off++;
        continue;
      }
      let marker = buf[off + 1];
      while (marker === 0xff && off + 1 < buf.length) {
        off++;
        marker = buf[off + 1];
      }
      // Standalone markers carry no length payload.
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        off += 2;
        continue;
      }
      // SOF markers (excluding DHT/JPG/DAC) hold the frame dimensions.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { h: buf.readUInt16BE(off + 5), w: buf.readUInt16BE(off + 7) };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }

  // WebP — RIFF container with a VP8 / VP8L / VP8X chunk.
  if (buf.length >= 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const format = buf.toString('ascii', 12, 16);
    if (format === 'VP8 ') {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    }
    if (format === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (format === 'VP8X') {
      const w = (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1;
      const h = (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1;
      return { w, h };
    }
  }

  return null;
}
