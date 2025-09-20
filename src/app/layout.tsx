import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageNav from "@/components/PageNav";
import Copyright from "@/components/Footer";

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
  description: "Timothy H. Kostolansky's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${lora.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased px-5 pt-10 sm:px-20 sm:pt-16 md:px-30 lg:px-60 xl:px-96 2xl:px-120 min-h-screen flex flex-col`}>
        <ThemeProvider>
          <header>
            <PageNav />
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer>
            <Copyright />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
