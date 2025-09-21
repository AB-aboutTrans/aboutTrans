import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import { h } from 'vue'
import Share from './components/Share.vue'
import SplashScreen from './components/SplashScreen.vue'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h('div', null, [
      h(SplashScreen),
      h(DefaultTheme.Layout, null, {
        'nav-bar-content-after': () => h(Share)
      })
    ])
  },
  enhanceApp({ app }: { app: any }) {
    app.component('Share', Share)
    app.component('SplashScreen', SplashScreen)
  }
}

export default ExtendedTheme