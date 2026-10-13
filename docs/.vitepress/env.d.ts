/// <reference types="vitepress/client" />
/// <reference types="unplugin-icons/types/vue" />

declare module 'auto-right'
declare module 'virtual:uno.css'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
