import { watchOnce } from '@vueuse/core'
import { computed } from '@vue/reactivity'
import { useCurrentMap, useLayer } from '~/composables'
import { all } from '~/entities'
import { renderMapObjects } from '~/application'

export const useCurrentMapRenderer = () => {
  const { layer, layerObjects } = useLayer()
  const { map } = useCurrentMap()
  const allInit = computed(
    () => all([layer, map] as const).map(() => true).value
  )

  watchOnce(allInit, () => {
    all([layer, map] as const)
      .map(renderMapObjects)
      .map((dispatch) => {
        if (typeof dispatch !== 'function') return
        dispatch((vObjects) => {
          vObjects.forEach(([objectId, objects]) => {
            layerObjects.set(objectId, objects)
          })
        })
      })
  })

  return {
    map,
    allInit,
  }
}
