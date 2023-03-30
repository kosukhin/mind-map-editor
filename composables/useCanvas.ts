import { onMounted, watch } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { Maybe, CanvasSize } from '~/entities'
import { canvasCreateSize } from '~/application'

export const useCanvas = () => {
  const canvas = reactive(Maybe<HTMLElement>())
  const canvasSize = reactive(Maybe<CanvasSize>())

  onMounted(() => {
    const canvasElement = document.getElementById('canvas')

    if (canvasElement) {
      canvas.value = canvasElement
    }
  })

  watch(canvas, () => {
    canvas.map((vCanvas) => {
      canvasSize.value = canvasCreateSize(vCanvas)
    })
  })

  return {
    canvas,
    canvasSize,
  }
}
