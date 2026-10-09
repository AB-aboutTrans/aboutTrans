/// <reference types="vitepress/client" />
/// <reference types="unplugin-icons/types/vue" />

declare module 'auto-right'
declare module 'virtual:uno.css'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module 'markdown-it-pangu' {
  import type { PluginWithOptions } from 'markdown-it'

  interface PanguOptions {
    additionalRules?: string[]
  }

  const pangu: PluginWithOptions<PanguOptions>
  export = pangu
}
