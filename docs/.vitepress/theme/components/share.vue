<!--
  This file incorporates code from:
  Project: https://github.com/nolebase/integrations
  Authors: https://github.com/nolebase/integrations/graphs/contributors
  License: MIT License

  Copyright (c) 2023-PRESENT All the contributors of Nólëbase

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
<script lang="ts" setup>
/// <reference path="../../env.d.ts" />

import { useTimeoutFn } from '@vueuse/core'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import IconShare from '~icons/lucide/share'
import IconCheck from '~icons/lucide/check'
import IconX from '~icons/lucide/x'

const route = useRoute()
const shareLink = ref('')
const shareState = ref<'idle' | 'success' | 'failure'>('idle')
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  updateShareLink()
})

function updateShareLink() {
  if (typeof window === 'undefined' || !isMounted.value)
    return
  shareLink.value = window.location.href
  shareState.value = 'idle'
}

watch(() => route.path, updateShareLink, { immediate: true })

const { start: resetShareState } = useTimeoutFn(() => {
  if (shareState.value === 'success' || shareState.value === 'failure')
    shareState.value = 'idle'
}, 1500, { immediate: false })

async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    shareState.value = 'success'
    resetShareState()
  } catch {
    shareState.value = 'failure'
    resetShareState()
  }
}
</script>

<template>
  <div class="unocss-scope" style="display: flex; align-items: center; justify-content: center;">
    <button h-full ws-nowrap px3 text-sm font-semibold text="$vp-c-text-1" :class="[
      shareState === 'success' ? '!text-green-400' : '',
      shareState === 'failure' ? '!text-red-500' : '',
      shareLink ? 'hover:sm:text-$vp-c-brand' : '!cursor-wait',
    ]" :disabled="(!isMounted || !shareLink || shareState !== 'idle')" @click="copyShareLink()">
      <Transition mode="out-in" enter-active-class="share-btn-enter-active"
        leave-active-class="share-btn-leave-active"
        enter-from-class="transform translate-y-30px opacity-0" leave-to-class="transform translate-y--30px opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100">
        <span v-if="shareState === 'success'" class="share-btn-content" flex items-center>
          <IconCheck class="check-icon" aria-hidden="true" />
          <span>复制成功</span>
        </span>
        <span v-else-if="shareState === 'failure'" class="share-btn-content" flex items-center>
          <IconX class="failure-icon" aria-hidden="true" />
          <span>复制失败</span>
        </span>
        <span v-else class="share-btn-content" flex items-center>
          <IconShare class="share-icon" aria-hidden="true" />
          <span>分享此页</span>
        </span>
      </Transition>
    </button>
  </div>
</template>

<style>
.unocss-scope .share-btn-enter-active {
  transition: transform 250ms ease-out, opacity 250ms ease-out;
}

.unocss-scope .share-btn-leave-active {
  transition: transform 250ms ease-out, opacity 250ms ease-out;
}

.unocss-scope .share-btn-content {
  will-change: transform;
}

.unocss-scope .share-icon,
.unocss-scope .check-icon,
.unocss-scope .failure-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-inline-end: 4px;
}

.unocss-scope .share-icon path,
.unocss-scope .check-icon path,
.unocss-scope .failure-icon path {
  stroke-width: 2.5;
}
</style>
