import { watch } from '@vue/runtime-core'
import { useSharedLayer, useSharedLayerEvents, useCanvasBoundaries } from '~/composables'
import { all } from '~/utils'
import { layerWheelHandler } from '~/application'

export function useLayerListenerWheel() {
  const { stage } = useSharedLayer()
  const { wheel } = useSharedLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(wheel, () => {
    all([stage, wheel] as const)
      .map(layerWheelHandler)
      .map(([vStage, vector]) => {
        vStage.position(restrictBoundaries(vector))
      })
  })
}
