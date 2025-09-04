<script setup lang="ts">
// Set the dark theme for the entire application
useHead({
  htmlAttrs: {
    'data-theme': 'dark',
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>