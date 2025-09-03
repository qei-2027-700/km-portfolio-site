<template>
  <header class="bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- ロゴ/ホームリンク -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl font-bold text-white hover:text-green-400 transition-colors">
            Portfolio
          </NuxtLink>
        </div>

        <!-- デスクトップナビゲーション -->
        <nav class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink 
              to="/" 
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-white bg-gray-700': $route.path === '/' }"
            >
              ホーム
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-white bg-gray-700': $route.path === '/about' }"
            >
              About
            </NuxtLink>
            <NuxtLink 
              to="/theme-test" 
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-white bg-gray-700': $route.path === '/theme-test' }"
            >
              テーマテスト
            </NuxtLink>
          </div>
        </nav>

        <!-- モバイルメニューボタン -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-400 hover:text-white focus:outline-none focus:text-white"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- モバイルメニュー -->
      <div v-show="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            :class="{ 'text-white bg-gray-700': $route.path === '/' }"
          >
            ホーム
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            :class="{ 'text-white bg-gray-700': $route.path === '/about' }"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/theme-test" 
            @click="closeMobileMenu"
            class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            :class="{ 'text-white bg-gray-700': $route.path === '/theme-test' }"
          >
            テーマテスト
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// ルート変更時にモバイルメニューを閉じる
const route = useRoute()

watch(() => route.path, () => {
  closeMobileMenu()
})
</script>