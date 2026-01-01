import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import { h } from 'vue'
import { Share, SharePopup, ShareButtonInjector, registerComponents } from './components'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(Share),
      'layout-bottom': () => [
        h(SharePopup),
        h(ShareButtonInjector)
      ]
    })
  },
  enhanceApp(ctx) {
    const { app } = ctx
    registerComponents(app)
  }
}

export default ExtendedTheme