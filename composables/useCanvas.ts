import { onMounted, watch } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { Maybe, CanvasSize } from '~/entities'
import { canvasCreateSize } from '~/application'
import { setValue } from '~/utils'
import { useDom } from '~/composables'

export const useCanvas = () => {
  const canvas = reactive(Maybe<HTMLElement>())
  const canvasSize = reactive(Maybe<CanvasSize>())
  const { findById } = useDom()

  onMounted(() => {
    const canvasElement = findById('canvas')

    if (canvasElement) {
      setValue(canvas, canvasElement)
    }
  })

  watch(canvas, () => {
    canvas.map((vCanvas) => {
      setValue(canvasSize, canvasCreateSize(vCanvas))
    })
  })

  return {
    canvas,
    canvasSize,
  }
}
