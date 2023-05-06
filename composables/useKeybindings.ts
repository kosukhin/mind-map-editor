import { useMagicKeys } from '@vueuse/core'

export const useKeybindings = () => {
  const {
    ctrl_s: ctrlSFired,
    ctrl_f: ctrlFFired,
    ctrl_m: ctrlMFired,
  } = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (e.ctrlKey && e.key === 's') e.preventDefault()
      if (e.ctrlKey && e.key === 'f') e.preventDefault()
      if (e.ctrlKey && e.key === 'm') e.preventDefault()
    },
  })

  return {
    ctrlSFired,
    ctrlFFired,
    ctrlMFired,
  }
}
