import Image from "next/image";
import Link from "next/link";
import ThemeAwareSvg from "@/components/ThemeAwareSvg";
import Publications from "@/components/Publications";

export default function Home() {
  return (
    <div className="">
      <div className="relative mb-2">
        <div className="float-right w-full sm:w-auto sm:ml-10 mb-6 sm:mb-0 text-center flex-shrink-0">
          <Image 
            src="/images/face.png" 
            alt="My face" 
            width={160} 
            height={160} 
            className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover" 
          />
          <h2 className="text-lg mt-4">Timothy H. Kostolansky</h2>
          <div className="flex justify-center space-x-4 mt-4 mb-4">
            {[
              { href: "/documents/resume.pdf", src: "/images/file-text.svg", label: "Resume" },
              { href: "https://github.com/tim0120", src: "/images/github.svg", label: "GitHub" },
              { href: "https://twitter.com/thkostolansky", src: "/images/twitter.svg", label: "Twitter" },
              { href: "https://linkedin.com/in/thkostolansky", src: "/images/linkedin.svg", label: "LinkedIn" },
              { href: "https://scholar.google.com/citations?user=tzvUuOIAAAAJ&hl=en", src: "/images/googlescholar.svg", label: "Google Scholar" }
            ].map((link, index) => (
              <Link key={index} href={link.href} aria-label={link.label}>
                <ThemeAwareSvg src={link.src} />
              </Link>
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="text-xl mb-4">
            Hi, I&rsquo;m Tim.
          </h1>
          <div className="text-md space-y-4">
            <p>
              Currently, I am working on understanding how transformer language models represent the various entities involved in generating natural language at <Link href="https://humancompatible.ai" className="hover:underline">the Center for Human-Compatible AI</Link>.
            </p>
            <p>
              Previously, I&apos;ve worked on <Link href="https://arxiv.org/abs/2505.23575" className="hover:underline">stress-testing CoT monitoring</Link> at <Link href="https://lasrlabs.org" className="hover:underline">LASR Labs</Link> and <Link href="https://dspace.mit.edu/handle/1721.1/156804" className="hover:underline">interpretability, red-teaming, and steering of language models</Link> with the <Link href="https://algorithmicalignment.csail.mit.edu/" className="hover:underline">Algorithmic Alignment Group</Link>.
            </p>
            <p>
              Feel free to reach out to me! <span className="font-mono">:D</span><br />
              <span className="text-sm font-mono">[first initial][middle initial][last name][at][gmail]</span>
            </p>
          </div>
        </div>
        <div className="clear-both" />
      </div>
      <div className="mt-8">
        <h2 className="text-xl mb-4">Selected Publications</h2>
        <Publications selectedOnly={true} />
      </div>
    </div>
  );
}