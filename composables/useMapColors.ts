import { computed } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { useMap } from '~/composables'
import { Dictionary } from '~/entities'
import { canvasCreateColorsHash } from '~/application'

export const useMapColors = createSharedComposable(() => {
  const { map } = useMap()

  const colorsHash = computed<Dictionary<string>>(
    () => map.map(canvasCreateColorsHash).value as Dictionary<string>
  )

  return {
    colorsHash,
  }
})
