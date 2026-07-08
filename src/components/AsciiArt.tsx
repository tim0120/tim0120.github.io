import { ASCII_CHAR_RATIO } from "@/lib/ascii";

// Displays prebuilt ASCII art (see lib/ascii.ts). Pure static markup: the font
// is sized with container-query units so `cols` glyphs exactly fill the width —
// no client JS, no flash-in.
export default function AsciiArt({
  art,
  cols = 70,
  className = "",
}: {
  art: string;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={className} style={{ containerType: "inline-size" }}>
      <pre
        aria-hidden="true"
        className="m-0 select-none overflow-hidden leading-none text-gray-700 dark:text-gray-300"
        style={{ fontSize: `calc(100cqw / ${cols * ASCII_CHAR_RATIO})`, lineHeight: 1 }}
      >
        {art}
      </pre>
    </div>
  );
}
