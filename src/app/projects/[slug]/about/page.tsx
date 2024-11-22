import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProjectAboutPage({ params }: Props) {
  try {
    const { slug } = await params;
    const markdownFile = readFileSync(
      join(process.cwd(), `src/content/projects/${slug}/about.md`),
      'utf-8'
    );
    
    const { content } = matter(markdownFile);
    
    return <MarkdownRenderer content={content} />;
  } catch (error) {
    console.error('Error loading about page:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  const projectsDir = join(process.cwd(), 'src/content/projects');
  const projectSlugs = readdirSync(projectsDir);

  return projectSlugs.map(slug => ({
    slug,
  }));
}
