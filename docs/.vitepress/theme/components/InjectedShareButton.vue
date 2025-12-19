<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { shareState } from './shareState'

const props = defineProps<{
  onClick: () => void
}>()

const isMounted = ref(false)
const isClicked = ref(false)

onMounted(() => {
  isMounted.value = true
})

watch(() => shareState.isOpen, (isOpen) => {
  if (isOpen) {
    isClicked.value = false
  }
})

function handleClick() {
  props.onClick()
  isClicked.value = true
  setTimeout(() => {
    isClicked.value = false
  }, 2000)
}
</script>

<template>
  <div class="unocss-scope" style="display: inline-flex; align-items: center; justify-content: center; vertical-align: text-bottom; margin-left: -8px;">
    <button class="share-button" :class="[
      isClicked ? '!text-green-400' : '',
      isMounted ? '' : '!cursor-wait',
    ]" :disabled="!isMounted" @click.stop.prevent="handleClick()" title="保存图片">
      <span flex items-center justify-center>
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="www.w3.org/2000/svg">
          <path d="M10.5 2.8125H14.625C14.9357 2.8125 15.1875 3.06434 15.1875 3.375V14.625C15.1875 14.9357 14.9357 15.1875 14.625 15.1875H3.375C3.06434 15.1875 2.8125 14.9357 2.8125 14.625V8.5M3.98602 15.1875L11.6958 7.47703C11.748 7.42473 11.8101 7.38324 11.8783 7.35494C11.9466 7.32663 12.0198 7.31206 12.0938 7.31206C12.1677 7.31206 12.2409 7.32663 12.3092 7.35494C12.3774 7.38324 12.4395 7.42473 12.4917 7.47703L15.1875 10.1735M6 2L8 4L6 6M2 2L4 4L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.share-button {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  border-radius: 4px;
  line-height: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.share-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}
</style>
