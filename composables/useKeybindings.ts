import { createSharedComposable, useMagicKeys } from '@vueuse/core'

export const useKeybindings = createSharedComposable(() => {
  const {
    shift_s: shiftSFired,
    shift_f: shiftFFired,
    shift_m: shiftMFired,
  } = useMagicKeys()

  return {
    shiftSFired,
    shiftFFired,
    shiftMFired,
  }
})
