import type { Metadata } from "next";
import DiffusionField from "@/components/DiffusionField";
import { CURIUS_PROFILE, recentCuriusSaves } from "@/lib/curius";
import { a, col, h, norm, type Piece } from "@/lib/segments";

export const metadata: Metadata = {
  title: "links",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toLowerCase();

export default async function LinksPage() {
  const saves = await recentCuriusSaves(3);

  const segments = norm([
    ...h("other sites", [], { first: true }),
    a("oscar", "https://oscarmoxon.com"),
    "\n",
    a("samuel", "https://samuelratnam.xyz"),
    "\n",
    a("xavi", "https://xavicf.com/"),
    "\n",
    a("near", "https://near.blog"),
    "\n",
    ...(saves.length
      ? ([
          ...h("recently saved on curius"),
          ...saves.flatMap((s) => [col(fmtDate(s.date), 8), a(s.title, s.link, { indent: 8 }), "\n"]),
          "\n",
          a("more on curius", CURIUS_PROFILE, { dim: true }),
          "\n",
        ] as Piece[])
      : []),
  ]);

  return <DiffusionField segments={segments} />;
}
