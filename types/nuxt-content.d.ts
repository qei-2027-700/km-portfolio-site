// Nuxt Content type declarations
declare module '#content/server' {
  interface ParsedContent {
    _path?: string
    _dir?: string
    _draft?: boolean
    _partial?: boolean
    _locale?: string
    title?: string
    description?: string
    body?: any
    [key: string]: any
  }
}

// Global queryContent function
declare global {
  function queryContent<T = any>(path?: string): any
}

export {}