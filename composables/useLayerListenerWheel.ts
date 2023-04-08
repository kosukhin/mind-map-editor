import { watch } from '@vue/runtime-core'
import { useLayer, useLayerEvents, useCanvasBoundaries } from '~/composables'
import { all, Vector2d } from '~/entities'
import { layerWheelHandler } from '~/application'

export const useLayerListenerWheel = () => {
  const { stage } = useLayer()
  const { wheel } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(wheel, () => {
    all([stage, wheel] as const)
      .map(layerWheelHandler)
      .map(([vStage, vector]) => {
        vStage.position(restrictBoundaries(vector as Vector2d))
      })
  })
}
