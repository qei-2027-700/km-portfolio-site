<script setup lang="ts">
definePageMeta({
  title: 'ホーム'
})

const { data, pending } = await useAsyncData('home-content', () => {
  return Promise.all([
    queryContent('/skills').sort({ order: 1 }).find(),
    queryContent('/experiences').sort({ order: 1 }).find(),
    queryContent('/projects').sort({ order: 1 }).find()
  ])
})

const skills = computed(() => data.value?.[0] || [])
const experiences = computed(() => data.value?.[1] || [])
const projects = computed(() => data.value?.[2] || [])

</script>

<template>
  <HeroContents />

  <section id="skills" class="py-16 bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Skills</h2>
      <ClientOnly>
        <div v-if="skills.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ContentCard v-for="item in skills" :key="item._path" :content="item" />
        </div>
        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard v-for="n in 6" :key="n" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>

  <section id="experiences" class="py-16 bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Experiences</h2>
      <ClientOnly>
        <div v-if="experiences.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContentCard v-for="item in experiences" :key="item._path" :content="item" />
        </div>
        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkeletonCard v-for="n in 4" :key="n" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>

  <section id="projects" class="py-16 bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Projects</h2>
      <ClientOnly>
        <div v-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContentCard v-for="item in projects" :key="item._path" :content="item" />
        </div>
        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkeletonCard v-for="n in 4" :key="n" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
