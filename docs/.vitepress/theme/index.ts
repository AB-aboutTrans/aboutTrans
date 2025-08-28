import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import { h } from 'vue'
import { onMounted } from 'vue'
import Share from './components/share.vue'
import { addFontWeightSwitchListener } from './fontswitch'

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(Share),
    })
  },
  enhanceApp(ctx) {
    const { app } = ctx
    app.component('Share', Share)
  },
  setup() {
    onMounted(() => {
      addFontWeightSwitchListener();
    });
  },
}

export default ExtendedTheme