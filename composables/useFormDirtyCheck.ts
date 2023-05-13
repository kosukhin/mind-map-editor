import { watch } from '@vue/runtime-core'
import { Ref } from '@vue/reactivity'
import { useOverlay } from '~/composables'
import { OVERLAY_CLOSE, OVERLAY_CLOSE_ALERT } from '~/constants'
import { formDirtyCheck } from '~/application'
import { setValue } from '~/utils'

export const useFormDirtyCheck = (isDirty: Ref<boolean>, formName: string) => {
  const { tryToClose, close } = useOverlay()
  watch(tryToClose, () => {
    tryToClose
      .map(formDirtyCheck(isDirty.value, formName))
      .map((needConfirm) => {
        setValue(tryToClose, OVERLAY_CLOSE)
        if (!needConfirm || confirm(OVERLAY_CLOSE_ALERT)) {
          close()
        }
      })
  })
}
