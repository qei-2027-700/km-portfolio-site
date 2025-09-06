<script setup lang="ts">
import type { ContentItem, ContentMeta } from '../types/content'

const route = useRoute()
const slug = route.params.slug as string[]

const contentType = slug[0] as 'skills' | 'experiences' | 'projects'
const contentSlug = slug[1]

if (!contentType || !contentSlug || !['skills', 'experiences', 'projects'].includes(contentType)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const { data, pending, error } = await useLazyAsyncData<ContentItem | null>(
  `content-${contentType}-${contentSlug}`,
  () => queryContent(`/${contentType}/${contentSlug}`).findOne(),
  {
    transform: (data: any): ContentItem | null => {
      if (!data) return null

      if (!data.title || !data.description || !data.category) {
        return null
      }

      // console.log(data)

      return data as ContentItem
    }
  }
)

// Fetch related content based on tags
const { data: relatedContent } = await useLazyAsyncData<ContentMeta[]>(
  `related-${contentType}-${contentSlug}`,
  () => {
    if (!data.value?.tags || data.value.tags.length === 0) {
      return []
    }
    return queryContent<ContentMeta>()
      .where({
        _path: { $ne: data.value._path },
        tags: { $in: data.value.tags }
      })
      .limit(3)
      .find()
  },
  {
    default: () => []
  }
)

const getContentTypeLabel = (type: string): string => {
  const labels = {
    skills: 'スキル',
    experiences: '経験',
    projects: 'プロジェクト'
  }
  return labels[type as keyof typeof labels] || type
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getSkillLevelNumber = (level: string): number => {
  const levels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4
  }
  return levels[level as keyof typeof levels] || 1
}

// const getStatusColor = (status: string): string => {
//   const colors = {
//     planning: 'bg-yellow-500',
//     'in-progress': 'bg-blue-500',
//     completed: 'bg-green-500',
//     archived: 'bg-gray-500'
//   }
//   return colors[status as keyof typeof colors] || 'bg-gray-500'
// }

const getStatusLabel = (status: string): string => {
  const labels = {
    planning: '計画中',
    'in-progress': '進行中',
    completed: '完了',
    archived: 'アーカイブ'
  }
  return labels[status as keyof typeof labels] || status
}

useSeoMeta({
  title: () => data.value ? `${data.value.title} | ポートフォリオ` : 'ページが見つかりません',
  description: () => data.value?.description || 'お探しのページは見つかりませんでした。',
  ogTitle: () => data.value ? `${data.value.title} | ポートフォリオ` : 'ページが見つかりません',
  ogDescription: () => data.value?.description || 'お探しのページは見つかりませんでした。',
  ogImage: () => data.value?.image || '/images/og-default.jpg',
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

// Structured data for SEO (can be added later with @nuxtjs/seo module)
// TODO: Add structured data when @nuxtjs/seo is configured

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="loading loading-spinner loading-lg text-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-3xl font-bold text-white mb-2">コンテンツが見つかりません</h1>
      <p class="text-gray-400 mb-6">お探しのページは存在しないか、移動された可能性があります。</p>
      <NuxtLink to="/" class="btn btn-primary">
        ホームに戻る
      </NuxtLink>
    </div>

    <!-- Content Display -->
    <article v-else-if="data" class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumbs text-sm mb-6">
        <ul class="text-gray-400">
          <li>
            <NuxtLink to="/" class="text-accent hover:text-primary transition-colors">
              ホーム
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="`/#${contentType}`" class="text-accent hover:text-primary transition-colors capitalize">
              {{ getContentTypeLabel(contentType) }}
            </NuxtLink>
          </li>
          <li class="text-white">{{ data.title }}</li>
        </ul>
      </nav>

      <!-- Content Header -->
      <header class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-accent badge badge-primary badge-outline">
            {{ data.category }}
          </span>
          <span v-if="data.date" class="text-gray-400 text-sm">
            {{ formatDate(data.date) }}
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {{ data.title }}
        </h1>

        <p class="text-xl text-gray-300 leading-relaxed mb-6">
          {{ data.description }}
        </p>

        <div v-if="data.tags && data.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
          <span v-for="tag in data.tags" :key="tag" class="text-accent font-bold badge badge-neutral badge-sm">
            {{ tag }}
          </span>
        </div>

        <div class="stats shadow bg-gray-800/50 border border-gray-700 w-full">
          <div v-if="contentType === 'skills' && data.level" class="stat">
            <div class="stat-title">スキルレベル</div>
            <div class="stat-value text-xl capitalize">{{ data.level }}</div>
            <div class="stat-desc">
              <div class="rating rating-xs mt-1">
                <div v-for="i in 4" :key="i" class="mask mask-star-2"
                  :class="i <= getSkillLevelNumber(data.level || '') ? 'bg-accent' : 'bg-gray-600'"></div>
              </div>
            </div>
          </div>

          <div v-if="contentType === 'experiences' && data.company" class="stat">
            <div class="stat-title">会社 / 期間</div>
            <div class="stat-value text-xl">{{ data.company }}</div>
            <div class="stat-desc text-secondary">{{ data.period }}</div>
          </div>

          <div v-if="contentType === 'projects'" class="stat">
            <div class="stat-title">プロジェクト状況</div>
            <div class="stat-value text-xl capitalize">{{ getStatusLabel(data.status || '') }}</div>
            <div v-if="data.github || data.demo" class="stat-desc flex gap-2 mt-1">
              <a v-if="data.github" :href="data.github" target="_blank" rel="noopener noreferrer"
                class="link link-hover text-xs">GitHub</a>
              <a v-if="data.demo" :href="data.demo" target="_blank" rel="noopener noreferrer"
                class="link link-hover text-xs text-secondary">Demo</a>
            </div>
          </div>

          <div v-if="data.technologies && data.technologies.length > 0" class="stat">
            <div class="stat-title">使用技術</div>
            <div class="stat-value text-sm break-words whitespace-normal">
              {{ data.technologies.join(', ') }}
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="card bg-gray-800/60 shadow-xl border border-gray-700 mt-8">
        <div class="card-body">
          <div class="prose prose-invert prose-lg max-w-none">
            <ContentRenderer :value="data" />
          </div>
        </div>
      </div>

      <section v-if="relatedContent && relatedContent.length > 0" class="mt-12 pt-8 border-t border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-6">関連コンテンツ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="item in relatedContent" :key="item.slug" :to="`/${item.type}/${item.slug}`"
            class="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-primary badge-xs">{{ item.type }}</span>
              <span class="text-gray-400 text-xs">{{ formatDate(item.date) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-white group-hover:text-primary transition-colors mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-400 text-sm line-clamp-2">
              {{ item.description }}
            </p>
            <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1 mt-3">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="badge badge-outline badge-xs">
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Navigation -->
      <nav class="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
        <NuxtLink to="/" class="btn btn-outline">
          ← ホームに戻る
        </NuxtLink>

        <div class="text-center">
          <NuxtLink to="/" class="mt-2 text-gray-400 text-sm">
            他のコンテンツも見る
          </NuxtLink>
        </div>

        <NuxtLink :to="`/#${contentType}`" class="btn btn-outline">
          {{ getContentTypeLabel(contentType) }}一覧 →
        </NuxtLink>
      </nav>
    </article>
  </div>
</template>

<style scoped lang="scss">
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom prose styles for better dark theme integration */
.prose-invert {
  --tw-prose-body: rgb(209 213 219);
  --tw-prose-headings: rgb(255 255 255);
  --tw-prose-lead: rgb(156 163 175);
  --tw-prose-links: rgb(34 197 94);
  --tw-prose-bold: rgb(255 255 255);
  --tw-prose-counters: rgb(156 163 175);
  --tw-prose-bullets: rgb(75 85 99);
  --tw-prose-hr: rgb(55 65 81);
  --tw-prose-quotes: rgb(255 255 255);
  --tw-prose-quote-borders: rgb(55 65 81);
  --tw-prose-captions: rgb(156 163 175);
  --tw-prose-code: rgb(255 255 255);
  --tw-prose-pre-code: rgb(209 213 219);
  --tw-prose-pre-bg: rgb(31 41 55);
  --tw-prose-th-borders: rgb(55 65 81);
  --tw-prose-td-borders: rgb(75 85 99);
}

:deep(.prose-invert h2) {
  font-size: 2.25em;
  border-bottom: 2px solid #4a5568;
  padding-bottom: 0.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

:deep(.prose-invert h2 a) {
  color: oklch(77% 0.152 181.912);
}

:deep(.prose-invert h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.prose-invert h3 a) {
  color: white;
}

:deep(.prose-invert a) {
  // color: oklch(77% 0.152 181.912);
  text-decoration: none;
  transition: color 0.2s;
}

:deep(.prose-invert a:hover) {
  color: #90cdf4;
}

:deep(.prose-invert ul) {
  list-style: none;
  padding-left: 0;
}

:deep(.prose-invert li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

:deep(.prose-invert li::before) {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: oklch(77% 0.152 181.912);
  font-weight: bold;
  font-size: 1.1em;
}

:deep(.prose-invert pre) {
  background-color: #1a202c;
}
</style>