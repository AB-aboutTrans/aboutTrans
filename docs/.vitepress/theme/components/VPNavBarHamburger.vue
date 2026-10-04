<script setup lang="ts">
/// <reference path="../../env.d.ts" />

import { useTemplateRef, watchEffect } from 'vue'
import { useData } from 'vitepress'
import { useNav } from 'vitepress/dist/client/theme-default/composables/nav.js'
import IconMenu from '~icons/lucide/menu'
import IconX from '~icons/lucide/x'

defineProps<{ active: boolean }>()
defineEmits<{ click: [] }>()

const { theme } = useData()
const el = useTemplateRef<HTMLButtonElement>('el')
const { screenTriggerEl } = useNav()

watchEffect(() => {
  screenTriggerEl.value = el.value
})
</script>

<template>
  <button
    ref="el"
    type="button"
    class="VPNavBarHamburger"
    :class="{ active }"
    :aria-label="theme.mobileMenuLabel || 'Menu'"
    :aria-expanded="active"
    @click="$emit('click')"
  >
    <IconX v-if="active" class="menu-icon" aria-hidden="true" />
    <IconMenu v-else class="menu-icon" aria-hidden="true" />
  </button>
</template>

<style scoped>
.VPNavBarHamburger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
}

.menu-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 48rem) {
  .VPNavBarHamburger {
    display: none;
  }
}
</style>
