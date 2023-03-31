import curry from 'lodash/fp/curry'
import { Maybe } from '~/entities'

export const formDirtyCheck = curry(
  (isDirty: boolean, formName: string, overlayName: string) => {
    const needConfirm = Maybe<boolean>()

    if (overlayName !== formName) {
      return needConfirm
    }

    needConfirm.value = isDirty

    return needConfirm
  }
)
