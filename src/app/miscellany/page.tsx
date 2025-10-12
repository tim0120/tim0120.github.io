import Link from "next/link";

export default function MiscellanyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Miscellany</h1>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">Reading</h2>
        <p className="text-md">
          I keep my research library on{' '}
          <Link href="https://www.zotero.org/thkostolansky" className="underline hover:underline">
            Zotero
          </Link>
          {' '}and save things I read to{' '}
          <Link href="https://curius.app/timothy-kostolansky" className="underline hover:underline">
            Curius
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-3">Some of My Favorite Tools</h2>
        <ul className="text-md space-y-2 list-none">
          <li>
            <Link href="https://www.raycast.com" className="underline hover:underline">Raycast</Link>
            {' '}for launching things
          </li>
          <li>
            <Link href="https://shortcat.app" className="underline hover:underline">Shortcat</Link>
            {' '}for keyboard-only UI navigation
          </li>
          <li>
            <Link href="https://maccy.app" className="underline hover:underline">Maccy</Link>
            {' '}for clipboard history
          </li>
          <li>
            <Link href="https://gist.github.com/gsinclair/f4ab34da53034374eb6164698a0a8ace" className="underline hover:underline">Karabiner layers</Link>
            {' '}(holding home row keys gives me navigation/symbols/numbers)
          </li>
          <li>
            <Link href="https://ghostty.org" className="underline hover:underline">Ghostty</Link>
            {' '}as my terminal
          </li>
          <li>
            <Link href="https://cursor.com" className="underline hover:underline">Cursor</Link>
            {' '}/ {' '}
            <Link href="https://neovim.io" className="underline hover:underline">nvim</Link>
            {' '}for editing
          </li>
          <li>
            <Link href="https://claude.com/claude-code" className="underline hover:underline">Claude Code</Link>
            {' '}for AI assistance
          </li>
          <li>
            <Link href="https://obsidian.md" className="underline hover:underline">Obsidian</Link>
            {' '}for notes
          </li>
          <li>
            <Link href="https://superwhisper.com" className="underline hover:underline">Superwhisper</Link>
            {' '}vs{' '}
            <Link href="https://wispr.ai" className="underline hover:underline">Wispr Flow</Link>
            {' '}(battling for voice-to-text supremacy)
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