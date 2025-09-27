import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
	const projects = getAllProjects()
  return (
	<div className="">
	  <div className="flex flex-col items-start">
			<h1 className="text-3xl font-bold mb-4">Projects</h1>
			{projects.map((project) => (
				<Link key={project.slug} href={`/projects/${project.slug}`} className="block mb-4 mt-4 border border-gray-300 rounded-lg p-4 hover:border-gray-400 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-shadow duration-100">
					<h2 className="text-xl font-bold">{project.title}</h2>
					<p>{project.description}</p>
				</Link>
			))}
	  </div>
	</div>
  );
}