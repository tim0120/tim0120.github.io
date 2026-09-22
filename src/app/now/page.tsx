import type { Metadata } from "next";
import DiffusionField from "@/components/DiffusionField";
import { norm } from "@/lib/segments";

export const metadata: Metadata = {
  title: "now",
};

export default function NowPage() {
  return <DiffusionField segments={norm(["thinking and feeling :)\n\nfiguring out whats next!"])} />;
}
