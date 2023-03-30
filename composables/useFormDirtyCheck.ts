import { watch } from '@vue/runtime-core'
import { useOverlay } from '~/composables/useOverlay'

export const useFormDirtyCheck = (isDirty: Ref<boolean>, formName: string) => {
  const { tryToClose, close } = useOverlay()

  watch(tryToClose, () => {
    tryToClose.map((vClose) => {
      if (vClose !== formName) {
        return
      }

      if (isDirty.value) {
        if (confirm('Если продожить данные будут потеряны! Продолжить?')) {
          close()
        }

        return
      }

      close()
    })
  })
}
