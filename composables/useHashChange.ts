import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { reMaybe } from '~/utils'
import { useMap } from '~/composables'

export const useHashChange = createSharedComposable(() => {
  const hashChanged = reMaybe<string>()
  const { firstMapLoad } = useMap()

  const getHashFromUrl = (url: string) => {
    return url.split('#')[1] ?? null
  }

  window.addEventListener('hashchange', (e) => {
    hashChanged.value = getHashFromUrl(e.newURL)
  })

  watch(firstMapLoad, () => {
    setTimeout(() => {
      hashChanged.value = getHashFromUrl(location.href)
    })
  })

  return { hashChanged }
})
