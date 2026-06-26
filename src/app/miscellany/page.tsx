import Link from "next/link";

export default function MiscellanyPage() {
  return (
    <div>
      <section className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">cool sites</h2>
        <ul className="text-sm space-y-2 list-none">
          <li>
            <Link href="https://oscarmoxon.com" className="underline hover:underline">oscarmoxon.com</Link>
          </li>
          <li>
            <Link href="https://near.blog" className="underline hover:underline">near.blog</Link>
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">basketball</h2>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium mb-1">MIT (2019-2022)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
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
            <h3 className="text-sm font-medium mb-1">Japan National Team (2019)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Played at the William Jones Cup in Taiwan
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
            <h3 className="text-sm font-medium mb-1">De La Salle (2015-2019)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
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