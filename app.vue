<script setup lang="ts">
// Set the custom theme for the entire application
useHead({
  htmlAttrs: {
    // 'data-theme': 'mytheme',
    // 'data-theme': 'dark',
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>