import { computed } from '@vue/reactivity'
import { useCurrentMap } from '~/composables'
import { Dictionary } from '~/entities'
import { canvasCreateColorsHash } from '~/application'

export const useCurrentMapColors = () => {
  const { map } = useCurrentMap()

  const colorsHash = computed<Dictionary<string>>(() => {
    return map.map(canvasCreateColorsHash) as Dictionary<string>
  })

  return {
    colorsHash,
  }
}
