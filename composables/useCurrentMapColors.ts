import { computed } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { useCurrentMap } from '~/composables'
import { Dictionary } from '~/entities'
import { canvasCreateColorsHash } from '~/application'

export const useCurrentMapColors = createSharedComposable(() => {
  const { map } = useCurrentMap()

  const colorsHash = computed<Dictionary<string>>(
    () => map.map(canvasCreateColorsHash) as Dictionary<string>
  )

  return {
    colorsHash,
  }
})
