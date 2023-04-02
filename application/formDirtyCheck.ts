import curry from 'lodash/fp/curry'

export const formDirtyCheck = curry(
  (isDirty: boolean, formName: string, overlayName: string) => {
    if (overlayName !== formName) {
      return null
    }

    return isDirty
  }
)
