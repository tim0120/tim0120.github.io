import type { Metadata } from "next";
import DiffusionField from "@/components/DiffusionField";
import { publicationsPieces } from "@/lib/publications";
import { a, col, dim, h, joinWith, norm, type Piece } from "@/lib/segments";

export const metadata: Metadata = {
  title: "cv",
};

const YEAR_W = 9;

// One timeline row: `year  what · where`, with continuation lines hanging
// under `what`.
function row(year: string, what: Piece, where: Piece): Piece[] {
  return [col(year, YEAR_W), what, dim(" @ ", { indent: YEAR_W }), where, "\n"];
}

// A row whose tail is a list of dim links: `year  what · link · link`.
function linksRow(year: string, what: string, links: [string, string][]): Piece[] {
  return [
    col(year, YEAR_W),
    { text: what, indent: YEAR_W },
    dim(" · ", { indent: YEAR_W }),
    ...joinWith(dim(" · ", { indent: YEAR_W }), links.map(([label, href]) => [a(label, href, { dim: true, indent: YEAR_W })])),
    "\n",
  ];
}

export default function CvPage() {
  const link = (what: string, href: string, o = {}) => a(what, href, { indent: YEAR_W, ...o });
  const org = (name: string, href: string) => a(name, href, { dim: true, indent: YEAR_W });

  const segments = norm([
    a("resume.pdf", "/documents/resume.pdf", { dim: true }),
    "\n\n",
    ...row("2026", link("decentralizing frontier AI", "https://www.primeintellect.ai/blog/lab"), org("Prime Intellect", "https://primeintellect.ai")),
    ...row("2025–26", link("building AI for a human future", "https://x.com/thkostolansky/status/1978988644795855063"), org("Workshop Labs", "https://workshoplabs.ai")),
    ...row("2025", { text: "investigating entity representations in LLMs", indent: YEAR_W }, org("CHAI", "https://humancompatible.ai")),
    ...row("2025", link("stress-testing chain-of-thought monitoring", "https://arxiv.org/abs/2505.23575"), org("LASR Labs", "https://lasrlabs.org")),
    ...row("2023–24", link("inverse constitution learning", "https://dspace.mit.edu/handle/1721.1/156804"), org("AAG", "https://algorithmicalignment.csail.mit.edu/")),
    ...row("2023–24", { text: "MEng CS", indent: YEAR_W }, dim("MIT")),
    ...row("2019–23", { text: "BS Physics & BS CS", indent: YEAR_W }, dim("MIT")),
    ...h("basketball"),
    ...linksRow("2019–22", "MIT", [
      ["athletics profile", "https://mitathletics.com/sports/mens-basketball/roster/tim-kostolansky/9709"],
      ["espn stats", "https://www.espn.com/mens-college-basketball/player/_/id/4596795/tim-kostolansky"],
    ]),
    ...linksRow("2019", "Japan National Team, William Jones Cup", [
      ["game highlights", "https://www.youtube.com/watch?v=We5grgBczjY"],
      ["basketball king feature", "https://basketballking.jp/news/japan/mnational/20190616/169004.html"],
      ["basket count interview", "https://basket-count.com/article/detail/24088"],
    ]),
    ...linksRow("2015–19", "De La Salle", [
      ["rap highlight video", "https://www.youtube.com/watch?v=GBJPhRF89w4"],
      ["hudl highlights", "https://www.hudl.com/profile/8004479/Tim-Kostolansky"],
      ["maxpreps", "https://www.maxpreps.com/ca/concord/de-la-salle-spartans/athletes/tim-kostolansky/?careerid=68qemp27rr155"],
      ["ncs division I championship", "https://www.mercurynews.com/2019/02/23/ncs-basketball-seniors-help-write-de-la-salles-storybook-ending/"],
    ]),
    ...h("selected publications"),
    ...publicationsPieces({ selectedOnly: true }),
    "\n",
    a("see more writing", "/writing", { dim: true }),
    "\n",
  ]);

  return <DiffusionField segments={segments} />;
}
