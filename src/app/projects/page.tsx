import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
	const projects = getAllProjects()
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">Projects</h1>
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
				{projects.map((project) => {
					const href = project.externalUrl ?? `/projects/${project.slug}`;
					const isExternal = Boolean(project.externalUrl);
					const className = "block mb-4 break-inside-avoid border border-gray-300 rounded-lg p-4 hover:border-gray-400 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-shadow duration-100";
					return isExternal ? (
						<a key={project.slug} href={href} target="_blank" rel="noopener noreferrer" className={className}>
							<h2 className="text-base font-semibold mb-1">{project.title}</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
						</a>
					) : (
						<Link key={project.slug} href={href} className={className}>
							<h2 className="text-base font-semibold mb-1">{project.title}</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
