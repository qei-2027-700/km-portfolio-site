<script setup lang="ts">
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<template>
  <div class="hero min-h-screen from-success to-accent">
    <div class="hero-overlay bg-opacity-30"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-2xl">
        <h1 class="mb-5 text-6xl font-bold drop-shadow-lg text-white">
          Welcome to
          <br>
          <span class="text-accent">KM Portfolio</span>
        </h1>
        
        <p class="mb-8 text-xl text-white drop-shadow">
          モダンなWeb開発技術を駆使したフルスタック開発者のポートフォリオ
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button @click="smoothScrollTo('skills')" class="text-neutral-content btn btn-lg shadow-lg hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Skills & Tech Stack
          </button>
          <button @click="smoothScrollTo('experiences')" class="btn btn-outline btn-accent btn-lg shadow-lg hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Experience
          </button>
          <button @click="smoothScrollTo('projects')" class="btn btn-outline btn-accent btn-lg shadow-lg hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v4z" />
            </svg>
            Projects
          </button>
        </div>

        <div class="flex justify-center mt-16">
          <button @click="smoothScrollTo('skills')" class="btn btn-circle btn-outline btn-accent hover:btn-accent animate-bounce transition-all duration-300 hover:animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
