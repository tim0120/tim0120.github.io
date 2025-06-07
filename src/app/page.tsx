import Image from "next/image";
import Link from "next/link";
import ThemeAwareSvg from "@/components/ThemeAwareSvg";
import Publications from "@/components/Publications";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-between mb-2 space-x-10">
        <div>
          <h1 className="text-2xl mb-4">
            Hi, I&rsquo;m Tim.
          </h1>
          <div className="text-md space-y-4">
            <p>
              I am currently exploring how machines learn. I am also interested in solving problems arising from creating and adopting machine intelligence.
            </p>
            <p>
              Currently, I am working on understanding how transformer language models represent the various entities involved in generating natural language at <Link href="https://humancompatible.ai" className="hover:underline">the Center for Human-Compatible AI</Link>.
            </p>
            <p>
              Previously, I&apos;ve worked on <Link href="https://arxiv.org/abs/2505.23575" className="hover:underline">stress-testing CoT monitoring</Link> at <Link href="https://lasrlabs.org" className="hover:underline">LASR Labs</Link> and <Link href="https://dspace.mit.edu/handle/1721.1/156804" className="hover:underline">interpretability, red-teaming, and steering of language models</Link> with the <Link href="https://algorithmicalignment.csail.mit.edu/" className="hover:underline">Algorithmic Alignment Group</Link>.
            </p>
          </div>
        </div>
        <div className="text-center">
          <Image 
            src="/images/face.png" 
            alt="My face" 
            width={300} 
            height={300} 
            className="mx-auto sm:w-48 sm:h-auto" 
          />
          <h2 className="text-xl mt-2">Timothy H. Kostolansky</h2>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              { href: "/documents/resume.pdf", src: "/images/file-text.svg", label: "Resume" },
              { href: "https://github.com/tim0120", src: "/images/github.svg", label: "GitHub" },
              { href: "https://twitter.com/thkostolansky", src: "/images/twitter.svg", label: "Twitter" },
              { href: "https://linkedin.com/in/thkostolansky", src: "/images/linkedin.svg", label: "LinkedIn" }
            ].map((link, index) => (
              <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <ThemeAwareSvg src={link.src} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Previous Work</h2>
        <Publications />
      </div>
    </div>
  );
}