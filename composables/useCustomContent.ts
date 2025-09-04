import type {
  ContentItem,
  ContentType,
  ContentMeta,
  ContentQueryOptions,
  Skill,
  Experience,
  Project
} from '~/types/content'

/**
 * Composable for managing content operations
 */
export const useCustomContent = () => {

  /**
   * Fetch all content items of a specific type
   */
  const fetchContentByType = async <T extends ContentItem>(
    type: ContentType,
    options: ContentQueryOptions = {}
  ): Promise<T[]> => {
    const { limit, skip, sortBy = 'date', sortOrder = 'desc', where } = options

    try {
      // @ts-ignore - queryContent auto-import from Nuxt Content
      let query = queryContent(`/${type}`)

      // Apply where conditions
      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          query = query.where({ [key]: value })
        })
      }

      // Apply sorting
      const sortDirection = sortOrder === 'desc' ? -1 : 1
      query = query.sort({ [sortBy]: sortDirection })

      // Apply pagination
      if (skip) {
        query = query.skip(skip)
      }
      if (limit) {
        query = query.limit(limit)
      }

      const results = await query.find()
      return results as T[]
    }
    catch (error) {
      console.error(`Error fetching content of type ${type}:`, error)
      return []
    }
  }

  /**
   * Fetch a single content item by path
   */
  const fetchContentByPath = async <T extends ContentItem>(
    path: string
  ): Promise<T | null> => {
    try {
      // @ts-ignore - queryContent might not be typed correctly
      const content = await queryContent(path).findOne()
      return content as T
    } catch (error) {
      console.error(`Error fetching content at ${path}:`, error)
      return null
    }
  }

  /**
   * Fetch content metadata for card display
   */
  const fetchContentMeta = async (
    type: ContentType,
    options: ContentQueryOptions = {}
  ): Promise<ContentMeta[]> => {
    const content = await fetchContentByType(type, options)

    return content.map((item) => ({
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags || [],
      date: item.date,
      image: item.image,
      slug: item._path?.replace(`/${type}/`, '') || '',
      type
    }))
  }

  /**
   * Fetch all skills
   */
  const fetchSkills = async (options: ContentQueryOptions = {}): Promise<Skill[]> => {
    return fetchContentByType<Skill>('skills', {
      sortBy: 'order',
      sortOrder: 'asc',
      ...options
    })
  }

  /**
   * Fetch all experiences
   */
  const fetchExperiences = async (options: ContentQueryOptions = {}): Promise<Experience[]> => {
    return fetchContentByType<Experience>('experiences', {
      sortBy: 'date',
      sortOrder: 'desc',
      ...options
    })
  }

  /**
   * Fetch all projects
   */
  const fetchProjects = async (options: ContentQueryOptions = {}): Promise<Project[]> => {
    return fetchContentByType<Project>('projects', {
      sortBy: 'date',
      sortOrder: 'desc',
      ...options
    })
  }

  /**
   * Search content across all types
   */
  const searchContent = async (
    query: string,
    types: ContentType[] = ['skills', 'experiences', 'projects']
  ): Promise<ContentMeta[]> => {
    const results: ContentMeta[] = []

    for (const type of types) {
      const content = await fetchContentByType(type, {
        where: {
          $or: [
            { title: { $icontains: query } },
            { description: { $icontains: query } },
            { tags: { $contains: query } }
          ]
        }
      })

      const meta = content.map((item) => ({
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags || [],
        date: item.date,
        image: item.image,
        slug: item._path?.replace(`/${type}/`, '') || '',
        type
      }))

      results.push(...meta)
    }

    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  /**
   * Get content by category
   */
  const fetchContentByCategory = async (
    category: string,
    type?: ContentType
  ): Promise<ContentMeta[]> => {
    if (type) {
      return fetchContentMeta(type, { where: { category } })
    }

    // Search across all types
    const allTypes: ContentType[] = ['skills', 'experiences', 'projects']
    const results: ContentMeta[] = []

    for (const contentType of allTypes) {
      const meta = await fetchContentMeta(contentType, { where: { category } })
      results.push(...meta)
    }

    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  /**
   * Get related content based on tags
   */
  const fetchRelatedContent = async (
    currentPath: string,
    tags: string[],
    limit: number = 3
  ): Promise<ContentMeta[]> => {
    const allTypes: ContentType[] = ['skills', 'experiences', 'projects']
    const results: ContentMeta[] = []

    for (const type of allTypes) {
      const content = await fetchContentByType(type, {
        where: {
          _path: { $ne: currentPath },
          tags: { $in: tags }
        }
      })

      const meta = content.map((item) => ({
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags || [],
        date: item.date,
        image: item.image,
        slug: item._path?.replace(`/${type}/`, '') || '',
        type
      }))

      results.push(...meta)
    }

    // Sort by relevance (number of matching tags) and date
    return results
      .sort((a, b) => {
        const aMatches = a.tags.filter(tag => tags.includes(tag)).length
        const bMatches = b.tags.filter(tag => tags.includes(tag)).length

        if (aMatches !== bMatches) {
          return bMatches - aMatches
        }

        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      .slice(0, limit)
  }

  return {
    fetchContentByType,
    fetchContentByPath,
    fetchContentMeta,
    fetchSkills,
    fetchExperiences,
    fetchProjects,
    searchContent,
    fetchContentByCategory,
    fetchRelatedContent
  }
}