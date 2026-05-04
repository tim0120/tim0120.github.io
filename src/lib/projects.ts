export type ProjectType = {
    slug: string
    title: string
    description: string
    externalUrl?: string
  }

const PROJECTS: ProjectType[] = [
  {
    slug: 'emoji-search',
    title: 'Emoji Search',
    description: 'An emoji search engine 🔍',
  },
  {
    slug: 'clocktower',
    title: 'Clocktower',
    description: 'macOS menu bar app for timed reminders at regular intervals.',
    externalUrl: 'https://github.com/tim0120/clocktower',
  },
  {
    slug: 'esdimkid',
    title: 'EsDimKid',
    description: 'macOS window dimmer. Dims inactive windows to help you focus.',
    externalUrl: 'https://github.com/tim0120/EsDimKid',
  },
  {
    slug: 'imessage-mcp',
    title: 'iMessage MCP',
    description: 'MCP server to search, browse, and send iMessages on macOS, backed by an FTS5 index.',
    externalUrl: 'https://github.com/tim0120/imessage-mcp',
  },
  {
    slug: 'claude-code-history-mcp',
    title: 'Claude Code History MCP',
    description: 'MCP server for searching Claude Code conversation history, with AI-powered summaries.',
    externalUrl: 'https://github.com/tim0120/claude-code-history-mcp',
  },
]

export async function getProjectData(slug: string): Promise<ProjectType> {
  const project = PROJECTS.find(p => p.slug === slug)
  if (!project) throw new Error(`Project ${slug} not found`)
  return project
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.filter(p => !p.externalUrl).map(project => project.slug)
}

export function getAllProjects(): ProjectType[] {
  return PROJECTS
}