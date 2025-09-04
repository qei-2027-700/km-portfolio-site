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
}

// Skill content type
export interface Skill extends BaseContent {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  technologies?: string[]
  icon?: string
  order?: number
}

// Experience content type  
export interface Experience extends BaseContent {
  company: string
  position?: string
  period: string
  location?: string
  type?: 'work' | 'freelance' | 'internship' | 'volunteer'
  technologies?: string[]
  order?: number
}

// Project content type
export interface Project extends BaseContent {
  status: 'planning' | 'in-progress' | 'completed' | 'archived'
  technologies: string[]
  github?: string
  demo?: string
  order?: number
}

// Content type union
export type ContentItem = Skill | Experience | Project

// Content category types
export type ContentType = 'skills' | 'experiences' | 'projects'

// Content meta for card display
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

// Query options for content fetching
export interface ContentQueryOptions {
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  where?: Record<string, any>
}