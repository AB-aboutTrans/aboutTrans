import { defineConfig, presetAttributify } from 'unocss'
import { presetMini } from '@unocss/preset-mini'

export default defineConfig({
  preflights: [],
  variants: [
    (matcher: string) => {
      if (!matcher) return matcher
      return {
        matcher,
        selector: (s: string) => `.unocss-scope ${s}`,
      }
    },
  ],
  presets: [
    presetMini(),
    presetAttributify(),
  ],
})
