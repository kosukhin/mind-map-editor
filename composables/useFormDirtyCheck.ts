import { watch } from '@vue/runtime-core'
import { Ref } from '@vue/reactivity'
import { useOverlay } from '~/composables/useOverlay'
import { OVERLAY_CLOSE_ALERT } from '~/constants'
import { formDirtyCheck } from '~/application'

export const useFormDirtyCheck = (isDirty: Ref<boolean>, formName: string) => {
  const { tryToClose, close } = useOverlay()

  watch(tryToClose, () => {
    tryToClose
      .map(formDirtyCheck(isDirty.value, formName))
      .map((needConfirm) => {
        if (!needConfirm || (needConfirm && confirm(OVERLAY_CLOSE_ALERT))) {
          close()
        }
      })
  })
}
