import { onMounted, watch } from '@vue/runtime-core'
import { reactive } from '@vue/reactivity'
import { Maybe } from '~/entities'

export const useCanvas = () => {
  const canvas = reactive(Maybe<HTMLElement>())
  const canvasSize = reactive(Maybe<{ w: number; h: number }>())

  watch(canvas, () => {
    canvas.map((vCanvas) => {
      canvasSize.value = {
        w: vCanvas.clientWidth,
        h: vCanvas.clientHeight,
      }
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
