<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const config = useRuntimeConfig()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md') // md is 768px

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navLinks = [
  { text: 'Home', to: '/' },
  { text: 'Skills', to: '/#skills' },
  { text: 'Experiences', to: '/#experiences' },
  { text: 'Projects', to: '/#projects' },
  { text: 'Creeds', to: '/#creeds' },
]
</script>

<template>
  <nav class="bg-gray-800 text-white relative">
  <!-- <nav class="bg-gray-800 text-white relative"> -->
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl font-bold text-white">{{ config.public.appName }}</NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div v-if="!isMobile" class="hidden md:flex items-center space-x-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.text"
            :to="link.to"
            class="px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-gray-700"
          >
            {{ link.text }}
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div v-else class="md:hidden">
          <button @click="toggleMenu" class="text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition name="slide-fade">
      <div v-show="isMobile && isMenuOpen" class="md:hidden absolute bg-gray-800 w-full shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.text"
            :to="link.to"
            @click="toggleMenu"
            class="block px-3 py-2 rounded-md text-accent font-medium hover:bg-gray-700"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
