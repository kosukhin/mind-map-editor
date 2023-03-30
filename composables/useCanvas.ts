import { onMounted, watch } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { Maybe, CanvasSize } from '~/entities'
import { canvasCreateSize } from '~/application'

export const useCanvas = () => {
  const canvas = reactive(Maybe<HTMLElement>())
  const canvasSize = reactive(Maybe<CanvasSize>())

  watch(canvas, () => {
    canvas.map((vCanvas) => {
      canvasSize.value = canvasCreateSize(vCanvas)
    })
  })

  onMounted(() => {
    const canvasElement = document.getElementById('canvas')

    if (canvasElement) {
      canvas.value = canvasElement
    }
  })

  return {
    canvas,
    canvasSize,
  }
}
