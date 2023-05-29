import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import { reMaybe } from '~/utils'
import { useSharedMap } from '~/composables'

export const useSharedHashChange = createSharedComposable(() => {
  const hashChanged = reMaybe<string>()
  const { firstMapLoad } = useSharedMap()
  const getHashFromUrl = (url: string) => {
    return url.split('#')[1] ?? null
  }
  const clearHash = debounce(() => {
    location.hash = ''
  }, 500)
  window.addEventListener('hashchange', (e) => {
    hashChanged.value = getHashFromUrl(e.newURL)
    clearHash()
  })
  watch(firstMapLoad, () => {
    setTimeout(() => {
      hashChanged.value = getHashFromUrl(location.href)
      clearHash()
    })
  })

  return { hashChanged }
})
