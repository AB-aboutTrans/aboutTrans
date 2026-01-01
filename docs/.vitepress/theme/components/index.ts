import Share from './share.vue'
import SharePopup from './SharePopup.vue'
import ShareButtonInjector from './ShareButtonInjector.vue'
export * from './shareState'

export const components = {
  Share,
  SharePopup,
  ShareButtonInjector
}

export function registerComponents(app: any) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}

export {
  Share,
  SharePopup,
  ShareButtonInjector
}
