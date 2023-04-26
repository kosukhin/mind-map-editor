import { createSharedComposable } from '@vueuse/core'
import { reMaybe } from '~/utils'

export const useHashChange = createSharedComposable(() => {
  const hashChanged = reMaybe<string>()

  window.addEventListener('hashchange', (e) => {
    hashChanged.value = e.newURL.split('#')[1] ?? ''
  })

  return { hashChanged }
})
