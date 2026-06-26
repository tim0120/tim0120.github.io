import Link from "next/link";
import type { Metadata } from "next";
import Publications from "@/components/Publications";

export const metadata: Metadata = {
  title: "writing",
};

export default function WritingPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-2">papers</h2>
        <Publications category="paper" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">posts</h2>
        <Publications category="post" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">personal</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          i write at{" "}
          <Link
            href="https://tim.bearblog.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors"
          >
            tim.bearblog.dev
          </Link>
        </p>
      </section>
    </div>
  );
}
