<script setup lang="ts">
// デフォルトレイアウト
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
