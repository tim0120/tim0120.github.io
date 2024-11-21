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
              { href: "https://twitter.com/timkostolansky", src: "/images/twitter.svg" },
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
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>