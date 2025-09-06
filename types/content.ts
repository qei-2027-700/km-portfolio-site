// Base content interface with common frontmatter fields
export interface BaseContent {
  title: string
  description: string
  category: string
  tags: string[]
  image?: string
  date: string
  _path: string
  body: any
  // Optional properties that may exist in any content type
  technologies?: string[]
  github?: string
  demo?: string
  company?: string
  period?: string
  level?: string
  status?: string
}

export interface Skill extends BaseContent {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon?: string
  order?: number
}

export interface Experience extends BaseContent {
  company: string
  position?: string
  period: string
  location?: string
  type?: 'work' | 'freelance' | 'internship' | 'volunteer'
  order?: number
}

export interface Project extends BaseContent {
  status: 'planning' | 'in-progress' | 'completed' | 'archived'
  technologies: string[]
  order?: number
}

export interface Creed extends BaseContent {
  order?: number
}

export type ContentItem = Skill | Experience | Project | Creed

export type ContentType = 'skills' | 'experiences' | 'projects' | 'creeds'

export interface ContentMeta {
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  image?: string
  slug: string
  type: ContentType
}

export interface ContentQueryOptions {
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  where?: Record<string, any>
}