<script setup lang="ts">
import { onKeyStroke, useResizeObserver } from '@vueuse/core'
import { onContentUpdated } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { nextTick, ref, useId, useTemplateRef, watch } from 'vue'

import { useData } from 'vitepress'
import { resolveTitle } from '../composables/outline'
import { useBodyScrollLock } from 'vitepress/dist/client/theme-default/composables/scroll-lock.js'
import VPDocOutlineItem from 'vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue'

defineProps<{
  headers: DefaultTheme.OutlineItem[]
  navHeight: number
}>()

const { theme } = useData()
const open = ref(false)
const vh = ref(0)
const main = useTemplateRef('main')
const items = useTemplateRef('items')
const outline = useTemplateRef<HTMLDivElement>('outline')
const itemsId = useId()

const isLocked = useBodyScrollLock()

useResizeObserver(outline, ([entry]) => {
  outline.value?.style.setProperty('--outline-viewport-height', `${entry.contentRect.height}px`)
})

function closeOnClickOutside(e: Event) {
  if (!main.value?.contains(e.target as Node)) {
    open.value = false
  }
}

function updateAvailableHeight() {
  const trigger = main.value?.getBoundingClientRect()
  if (!trigger?.height) {
    open.value = false
    return
  }
  vh.value = window.innerHeight - trigger.top
}

watch(open, (value, _, onCleanup) => {
  isLocked.value = value
  if (!value) return

  updateAvailableHeight()
  window.addEventListener('resize', updateAvailableHeight)
  document.addEventListener('click', closeOnClickOutside)

  onCleanup(() => {
    window.removeEventListener('resize', updateAvailableHeight)
    document.removeEventListener('click', closeOnClickOutside)
  })
})

onKeyStroke('Escape', () => {
  open.value = false
})

onContentUpdated(() => {
  open.value = false
})

function toggle() {
  open.value = !open.value
}

function onItemClick(e: Event) {
  if (e.target instanceof Element && e.target.closest('a.outline-link')) {
    if (items.value) {
      items.value.style.transition = 'none'
    }
    nextTick(() => {
      open.value = false
    })
  }
}

function scrollToTop() {
  open.value = false
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    ref="main"
    class="VPLocalNavOutlineDropdown"
    :style="{ '--vp-vh': vh + 'px' }"
    data-allow-mismatch="style"
  >
    <button
      v-if="headers.length > 0"
      type="button"
      :aria-expanded="open"
      :aria-controls="itemsId"
      :class="{ open }"
      @click="toggle"
    >
      <span class="menu-text">{{ resolveTitle(theme) }}</span>
      <span class="vpi-chevron-right icon" aria-hidden="true" />
    </button>
    <button v-else type="button" @click="scrollToTop">
      {{ theme.returnToTopLabel || 'Return to top' }}
    </button>
    <Transition name="flyout">
      <div v-if="open" ref="items" :id="itemsId" class="items" @click="onItemClick">
        <div class="items-scroll">
          <div class="header">
            <a class="top-link" href="#" @click="scrollToTop">
              {{ theme.returnToTopLabel || 'Return to top' }}
            </a>
          </div>
          <div ref="outline" class="outline">
            <VPDocOutlineItem :headers />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.VPLocalNavOutlineDropdown button {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 2;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  position: relative;
}

.VPLocalNavOutlineDropdown button:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.VPLocalNavOutlineDropdown button.open {
  color: var(--vp-c-text-1);
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin-inline-start: 0.125rem;
  font-size: 0.875rem;
  transform: rotate(0);
  transition: transform 0.25s;
}

@media (min-width: 60rem) {
  .VPLocalNavOutlineDropdown button {
    font-size: 0.875rem;
  }

  .icon {
    font-size: 1rem;
  }
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  position: absolute;
  top: 2.5rem;
  inset-inline: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.5rem;
  background-color: var(--vp-c-gutter);
  overflow: hidden;
  box-shadow: var(--vp-shadow-3);
}

.items-scroll {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1px;
  max-height: calc(var(--vp-vh, 100vh) - 5.375rem - 2px);
  overflow: clip;
}

@media (min-width: 60rem) {
  .items {
    inset-inline: calc(var(--vp-sidebar-width) + 2rem) auto;
    width: 20rem;
  }
}

.header {
  background-color: var(--vp-c-bg-soft);
}

.top-link {
  display: block;
  padding: 0 1rem;
  line-height: 3.4285714;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.outline {
  background-color: var(--vp-c-bg-soft);
  overflow: hidden auto;
  overscroll-behavior: contain;
}

.outline > :deep(ul) {
  padding-block: 0.5rem;
}

.flyout-enter-active {
  transition: all 0.2s ease-out;
}

.flyout-leave-active {
  transition: all 0.15s ease-in;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
