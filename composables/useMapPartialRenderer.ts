import { all } from '~/utils'
import { renderVisibleMapObjects } from '~/application/renderVisibleMapObjects'
import { useLayer, useMap } from '~/composables'

export const useMapPartialRenderer = () => {
  const { layer, stage, layerObjects } = useLayer()
  const { map } = useMap()

  const triggerPartialRendering = () => {
    all([stage, map, layer]).map(renderVisibleMapObjects(layerObjects))
  }

  return {
    triggerPartialRendering,
  }
}
