import { computed, ref } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { OVERLAY_CLOSE } from '~/constants'
import { setValue, reMaybe } from '~/utils'

export const useSharedOverlay = createSharedComposable(() => {
  const overlayName = reMaybe<string>()
  const tryToClose = reMaybe<string>()
  const history = ref<string[]>([])
  const onOpenCbs = {}
  const isClosed = computed(() => {
    return overlayName.value === OVERLAY_CLOSE
  })
  const open = (newName: string) => {
    overlayName.value = newName
  }
  const onOpen = (openName: string, cb: Function) => {
    if (!onOpenCbs[openName]) {
      onOpenCbs[openName] = []
    }
    onOpenCbs[openName].push(cb)
  }
  const close = () => {
    setValue(overlayName, OVERLAY_CLOSE)
    setValue(tryToClose, OVERLAY_CLOSE)
  }
  const isOpened = (maybeName: string) => {
    return overlayName.value === maybeName
  }
  watch(overlayName, () => {
    overlayName.map((vOverlay) => {
      if (vOverlay !== OVERLAY_CLOSE) {
        if (onOpenCbs[vOverlay]) {
          onOpenCbs[vOverlay].forEach((cb) => cb())
        }
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
    isClosed,
    onOpen,
    open,
    close,
    isOpened,
  }
})
