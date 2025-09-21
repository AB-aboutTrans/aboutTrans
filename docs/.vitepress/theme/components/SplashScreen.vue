<template>
  <div>
    <Transition name="fade">
      <div v-if="show" class="splash-screen">
        <img src="/icon.svg" class="splash-logo">
      </div>
    </Transition>
    <div v-if="show" class="content-mask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const show = ref<boolean>(false)
let timer: number | undefined

const startTimer = () => {
  if (isHome.value) {
    show.value = true
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      show.value = false
    }, 2000)
  }
}

onMounted(async () => {
  await nextTick()
  startTimer()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style>
:root .VPContent,
:root .VPNav {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  user-select: auto;
}

:root:has(.content-mask) .VPContent,
:root:has(.content-mask) .VPNav,
:root:has(.content-mask) .VPNavBar,
:root:has(.content-mask) .VPNavScreen,
:root:has(.content-mask) .VPSidebar {
  visibility: visible;
  opacity: 0;
  transition: none;
  pointer-events: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
}
</style>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  isolation: isolate;
  z-index: 9999;
  pointer-events: none;
  user-select: none;
  opacity: 1;
}

.content-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  pointer-events: auto;
  cursor: default;
}



.fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.splash-logo {
  width: 200px;
  height: auto;
  transform: scale(1);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active .splash-logo {
  transform: scale(1.05);
}
</style>