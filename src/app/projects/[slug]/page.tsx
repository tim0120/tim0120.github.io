// Template for project pages
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { getProjectData, getAllProjectSlugs } from '@/lib/projects'

// Dynamically import project components
const PROJECT_COMPONENTS = {
  'emoji-search': dynamic(() => import('@/components/projects/EmojiSearch')),
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for each project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectData(slug)
  
  return {
    title: project.title,
    description: project.description,
  }
}

type ProjectSlug = keyof typeof PROJECT_COMPONENTS

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectData(slug)
  const ProjectComponent = PROJECT_COMPONENTS[slug as ProjectSlug]

  if (!ProjectComponent) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen">
      <ProjectComponent slug={project.slug} title={project.title} description={project.description} />
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs() // ['emoji-search', 'other-project', etc]
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}