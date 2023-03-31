import { createSharedComposable } from '@vueuse/core'
import { shallowReactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { KonvaLayerObject, MapLayer, MapStage, Maybe } from '~/entities'
import { useCanvas } from '~/composables'
import { createLayer, setValue } from '~/utils'

export const useLayer = createSharedComposable(() => {
  const { canvas } = useCanvas()
  const layer = shallowReactive(Maybe<MapLayer>())
  const stage = shallowReactive(Maybe<MapStage>())
  const layerObjects = new Map<string, KonvaLayerObject>()

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
