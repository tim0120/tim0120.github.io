import Link from "next/link";
import Publications from "@/components/Publications";
import CopyEmail from "@/components/CopyEmail";
import HoverName from "@/components/HoverName";
import ClickableProfileImage from "@/components/ClickableProfileImage";
import ThemeAwareSvg from "@/components/ThemeAwareSvg";

export default function Home() {
  return (
    <div className="">
      <div className="mb-2 flex flex-col sm:flex-row sm:gap-10">
        <div className="order-first sm:order-last text-center flex-shrink-0 mb-6 sm:mb-0">
          <ClickableProfileImage />
          <h2 className="text-base mt-3"><HoverName name="Timothy H. Kostolansky" /></h2>

          <div className="flex justify-center space-x-5 mt-1 mb-4">
            {[
              { href: "/documents/resume.pdf", src: "/images/file-text.svg", label: "Resume" },
              { href: "https://github.com/tim0120", src: "/images/github.svg", label: "GitHub" },
              { href: "https://twitter.com/thkostolansky", src: "/images/twitter.svg", label: "Twitter" },
              { href: "https://linkedin.com/in/thkostolansky", src: "/images/linkedin.svg", label: "LinkedIn" },
              { href: "https://scholar.google.com/citations?user=tzvUuOIAAAAJ&hl=en", src: "/images/googlescholar.svg", label: "Google Scholar" }
            ].map((link, index) => (
              <Link key={index} href={link.href} aria-label={link.label} title={link.label}>
                <ThemeAwareSvg src={link.src} className="!w-3 !h-3" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl mb-4">
            <HoverName name="hi! im tim" />
          </h1>
          <div className="space-y-4">
            <p>
              i build and study ML systems
            </p>
            <p>
              these days im thinking about how models work internally and how to make their behavior more transparent and reliable
            </p>

            <div className="mt-16">
              <div className="space-y-1 text-sm">
                <p className="font-md">what i&apos;ve been up to:</p>
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2025</span>
                  <div className="flex-1">
                    <Link href="https://x.com/thkostolansky/status/1978988644795855063" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">building AI for a human future</Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · <Link href="https://workshoplabs.ai" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">Workshop Labs</Link></span>
                  </div>
                </div>
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2025</span>
                  <div className="flex-1">
                    investigating entity representations in transformer LMs
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · <Link href="https://humancompatible.ai" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">CHAI</Link></span>
                  </div>
                </div>
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2025</span>
                  <div className="flex-1">
                    <Link href="https://arxiv.org/abs/2505.23575" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">stress-testing chain-of-thought monitoring</Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · <Link href="https://lasrlabs.org" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">LASR Labs</Link></span>
                  </div>
                </div>
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2023–24</span>
                  <div className="flex-1">
                    <Link href="https://dspace.mit.edu/handle/1721.1/156804" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">interpretability and steering of language models</Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · <Link href="https://algorithmicalignment.csail.mit.edu/" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">AAG</Link></span>
                  </div>
                </div>
                {/* TODO: Add Blockcerts verification links for degrees */}
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2023–24</span>
                  <div className="flex-1">
                    MEng CS
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · MIT</span>
                  </div>
                </div>
                <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">2019–23</span>
                  <div className="flex-1">
                    BS Physics & BS CS
                    <span className="text-xs text-gray-500 dark:text-gray-400"> · MIT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              <div>
                reach me at: <CopyEmail
                  email="thkostolansky@gmail.com"
                  obscured="[fi][mi][ln]@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg mb-2">Selected Publications</h2>
        <Publications selectedOnly={true} />
      </div>
    </div>
  );
}