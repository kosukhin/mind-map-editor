import { createSharedComposable, useMagicKeys } from '@vueuse/core'

export const useKeybindings = createSharedComposable(() => {
  const {
    ctrl_s: ctrlSFired,
    ctrl_f: ctrlFFired,
    ctrl_m: ctrlMFired,
  } = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (e.ctrlKey && e.key === 's' && e.type === 'keydown') e.preventDefault()
      if (e.ctrlKey && e.key === 'f' && e.type === 'keydown') e.preventDefault()
      if (e.ctrlKey && e.key === 'm' && e.type === 'keydown') e.preventDefault()
    },
  })

  return {
    ctrlSFired,
    ctrlFFired,
    ctrlMFired,
  }
})
