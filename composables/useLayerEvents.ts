import { watch } from '@vue/runtime-core'
import { KonvaEventObject } from 'konva/lib/Node'
import { createSharedComposable } from '@vueuse/core'
import { shallowReMaybe } from '~/entities'
import { useLayer } from '~/composables'
import { setValue } from '~/utils'

type KonvaEvent = KonvaEventObject<any>

export const useLayerEvents = createSharedComposable(() => {
  const { layer, stage } = useLayer()
  const dragend = shallowReMaybe<KonvaEventObject<DragEvent>>()
  const dragstart = shallowReMaybe<KonvaEventObject<DragEvent>>()
  const click = shallowReMaybe<KonvaEventObject<MouseEvent>>()
  const tap = shallowReMaybe<KonvaEventObject<PointerEvent>>()
  const mouseenter = shallowReMaybe<KonvaEventObject<MouseEvent>>()
  const mouseleave = shallowReMaybe<KonvaEventObject<MouseEvent>>()
  const wheel = shallowReMaybe<KonvaEventObject<WheelEvent>>()
  const transformend = shallowReMaybe<KonvaEvent>()
  const dragmove = shallowReMaybe<KonvaEventObject<DragEvent>>()

  watch(layer, () => {
    layer.map((vLayer) => {
      vLayer.on('dragend', setValue(dragend))
      vLayer.on('dragstart', setValue(dragstart))
      vLayer.on('click', setValue(click))
      vLayer.on('tap', setValue(tap))
      vLayer.on('mouseenter', setValue(mouseenter))
      vLayer.on('mouseleave', setValue(mouseleave))
      vLayer.on('transformend', setValue(transformend))
    })

    stage.map((vStage) => {
      vStage.on('wheel', setValue(wheel))
      vStage.on('dragmove', setValue(dragmove))
    })
  })

  return {
    dragend,
    dragstart,
    dragmove,
    click,
    tap,
    mouseenter,
    mouseleave,
    wheel,
    transformend,
  }
})
