import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { MapLayerObjects, Layer, Stage } from '~/entities'
import { useCanvas } from '~/composables'
import { setValue, shallowReMaybe } from '~/utils'
import { createLayer } from '~/utils/konva'

export const useSharedLayer = createSharedComposable(() => {
  const { canvas } = useCanvas()
  const layer = shallowReMaybe<Layer>()
  const stage = shallowReMaybe<Stage>()
  const layerObjects: MapLayerObjects = new Map()
  watch(canvas, () => {
    canvas.map((vCanvas) => {
      const [newLayer, newStage] = createLayer(vCanvas)
      setValue(layer, newLayer)
      setValue(stage, newStage)
    })
  })

  return {
    layer,
    stage,
    layerObjects,
  }
})
