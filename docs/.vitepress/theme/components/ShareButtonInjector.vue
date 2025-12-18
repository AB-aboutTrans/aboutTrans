<script setup lang="ts">
import { onMounted, onUnmounted, watch, createApp } from 'vue'
import { useRoute } from 'vitepress'
import { openShare } from './shareState'
import InjectedShareButton from './InjectedShareButton.vue'

const route = useRoute()
let observer: MutationObserver | null = null

const injectButtonToH2 = (h2: HTMLHeadingElement) => {
  if (h2.classList.contains('share-btn-processed')) return
  h2.classList.add('share-btn-processed')

  const container = document.createElement('div')
  container.className = 'share-btn-container'
  // Style is now handled in CSS or here
  container.style.display = 'flex'
  container.style.justifyContent = 'flex-start'
  container.style.marginTop = '10px'

  const btn = document.createElement('span')
  btn.className = 'share-btn-injected'
  
  // Define the share action
  const handleShare = () => {
    // Clone and remove children to get text only
    const clone = h2.cloneNode(true) as HTMLElement
    const childBtns = clone.querySelectorAll('.share-btn-injected, .header-anchor')
    childBtns.forEach(el => el.remove())
    const title = clone.innerText.trim()
    
    // Get content: try to find the next paragraph(s)
    let content = ''
    let next = h2.nextElementSibling
    let count = 0
    // Grab up to 2 blocks or until next header
    while (next && !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(next.tagName) && count < 2) {
      // Capture content from valid content elements
      if (!['SCRIPT', 'STYLE', 'LINK', 'TEMPLATE'].includes(next.tagName) && 
          !next.classList.contains('share-btn-container') && 
          !next.classList.contains('custom-block')) {
        let innerHTML = (next as HTMLElement).innerHTML
        
        // Remove footnote references
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = innerHTML
        tempDiv.querySelectorAll('.footnote-ref').forEach(el => el.remove())
        innerHTML = tempDiv.innerHTML

        content += (content ? '<br><br>' : '') + innerHTML
        count++
      }
      next = next.nextElementSibling
    }
    
    const url = window.location.origin + window.location.pathname + '#' + h2.id
    
    openShare(title, content, url)
  }

  // Mount the Share Button Component
  const app = createApp(InjectedShareButton, { onClick: handleShare })
  app.mount(btn)
  
  container.appendChild(btn)
  
  // Insert container after the h2
  if (h2.nextSibling) {
    h2.parentNode?.insertBefore(container, h2.nextSibling)
  } else {
    h2.parentNode?.appendChild(container)
  }
}

const scanAndInject = () => {
  if (!route.path.startsWith('/docs/')) return

  // Try multiple selectors for better compatibility
  const doc = document.querySelector('.vp-doc') || 
              document.querySelector('.VPDoc') || 
              document.querySelector('main')
              
  if (!doc) {
    console.warn('[ShareInjector] Doc container not found')
    return
  }

  const h2s = doc.querySelectorAll('h2')
  if (h2s.length > 0) {
    console.log(`[ShareInjector] Found ${h2s.length} h2 elements`)
    h2s.forEach(h2 => injectButtonToH2(h2))
  }
}

const initObserver = () => {
  if (typeof window === 'undefined') return
  
  // Cleanup old observer
  if (observer) observer.disconnect()

  const doc = document.querySelector('.vp-doc') || 
              document.querySelector('.VPDoc') || 
              document.querySelector('main')
  
  // If doc not ready, try again shortly
  if (!doc) {
    setTimeout(initObserver, 500)
    return
  }
  
  // Initial scan
  scanAndInject()

  // Watch for changes
  observer = new MutationObserver(() => {
    scanAndInject()
  })
  
  observer.observe(doc, { childList: true, subtree: true })
}

onMounted(() => {
  console.log('[ShareInjector] Mounted')
  // Wait a bit for layout
  setTimeout(initObserver, 500)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

watch(() => route.path, () => {
  // Re-init on route change
  setTimeout(initObserver, 500)
})
</script>

<template>
  <div style="display: none;"></div>
</template>

<style>
.share-btn-injected {
  cursor: pointer;
  margin-left: 8px;
  opacity: 1;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  color: var(--vp-c-brand-1);
}

.share-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 20px;
}

.share-btn-injected:hover {
  opacity: 1;
}
</style>
