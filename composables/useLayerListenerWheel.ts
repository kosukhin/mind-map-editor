import { watch } from '@vue/runtime-core'
import { useLayer, useLayerEvents, useCanvasBoundaries } from '~/composables'
import { allSet, Vector2d } from '~/entities'
import { layerWheelHandler } from '~/application'
import { unwrapTuple } from '~/utils'

export const useLayerListenerWheel = () => {
  const { stage } = useLayer()
  const { wheel } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(wheel, () => {
    allSet([stage, wheel] as const)
      .chain(unwrapTuple(layerWheelHandler))
      .map(([vStage, vector]) => {
        vStage.position(restrictBoundaries(vector as Vector2d))
      })
  })
}
