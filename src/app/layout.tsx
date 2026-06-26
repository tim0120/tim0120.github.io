import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageNav from "@/components/PageNav";
import Copyright from "@/components/Footer";
import LayoutShell from "@/components/LayoutShell";
import PageTransition from "@/components/PageTransition";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Automatically exports metadata for the page
export const metadata: Metadata = {
  title: "Timothy H. Kostolansky",
  description: "AI alignment and interpretability researcher. Building ML models that understand humans and the world around us.",
  openGraph: {
    title: "Timothy H. Kostolansky",
    description: "AI alignment and interpretability researcher. Building ML models that understand humans and the world around us.",
    url: "https://tim0120.github.io",
    siteName: "Timothy H. Kostolansky",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Timothy H. Kostolansky",
    description: "AI alignment and interpretability researcher. Building ML models that understand humans and the world around us.",
    creator: "@thkostolansky",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const actualTheme = theme === 'system' ? systemTheme : theme;
                if (actualTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${lora.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased pt-10 sm:pt-16 min-h-screen flex flex-col overflow-x-clip`}>
        <ThemeProvider>
          <LayoutShell>
            <header>
              <PageNav />
            </header>
            {/* Start page content at the "about" line in the sidebar rail:
                rail top (4.5rem) + favicon (24px) + mb-2 (8px) + gap-3 (12px),
                minus the body's pt-16 ≈ 52px. */}
            <main className="flex-1 pt-[52px]">
              <PageTransition>{children}</PageTransition>
            </main>
            <footer>
              <Copyright />
            </footer>
          </LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
