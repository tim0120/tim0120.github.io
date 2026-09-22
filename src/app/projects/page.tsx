import type { Metadata } from "next";
import DiffusionField from "@/components/DiffusionField";
import { getAllProjects } from "@/lib/projects";
import { a, dim, norm, type Piece } from "@/lib/segments";

export const metadata: Metadata = {
  title: "projects",
};

export default function ProjectsPage() {
  const pieces: Piece[] = getAllProjects().flatMap((p) => [
    p.comingSoon ? p.title : a(p.title, p.externalUrl ?? `/projects/${p.slug}`),
    "\n  ",
    dim(p.description, { indent: 2 }),
    "\n\n",
  ]);
  return <DiffusionField segments={norm(pieces)} />;
}
