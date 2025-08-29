import { defineConfig, presetAttributify, presetIcons } from 'unocss'
import { presetMini } from '@unocss/preset-mini'

export default defineConfig({
  preflights: [],
  variants: [
    (matcher: string) => {
      if (!matcher) return matcher;
      return {
        matcher,
        selector: (s: string) => `.unocss-scope ${s}`,
      };
    },
  ],
  presets: [
    presetMini(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'min-width': '1.2rem',
      },
      collections: {
        octicon: () => import('@iconify-json/octicon/icons.json').then(i => i.default),
      },
      warn: true,
    }),
  ],
})