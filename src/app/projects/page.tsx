import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
      {projects.map((project) => {
        const href = project.externalUrl ?? `/projects/${project.slug}`;
        const isExternal = Boolean(project.externalUrl);
        const inner = (
          <>
            <h2 className="text-base group-hover:underline decoration-gray-400">
              {project.title}
              {isExternal && <span className="text-gray-400"> ↗</span>}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </>
        );
        return isExternal ? (
          <a
            key={project.slug}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {inner}
          </a>
        ) : (
          <Link key={project.slug} href={href} className="group block">
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
