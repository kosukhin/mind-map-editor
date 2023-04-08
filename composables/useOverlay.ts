import { ref } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { OVERLAY_CLOSE } from '~/constants'
import { setValue, reMaybe } from '~/utils'

export const useOverlay = createSharedComposable(() => {
  const overlayName = reMaybe<string>()
  const tryToClose = reMaybe<string>()
  const history = ref<string[]>([])

  const close = () => {
    setValue(overlayName, OVERLAY_CLOSE)
    setValue(tryToClose, OVERLAY_CLOSE)
  }

  watch(overlayName, () => {
    overlayName.map((vOverlay) => {
      if (vOverlay !== OVERLAY_CLOSE) {
        history.value.push(vOverlay)
      } else {
        setValue(history, [])
      }
    })
  })

  return {
    overlayName,
    tryToClose,
    history,
    close,
  }
})
