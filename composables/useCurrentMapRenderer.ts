import { watchOnce } from '@vueuse/core'
import { computed } from '@vue/reactivity'
import { useCurrentMap, useLayer } from '~/composables'
import { allSet } from '~/entities'
import { renderMapObjects } from '~/application'
import { unwrapTuple } from '~/utils'

export const useCurrentMapRenderer = () => {
  const { layer, layerObjects } = useLayer()
  const { map } = useCurrentMap()
  const allInit = computed(() => allSet([layer, map] as const).map(() => true))

  watchOnce(allInit, () => {
    allSet([layer, map] as const).map(
      unwrapTuple(renderMapObjects(layerObjects))
    )
  })

  return {
    map,
    allInit,
  }
}
