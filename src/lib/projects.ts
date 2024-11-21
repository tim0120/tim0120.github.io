export type ProjectType = {
    slug: string
    title: string
    description: string
    // Add other project metadata
  }
  
const PROJECTS: ProjectType[] = [
  {
    slug: 'emoji-search',
    title: 'Emoji Search',
    description: 'Interactive emoji search tool',
  },
  // Add more projects
]

export async function getProjectData(slug: string): Promise<ProjectType> {
  const project = PROJECTS.find(p => p.slug === slug)
  if (!project) throw new Error(`Project ${slug} not found`)
  return project
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map(project => project.slug)
}