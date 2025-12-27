<script setup lang="ts">
import { onMounted, onUnmounted, watch, createApp, type App } from 'vue'
import { useRoute, useData } from 'vitepress'
import { openShare, type ShareTag } from './shareState'
import InjectedShareButton from './InjectedShareButton.vue'

const route = useRoute()
const { frontmatter } = useData()
let observer: MutationObserver | null = null
let bodyObserver: MutationObserver | null = null
// Track mounted app instances to properly unmount them later
const mountedApps: App[] = []

const getDocContainer = () => {
  return document.querySelector('.vp-doc') || 
         document.querySelector('.VPDoc') || 
         document.querySelector('main')
}

const injectButtonToH2 = (h2: HTMLHeadingElement) => {
  if (h2.classList.contains('share-btn-processed')) return
  h2.classList.add('share-btn-processed')

  const container = document.createElement('span')
  container.className = 'share-btn-container'

  const btn = document.createElement('span')
  btn.className = 'share-btn-injected'
  
  // Define the share action
  const handleShare = () => {
    // Clone and remove children to get text only
    const clone = h2.cloneNode(true) as HTMLElement
    
    // Extract badges
    const badges: ShareTag[] = Array.from(clone.querySelectorAll('.VPBadge')).map(el => {
      const text = el.textContent?.trim() || ''
      let type = 'info'
      if (el.classList.contains('tip')) type = 'tip'
      else if (el.classList.contains('warning')) type = 'warning'
      else if (el.classList.contains('danger')) type = 'danger'
      return { text, type }
    }).filter(b => b.text)
    
    // Remove injected buttons, anchors, and badges from title
    const childBtns = clone.querySelectorAll('.share-btn-injected, .header-anchor, .VPBadge')
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
    
    // Combine frontmatter tags and inline badges
    const frontmatterTags = (frontmatter.value.tags || []).map((t: string) => ({ text: t, type: 'info' }))
    const tags = [...frontmatterTags, ...badges]
    openShare(title, content, url, '', tags)
  }

  // Mount the Share Button Component
  const app = createApp(InjectedShareButton, { onClick: handleShare })
  app.mount(btn)
  mountedApps.push(app)
  
  container.appendChild(btn)
  
  // Insert container at the end of h2
  h2.appendChild(container)
}

const scanAndInject = () => {
  if (!route.path.startsWith('/docs/')) return

  const doc = getDocContainer()
  if (!doc) return

  const h2s = doc.querySelectorAll('h2')
  h2s.forEach(h2 => injectButtonToH2(h2))
}

const observeDocContainer = (doc: Element) => {
  // Cleanup old doc observer
  if (observer) observer.disconnect()
  
  // Initial scan
  scanAndInject()

  // Watch for changes inside the doc container
  observer = new MutationObserver(() => {
    scanAndInject()
  })
  
  observer.observe(doc, { childList: true, subtree: true })
}

const initObserver = () => {
  if (typeof window === 'undefined') return
  
  // Cleanup old observers
  if (observer) observer.disconnect()
  if (bodyObserver) bodyObserver.disconnect()

  const doc = getDocContainer()
  
  if (doc) {
    // Doc container exists, observe it directly
    observeDocContainer(doc)
  } else {
    // Doc container not ready, watch body for its appearance
    bodyObserver = new MutationObserver(() => {
      const doc = getDocContainer()
      if (doc) {
        bodyObserver?.disconnect()
        bodyObserver = null
        observeDocContainer(doc)
      }
    })
    
    bodyObserver.observe(document.body, { childList: true, subtree: true })
  }
}

onMounted(() => {
  initObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (bodyObserver) bodyObserver.disconnect()
  // Clean up all mounted app instances to prevent memory leaks
  mountedApps.forEach(app => app.unmount())
  mountedApps.length = 0
})

watch(() => route.path, () => {
  // Re-init on route change, MutationObserver will handle async content
  initObserver()
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
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.share-btn-injected:hover {
  opacity: 1;
}

/* Make h2 a flex container for natural alignment */
.vp-doc h2.share-btn-processed {
  display: flex;
  align-items: center;
}
</style>
