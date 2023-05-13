import { createSharedComposable } from '@vueuse/core'
import { ref } from '@vue/reactivity'

export const useKeybindings = createSharedComposable(() => {
  const shiftSFired = ref(0)
  const shiftFFired = ref(0)
  const shiftMFired = ref(0)
  document.addEventListener(
    'keydown',
    (e) => {
      if (
        e.ctrlKey &&
        (e.code === 'KeyS' || e.code === 'KeyF' || e.code === 'KeyM')
      ) {
        e.preventDefault()
        if (e.code === 'KeyS') {
          shiftSFired.value++
        }
        if (e.code === 'KeyF') {
          shiftFFired.value++
        }
        if (e.code === 'KeyM') {
          shiftMFired.value++
        }
      }
    },
    true
  )
  return {
    shiftSFired,
    shiftFFired,
    shiftMFired,
  }
})
