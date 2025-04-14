import { defineConfig, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
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