import { inject } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  // Vercel Analyticsを初期化
  inject()
})
