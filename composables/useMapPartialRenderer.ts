import { all } from '~/utils'
import { renderVisibleMapObjects } from '~/application/renderVisibleMapObjects'
import { useSharedLayer, useSharedMap } from '~/composables'

export function useMapPartialRenderer() {
  const { layer, stage, layerObjects } = useSharedLayer()
  const { map } = useSharedMap()
  const triggerPartialRendering = () => {
    all([stage, map, layer]).map(renderVisibleMapObjects(layerObjects))
  }

  return {
    triggerPartialRendering,
  }
}
