import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function ProjectsPage() {
	const projects = getAllProjects()
  return (
	<div className="">
	  <div className="flex flex-col items-start">
			<h1 className="text-3xl font-bold mb-4">Projects</h1>
			{projects.map((project) => (
				<div key={project.slug} className="mb-4 mt-4 border border-transparent rounded-lg hover:border-gray-300 p-4">
					<Link href={`/projects/${project.slug}`}>
						<h2 className="text-xl font-bold">{project.title}</h2>
						<p>{project.description}</p>
					</Link>
				</div>
			))}
	  </div>
	</div>
  );
}