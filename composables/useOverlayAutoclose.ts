import { watch } from '@vue/runtime-core'
import { useOverlay } from '~/composables'

export const useOverlayAutoClose = (formName: string) => {
  const { tryToClose, close } = useOverlay()

  watch(tryToClose, () => {
    tryToClose.map((vClose) => {
      if (vClose === formName) {
        close()
      }
    })
  })
}
