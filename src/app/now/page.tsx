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
            <a href="https://x.com/thkostolansky/status/1978988644795855063" className="underline hover:underline">
              joined
            </a>
            {' '}<a href="https://workshoplabs.ai" className="underline hover:underline">
              Workshop Labs
            </a>
            !
          </p>
          <TweetEmbed tweetId="1978988644795855063" />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Recent</h2>
          <p className="text-md">
            Our paper{' '}
            <a href="https://arxiv.org/abs/2505.23575" className="underline hover:underline">
              CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring
            </a>
            {' '}was accepted to NeurIPS 2025!
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Based In</h2>
          <p className="text-md">
            London, UK
          </p>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: October 2025
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
