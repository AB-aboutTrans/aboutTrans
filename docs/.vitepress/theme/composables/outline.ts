import { useMediaQuery } from '@vueuse/core'
import type { DefaultTheme } from 'vitepress/theme'
import { onMounted, onUnmounted, onUpdated, type TemplateRef } from 'vue'

import { throttleAndDebounce } from 'vitepress/dist/client/theme-default/support/utils.js'

const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/

type HeadingOutlineItem = Omit<DefaultTheme.OutlineItem, 'element'> & {
  element: HTMLHeadingElement
}

const resolvedHeaders: { element: HTMLHeadingElement; link: string }[] = []

export function resolveTitle(theme: DefaultTheme.Config): string {
  return (
    (typeof theme.outline === 'object' &&
      !Array.isArray(theme.outline) &&
      theme.outline.label) ||
    'On this page'
  )
}

export function getHeaders(
  range: DefaultTheme.Config['outline']
): DefaultTheme.OutlineItem[] {
  const headers = [
    ...document.querySelectorAll(
      '.VPDoc h1, .VPDoc h2, .VPDoc h3, .VPDoc h4, .VPDoc h5, .VPDoc h6'
    )
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadingElement,
        title: serializeHeader(el),
        link: '#' + el.id,
        level
      }
    })

  return resolveHeaders(headers, range)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test((node as Element).className)) continue
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export function resolveHeaders(
  headers: HeadingOutlineItem[],
  range?: DefaultTheme.Config['outline']
): DefaultTheme.OutlineItem[] {
  if (range === false) {
    return []
  }

  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) || 2

  const [high, low]: [number, number] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange

  return buildTree(headers, high, low)
}

export function useActiveAnchor(
  container: TemplateRef<HTMLElement>,
  marker: TemplateRef<HTMLElement>
): void {
  const isAsideVisible = useMediaQuery('(min-width: 80rem)')

  const onScroll = throttleAndDebounce(setActiveLink, 100)

  let prevActiveLink: HTMLAnchorElement | null = null
  let ignoreScrollOnce: boolean = false

  onMounted(() => {
    requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
    container.value?.addEventListener('click', onClick)
  })

  onUpdated(() => {
    activateLink(location.hash)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  function onClick(e: MouseEvent) {
    if (!isAsideVisible.value) {
      return
    }

    const hash =
      e.target instanceof Element ? e.target.closest('a')?.hash : null

    if (hash) {
      ignoreScrollOnce = true
      activateLink(hash)
    }
  }

  function setActiveLink() {
    if (!isAsideVisible.value) {
      return
    }

    if (ignoreScrollOnce) {
      ignoreScrollOnce = false
      return
    }

    const scrollY = window.scrollY
    const innerHeight = window.innerHeight

    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element),
        scrollMarginTop:
          Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top)

    if (!headers.length) {
      activateLink(null)
      return
    }

    if (scrollY < 1) {
      activateLink(null)
      return
    }

    const maxScroll = document.documentElement.scrollHeight - innerHeight
    const bottomProgress = Math.min(
      1,
      Math.max(0, (scrollY - (maxScroll - innerHeight)) / innerHeight)
    )

    let activeLink: string | null = null
    for (const { link, top, scrollMarginTop } of headers) {
      const baseOffset = scrollMarginTop + 4
      const activeLine =
        scrollY + baseOffset + (innerHeight - baseOffset) * bottomProgress
      if (top > activeLine) {
        break
      }
      activeLink = link
    }
    activateLink(activeLink)
  }

  function activateLink(hash: string | null) {
    let activeLink: HTMLAnchorElement | null = null
    if (hash != null) {
      let decodedHash: string
      try {
        decodedHash = decodeURIComponent(hash)
      } catch {
        decodedHash = hash
      }
      activeLink =
        Array.from(container.value?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])
          .find((link) => link.getAttribute('href')?.endsWith(decodedHash)) ?? null
    }

    if (activeLink === prevActiveLink) return

    prevActiveLink?.classList.remove('active')
    prevActiveLink = activeLink

    if (activeLink) {
      activeLink.classList.add('active')
      if (marker.value) {
        marker.value.style.top =
          activeLink.offsetTop +
          ((activeLink.offsetParent as HTMLElement)?.offsetTop ?? 0) +
          (activeLink.offsetHeight - marker.value.offsetHeight) / 2 +
          'px'
        marker.value.style.opacity = '1'
      }
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    } else if (marker.value) {
      marker.value.style.top = ''
      marker.value.style.opacity = '0'
    }
  }
}

function getAbsoluteTop(element: HTMLElement): number {
  let offsetTop = 0
  while (element !== document.body) {
    if (element === null) {
      return NaN
    }
    offsetTop += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return offsetTop
}

function buildTree(
  data: HeadingOutlineItem[],
  min: number,
  max: number
): DefaultTheme.OutlineItem[] {
  resolvedHeaders.length = 0

  const result: DefaultTheme.OutlineItem[] = []
  const stack: (
    DefaultTheme.OutlineItem | { level: number; shouldIgnore: true }
  )[] = []

  data.forEach((item) => {
    const node = { ...item, children: [] }
    let parent = stack[stack.length - 1]

    while (parent && parent.level >= node.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }

    if (
      node.element.classList.contains('ignore-header') ||
      (parent && 'shouldIgnore' in parent)
    ) {
      stack.push({ level: node.level, shouldIgnore: true })
      return
    }

    if (node.level > max || node.level < min) return
    resolvedHeaders.push({ element: node.element, link: node.link })

    if (parent && !('shouldIgnore' in parent)) parent.children!.push(node)
    else result.push(node)

    stack.push(node)
  })

  return result
}
