<script setup lang="ts">
definePageMeta({
  title: 'ホーム'
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold text-blue-500 mb-4">ポートフォリオサイト</h1>
    <p class="text-gray-300 mb-4">
      ようこそ！これはポートフォリオサイトのホームページです。
    </p>
    
    <div class="space-y-4">
      <NuxtLink to="/theme-test" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block">
        テーマテストページを見る
      </NuxtLink>
    </div>
  </div>
</template>