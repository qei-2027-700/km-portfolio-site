<script setup lang="ts">
import type { ContentItem } from '../types/content'

interface ContentProps {
  content: ContentItem & {
    icon?: string
    position?: string
    _dir?: string
  }
}
defineProps<ContentProps>()
</script>

<template>
  <NuxtLink :to="content._path" class="border border-accent block bg-base-100 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out h-full">
  <!-- <NuxtLink :to="content._path" class="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out h-full"> -->
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-start mb-4">
        <span v-if="content.icon" class="text-3xl mr-4">{{ content.icon }}</span>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-white">{{ content.title }}</h3>
          <!-- <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ content.title }}</h3> -->
          <div v-if="content._dir === 'experiences'" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <p>{{ content.company }} / {{ content.position }}</p>
            <p>{{ content.period }}</p>
          </div>
        </div>
      </div>

      <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
        {{ content.description }}
      </p>

      <!-- Footer -->
      <div>
        <div v-if="content._dir === 'projects'" class="flex items-center gap-4 mb-4">
          <a v-if="content.github" :href="content.github" target="_blank" rel="noopener noreferrer" @click.stop class="text-blue-500 hover:underline">GitHub</a>
          <a v-if="content.demo" :href="content.demo" target="_blank" rel="noopener noreferrer" @click.stop class="text-green-500 hover:underline">Demo</a>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in content.technologies"
            :key="tech"
            class="bg-white text-black dark:text-black text-xs font-semibold px-2.5 py-0.5 rounded-full border"
          >
            <!-- class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full" -->
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
