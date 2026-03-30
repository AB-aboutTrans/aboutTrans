<!--
  This file incorporates code from:
  Project: https://github.com/vuejs/vitepress
  Authors: https://github.com/vuejs/vitepress/graphs/contributors
  License: MIT License
  
  Copyright (c) 2019-present, Yuxi (Evan) You
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->
<script setup lang="ts">
import { useNavigatorLanguage } from '@vueuse/core'
import { computed, onMounted, shallowRef, useTemplateRef, watchEffect } from 'vue'
import { useData, type DefaultTheme } from 'vitepress'

const { theme, page, lang: pageLang } = useData()
const { language: browserLang } = useNavigatorLanguage()

const timeRef = useTemplateRef('timeRef')

const date = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = shallowRef('')

type LastUpdatedSpacingConfig =
  | boolean
  | {
      enabled?: boolean
      locales?: string[]
    }

type LastUpdatedWithSpacing = DefaultTheme.LastUpdatedOptions & {
  dateTimeSpacing?: LastUpdatedSpacingConfig
}

const spacingConfig = computed(
  () =>
    (theme.value.lastUpdated as LastUpdatedWithSpacing | undefined)?.dateTimeSpacing
)

function isLocaleMatch(currentLang: string, locale: string): boolean {
  const normalizedLang = currentLang.toLowerCase()
  const normalizedLocale = locale.toLowerCase()
  return (
    normalizedLang === normalizedLocale ||
    normalizedLang.startsWith(`${normalizedLocale}-`)
  )
}

function shouldApplySpacing(lang?: string): boolean {
  if (!lang) return false

  const config = spacingConfig.value

  if (config === false) return false
  if (config === true) return /^zh(?:-|$)/i.test(lang)
  if (config?.enabled === false) return false

  const locales = config?.locales?.length ? config.locales : ['zh']
  return locales.some((locale) => isLocaleMatch(lang, locale))
}

function spacingText(input: string): string {
  return input
    .replace(/([\u3400-\u9FFF])([A-Za-z0-9])/g, '$1 $2')
    .replace(/([A-Za-z0-9])([\u3400-\u9FFF])/g, '$1 $2')
}

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    const lang = theme.value.lastUpdated?.formatOptions?.forceLocale
      ? pageLang.value
      : browserLang.value

    const raw = new Intl.DateTimeFormat(
      lang,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    ).format(date.value)

    datetime.value = shouldApplySpacing(lang) ? spacingText(raw) : raw

    if (lang && pageLang.value !== lang) {
      timeRef.value?.setAttribute('lang', lang)
    } else {
      timeRef.value?.removeAttribute('lang')
    }
  })
})
</script>

<template>
  <p class="VPLastUpdated">
    {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}:
    <time ref="timeRef" :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
