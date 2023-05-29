import { all, map } from '~/utils'
import { renderVisibleMapObjects } from '~/application/renderVisibleMapObjects'
import { useSharedLayer, useSharedMap } from '~/composables'

export function useMapPartialRenderer() {
  const { layer, stage, layerObjects } = useSharedLayer()
  const { map: sharedMap } = useSharedMap()

  const triggerPartialRendering = () => {
    map(renderVisibleMapObjects(layerObjects))(all([stage, sharedMap, layer]))
  }

  return {
    triggerPartialRendering,
  }
}
