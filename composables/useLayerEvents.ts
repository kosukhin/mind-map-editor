import { watch } from '@vue/runtime-core'
import { shallowReactive } from '@vue/reactivity'
import { KonvaEventObject } from 'konva/lib/Node'
import { createSharedComposable } from '@vueuse/core'
import { Maybe, Nullable } from '~/entities'
import { useLayer } from '~/composables'
import { setValue } from '~/utils'

type KonvaEvent = Nullable<KonvaEventObject<any>>

export const useLayerEvents = createSharedComposable(() => {
  const { layer, stage } = useLayer()
  const dragend = shallowReactive(Maybe<KonvaEvent>())
  const dragstart = shallowReactive(Maybe<KonvaEvent>())
  const click = shallowReactive(Maybe<KonvaEvent>())
  const tap = shallowReactive(Maybe<KonvaEvent>())
  const mouseenter = shallowReactive(Maybe<KonvaEvent>())
  const mouseleave = shallowReactive(Maybe<KonvaEvent>())
  const wheel = shallowReactive(Maybe<KonvaEventObject<WheelEvent>>())
  const transformend = shallowReactive(Maybe<KonvaEvent>())

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
    })
  })

  return {
    dragend,
    dragstart,
    click,
    tap,
    mouseenter,
    mouseleave,
    wheel,
    transformend,
  }
})
