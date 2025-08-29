<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'

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
    <button h-full ws-nowrap px3 text-sm font-medium text="$vp-c-text-1" :class="[
      shareSuccess ? '!text-green-400' : '',
      shareLink ? 'hover:sm:text-$vp-c-brand' : '!cursor-wait',
    ]" :disabled="(!isMounted || !shareLink || shareSuccess)" @click="copyShareLink()">
      <Transition mode="out-in" enter-active-class="transition-all duration-250 ease-out"
        leave-active-class="transition-all duration-250 ease-out"
        enter-from-class="transform translate-y-30px opacity-0" leave-to-class="transform translate-y--30px opacity-0"
        enter-to-class="opacity-100" leave-from-class="opacity-100">
        <span v-if="shareSuccess" flex items-center space-x-1>
          <span class="i-octicon:checkbox-16" />
          <span>复制成功</span>
        </span>
        <span v-else flex items-center space-x-1>
          <span class="i-octicon:share-16" />
          <span>分享此页</span>
        </span>
      </Transition>
    </button>
    <div class="bg-$vp-c-divider-light" mx2 block h-24px w-1px md:hidden />
  </div>

</template>

<style>
span.i-octicon\:share-16,
span.i-octicon\:checkbox-16 {
  mask-size: contain;
}
</style>