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
import { useClipboard } from '@vueuse/core'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import IconShare from '~icons/octicon/share-16'
import IconCheckbox from '~icons/octicon/checkbox-16'

const route = useRoute()
const shareLink = ref('')
const isMounted = ref(false)

// Ensure component only runs on client-side
onMounted(() => {
  isMounted.value = true
  updateShareLink()
})

function updateShareLink() {
  if (typeof window === 'undefined' || !isMounted.value)
    return
  shareLink.value = window.location.href
}

watch(() => route.path, updateShareLink, { immediate: true })

const { copy, copied: shareSuccess } = useClipboard()
function copyShareLink() {
  copy(shareLink.value)
}
</script>

<template>
  <div class="unocss-scope" style="display: flex; align-items: center; justify-content: center;">
    <button h-full ws-nowrap px3 text-sm font-semibold text="$vp-c-text-1" :class="[
      shareSuccess ? '!text-green-400' : '',
      shareLink ? 'hover:sm:text-$vp-c-brand' : '!cursor-wait',
    ]" :disabled="(!isMounted || !shareLink || shareSuccess)" @click="copyShareLink()">
      <Transition mode="out-in" enter-active-class="share-btn-enter-active"
        leave-active-class="share-btn-leave-active"
        enter-from-class="transform translate-y-30px opacity-0" leave-to-class="transform translate-y--30px opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100">
        <span v-if="shareSuccess" class="share-btn-content" flex items-center space-x-1>
          <IconCheckbox class="checkbox-icon" aria-hidden="true" />
          <span>复制成功</span>
        </span>
        <span v-else class="share-btn-content" flex items-center space-x-1>
          <IconShare class="share-icon" aria-hidden="true" />
          <span>分享此页</span>
        </span>
      </Transition>
    </button>
    <div class="bg-$vp-c-divider-light" mx2 block h-24px w-1px md:hidden />
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
  /* 动画期间及结束后保持独立合成层，避免 transform 归零时层回收导致的抖动 */
  will-change: transform;
}

.unocss-scope .share-icon,
.unocss-scope .checkbox-icon {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  flex-shrink: 0;
  margin-inline-end: 4px;
}
</style>
