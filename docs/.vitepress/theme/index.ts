import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './noto-sans-sc.css'
import 'virtual:uno.css'
import { h } from 'vue'
import Share from './components/share.vue'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'

if (typeof window !== 'undefined') {
  import('auto-right')

  const preventTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
  document.addEventListener('keydown', preventTab, true)
  import.meta.hot?.dispose(() => document.removeEventListener('keydown', preventTab, true))
}

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(Share),
    })
  },
}

export default ExtendedTheme
