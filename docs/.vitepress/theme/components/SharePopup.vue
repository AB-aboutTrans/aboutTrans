<script setup lang="ts">
import { ref, reactive, watch, nextTick, onUnmounted } from 'vue'
import { shareState, closeShare } from './shareState'

const cardRef = ref<HTMLElement | null>(null)
const state = reactive({
  qrCodeUrl: '',
  isGenerating: false
})

watch(() => shareState.isOpen, async (val) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }

  if (val && shareState.url) {
    try {
      const QRCode = await import('qrcode')
      // Handle both ESM default export and CJS export
      const toDataURL = QRCode.toDataURL || (QRCode.default && QRCode.default.toDataURL)
      
      if (toDataURL) {
        state.qrCodeUrl = await toDataURL(shareState.url, {
          margin: 2,
          width: 200,
          color: {
            dark: '#3c3c43',
            light: '#ffffff'
          }
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
})

const handleDownload = async () => {
  if (!cardRef.value || state.isGenerating) return
  
  state.isGenerating = true
  try {
    // Wait for fonts/images if needed
    await nextTick()
    
    // Dynamic import to avoid SSR issues
    const { snapdom } = await import('@zumer/snapdom')
    
    // Using snapdom to download
    await snapdom.download(cardRef.value, {
      filename: `${shareState.title}｜aboutTrans`,
      scale: 2, // High res
    })
  } catch (e) {
    console.error('Failed to generate image:', e)
  } finally {
    state.isGenerating = false
  }
}

const formatDate = () => {
  const date = new Date()
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="fade">
    <div v-if="shareState.isOpen" class="share-overlay" @click.self="closeShare">
      <div class="share-container">
        <!-- The Card to Capture -->
        <div ref="cardRef" class="share-card">
          <!-- Main Content -->
          <div class="card-content">
            <h2 class="card-title">
              {{ shareState.title }}
              <div class="card-tags" v-if="shareState.tags && shareState.tags.length">
                <span v-for="tag in shareState.tags" :key="tag.text" class="tag" :class="tag.type">{{ tag.text }}</span>
              </div>
            </h2>
            <div class="card-url">{{ shareState.url }}</div>
            
            <div class="card-body vp-doc" v-html="shareState.content"></div>
            
            <div class="card-footer">
              <div class="footer-info">
                <div class="site-logo">
                  aboutTrans
                </div>
                <div class="date">{{ formatDate() }}</div>
              </div>
              <div class="qr-code" v-if="state.qrCodeUrl">
                <img :src="state.qrCodeUrl" alt="QR Code" />
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="action-btn cancel" @click="closeShare">
            关闭
          </button>
          
          <button class="action-btn download" @click="handleDownload" :disabled="state.isGenerating">
            保存
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.share-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 100%;
}

.share-card {
  background: var(--vp-c-bg);
  width: 375px;
  max-width: 100%;
  min-height: 500px;
  border-radius: 20px;
  display: flex;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

.share-card :deep(mark) {
  animation-delay: -1ms;
  animation-duration: 1ms;
  animation-iteration-count: 1;
}

.card-content {
  flex: 1;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 10px 0;
  color: var(--vp-c-text-1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.card-tags {
  display: inline-flex;
  gap: 6px;
  vertical-align: middle;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
  line-height: 18px;
  display: inline-block;
  transform: translateY(-1px);
}

.tag.tip {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.tag.warning {
  color: var(--vp-c-yellow-1);
  background-color: var(--vp-c-yellow-soft);
}

.tag.danger {
  color: var(--vp-c-red-1);
  background-color: var(--vp-c-red-soft);
}

.tag.info {
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
}

.card-url {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 30px;
  word-break: break-all;
}

.card-body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  flex: 1;
  margin-bottom: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.site-logo {
  display: flex;
  align-items: center;
  color: var(--vp-c-brand-0);
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -0.5px;
}

.date {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.qr-code {
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
}

.qr-code img {
  width: 72px;
  height: 72px;
  display: block;
}

.actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  padding: 10px 24px;
  border-radius: 30px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.download {
  background: var(--vp-c-brand-1);
  color: white;
}

.action-btn.cancel {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
