// The centered content column. Pages share a max-w-3xl column; the vibes
// gallery breaks out to the right edge itself (see vibes/page.tsx).
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mr-auto flex w-full max-w-4xl flex-1 flex-col">{children}</div>
  );
}
