import TweetEmbed from "@/components/TweetEmbed";

export default function NowPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Now</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">What I&apos;m Up To</h2>
          <p className="text-md mb-4">
            I recently{' '}
            <a href="https://x.com/thkostolansky/status/2051340656153645171" className="underline hover:underline">
              joined
            </a>
            {' '}<a href="https://primeintellect.ai" className="underline hover:underline">
              Prime Intellect
            </a>
            !
          </p>
          <TweetEmbed tweetId="2051340656153645171" />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Recent</h2>
          <div className="space-y-1 text-sm">
            <div className="flex gap-1 items-baseline">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">Mar 2026</span>
              <div className="flex-1">
                Co-authored{' '}
                <a href="https://workshoplabs.ai/blog/post-training-50x-faster" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">
                  Post-Training 50x Faster
                </a>
                {' '}on the Workshop Labs blog, introducing Trellis, our open-source post-training codebase for Kimi-K2-Thinking.
              </div>
            </div>
            <div className="flex gap-1 items-baseline">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">Sep 2025</span>
              <div className="flex-1">
                Our paper{' '}
                <a href="https://arxiv.org/abs/2505.23575" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">
                  CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring
                </a>
                {' '}was accepted to NeurIPS 2025.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Based In</h2>
          <p className="text-md">
            San Francisco
          </p>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: May 2026
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <a href="https://nownownow.com/about" className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300 transition-colors">
                what&apos;s a now page?
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
