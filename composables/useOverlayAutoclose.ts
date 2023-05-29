import { watch } from '@vue/runtime-core'
import { useSharedOverlay } from '~/composables'

export function useOverlayAutoClose(formName: string) {
  const { tryToClose, close } = useSharedOverlay()
  watch(tryToClose, () => {
    tryToClose.map((vClose) => {
      if (vClose === formName) {
        close()
      }
    })
  })
}
