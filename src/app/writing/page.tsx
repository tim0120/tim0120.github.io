import type { Metadata } from "next";
import DiffusionField from "@/components/DiffusionField";
import { publicationsPieces } from "@/lib/publications";
import { a, h, norm } from "@/lib/segments";

export const metadata: Metadata = {
  title: "writing",
};

const segments = norm([
  ...h("papers", [], { first: true }),
  ...publicationsPieces({ category: "paper" }),
  ...h("posts"),
  ...publicationsPieces({ category: "post" }),
  ...h("personal"),
  "i will write at ",
  a("tim.bearblog.dev", "https://tim.bearblog.dev"),
  "\n",
]);

export default function WritingPage() {
  return <DiffusionField segments={segments} />;
}
