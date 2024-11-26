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
          <p className="text-md">
            I am a researcher and engineer trying to figure out how machines learn. I am also interested in solving problems arising from the creation and adoption of artificially intelligent systems.<br /><br />
            Currently, I am working on interpretability, red-teaming, and steering of language models with the <Link href="https://algorithmicalignment.csail.mit.edu/" className="text-blue-500 hover:underline">Algorithmic Alignment Group</Link>. You can find works of mine below or in my <Link href="/projects" className="text-blue-500 hover:underline">projects</Link>.
          </p>
        </div>
        <div className="text-center">
          <Image 
            src="/images/face.png" 
            alt="My face" 
            width={300} 
            height={300} 
            className="mx-auto sm:w-48 sm:h-auto" 
          />
          <h1 className="text-xl mt-2">Timothy H. Kostolansky</h1>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              { href: "/documents/resume.pdf", src: "/images/file-text.svg" },
              { href: "https://github.com/tim0120", src: "/images/github.svg" },
              { href: "https://twitter.com/thkostolansky", src: "/images/twitter.svg" },
              { href: "https://linkedin.com/in/kostolansky", src: "/images/linkedin.svg" }
            ].map((link, index) => (
              <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <ThemeAwareSvg src={link.src} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4">Previous Work</h1>
        <Publications />
      </div>
    </div>
  );
}