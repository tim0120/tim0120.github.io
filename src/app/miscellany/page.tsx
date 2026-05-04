import Link from "next/link";

export default function MiscellanyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Miscellany</h1>

<section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">Some of My Favorite Tools</h2>
        <div className="relative w-full h-[320px] sm:h-[360px]">
          {[
            { name: 'Raycast',       url: 'https://www.raycast.com',                                              favicon: 'raycast.com',                  top: 22, left: 14, size: 52, delay: 0.0, dur: 11, drift: [ 14, -10, -12, -16,  -8,  14] },
            { name: 'Shortcat',      url: 'https://shortcat.app',                                                 favicon: 'shortcat.app',                 top: 62, left: 8,  size: 44, delay: 1.8, dur:  9, drift: [-12,  14,  16,   8,   6, -14] },
            { name: 'Maccy',         url: 'https://maccy.app',                                                    favicon: 'maccy.app',                    top: 82, left: 26, size: 46, delay: 3.2, dur: 12, drift: [ 10,  12, -14,  10, -16,  -8] },
            { name: 'Karabiner layers', url: 'https://gist.github.com/gsinclair/f4ab34da53034374eb6164698a0a8ace', favicon: 'karabiner-elements.pqrs.org', top: 10, left: 38, size: 56, delay: 0.9, dur: 10, drift: [-14,   8,  12, -14,  -6,  16] },
            { name: 'Ghostty',       url: 'https://ghostty.org',                                                  favicon: 'ghostty.org',                  top: 48, left: 36, size: 56, delay: 2.4, dur: 13, drift: [ 16,  14,   8, -12, -16,  -6] },
            { name: 'Cursor',        url: 'https://cursor.com',                                                   favicon: 'cursor.com',                   top: 18, left: 62, size: 48, delay: 0.4, dur:  9, drift: [-10, -14,  14,   6,  12,  12] },
            { name: 'Claude Code',   url: 'https://claude.com/claude-code',                                       favicon: 'claude.com',                   top: 52, left: 72, size: 52, delay: 2.7, dur: 11, drift: [ 12,  10, -16, -14,   8, -10] },
            { name: 'Codex',         url: 'https://developers.openai.com/codex/cli',                              favicon: 'openai.com',                   top: 78, left: 54, size: 44, delay: 1.2, dur: 10, drift: [-14,  -8,  10,  14, -12,   6] },
            { name: 'Obsidian',      url: 'https://obsidian.md',                                                  favicon: 'obsidian.md',                  top: 30, left: 88, size: 48, delay: 2.0, dur: 12, drift: [ -8,  16,  14, -10,  16,  -8] },
            { name: 'Wispr Flow',    url: 'https://wispr.ai',                                                     favicon: 'wispr.ai',                     top: 80, left: 84, size: 44, delay: 0.8, dur:  9, drift: [ 10, -14, -14,  12,  -6,  14] },
          ].map((tool) => {
            const [dx1, dy1, dx2, dy2, dx3, dy3] = tool.drift;
            return (
              <Link
                key={tool.name}
                href={tool.url}
                title={tool.name}
                aria-label={tool.name}
                className="tool-cloud-icon"
                style={{
                  top: `${tool.top}%`,
                  left: `${tool.left}%`,
                  width: tool.size,
                  height: tool.size,
                  ['--delay' as string]: `${tool.delay}s`,
                  ['--dur' as string]: `${tool.dur}s`,
                  ['--dx1' as string]: `${dx1}px`,
                  ['--dy1' as string]: `${dy1}px`,
                  ['--dx2' as string]: `${dx2}px`,
                  ['--dy2' as string]: `${dy2}px`,
                  ['--dx3' as string]: `${dx3}px`,
                  ['--dy3' as string]: `${dy3}px`,
                }}
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${tool.favicon}&sz=128`}
                  alt={tool.name}
                  width={tool.size}
                  height={tool.size}
                  className="rounded-lg w-full h-full"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">Cool Sites</h2>
        <ul className="text-md space-y-2 list-none">
          <li>
            <Link href="https://oscarmoxon.com" className="underline hover:underline">oscarmoxon.com</Link>
          </li>
          <li>
            <Link href="https://near.blog" className="underline hover:underline">near.blog</Link>
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Basketball</h2>

        <div className="space-y-3">
          <div>
            <h3 className="font-medium mb-1">MIT (2019-2022)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link href="https://mitathletics.com/sports/mens-basketball/roster/tim-kostolansky/9709" className="underline hover:underline">
                MIT Athletics profile
              </Link>
              {' · '}
              <Link href="https://www.espn.com/mens-college-basketball/player/_/id/4596795/tim-kostolansky" className="underline hover:underline">
                ESPN stats
              </Link>
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Japan National Team (2019)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Played at the William Jones Cup in Taiwan
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <Link href="https://www.youtube.com/watch?v=We5grgBczjY" className="underline hover:underline">
                Game highlights
              </Link>
              {' · '}
              <Link href="https://basketballking.jp/news/japan/mnational/20190616/169004.html" className="underline hover:underline">
                Basketball King feature
              </Link>
              {' · '}
              <Link href="https://basket-count.com/article/detail/24088" className="underline hover:underline">
                Basket Count interview
              </Link>
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">De La Salle (2015-2019)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link href="https://www.youtube.com/watch?v=GBJPhRF89w4" className="underline hover:underline">
                Rap highlight video
              </Link>
              {' · '}
              <Link href="https://www.hudl.com/profile/8004479/Tim-Kostolansky" className="underline hover:underline">
                Hudl highlights
              </Link>
              {' · '}
              <Link href="https://www.maxpreps.com/ca/concord/de-la-salle-spartans/athletes/tim-kostolansky/?careerid=68qemp27rr155" className="underline hover:underline">
                MaxPreps
              </Link>
              {' · '}
              <Link href="https://www.mercurynews.com/2019/02/23/ncs-basketball-seniors-help-write-de-la-salles-storybook-ending/" className="underline hover:underline">
                NCS Division I championship (2019)
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}