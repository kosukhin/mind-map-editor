import { watch } from '@vue/runtime-core'
import { useLayer, useLayerEvents, useCanvas } from '~/composables'
import { allSet } from '~/entities'
import { layerWheelHandler } from '~/application'
import { unwrapTuple } from '~/utils'

export const useLayerListenerWheel = () => {
  const { stage } = useLayer()
  const { canvasSize } = useCanvas()
  const { wheel } = useLayerEvents()

  watch(wheel, () => {
    allSet([canvasSize, stage, wheel] as const).map(
      unwrapTuple(layerWheelHandler)
    )
  })
}
