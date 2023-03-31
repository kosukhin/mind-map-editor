import { reactive, ref } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { Maybe } from '~/entities'
import { OVERLAY_CLOSE } from '~/constants'
import { setValue } from '~/utils'

export const useOverlay = createSharedComposable(() => {
  const overlayName = reactive(Maybe<string>())
  const tryToClose = reactive(Maybe<string>())
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
        history.value = []
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
