import { reactive } from 'vue'

export interface ShareTag {
  text: string
  type: string
}

interface ShareState {
  isOpen: boolean
  title: string
  content: string
  url: string
  note?: string
  tags?: ShareTag[]
}

export const shareState = reactive<ShareState>({
  isOpen: false,
  title: '',
  content: '',
  url: '',
  note: '',
  tags: []
})

export function openShare(title: string, content: string, url: string, note: string = '', tags: ShareTag[] = []) {
  shareState.title = title
  shareState.content = content
  shareState.url = url
  shareState.note = note
  shareState.tags = tags
  shareState.isOpen = true
}

export function closeShare() {
  shareState.isOpen = false
}
