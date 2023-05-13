import { onMounted, watch } from '@vue/runtime-core'
import { Size } from '~/entities'
import { canvasCreateSize } from '~/application'
import { setValue, reMaybe } from '~/utils'
import { useDom } from '~/composables'
import { CANVAS_DOM_ID } from '~/constants'

export const useCanvas = () => {
  const canvas = reMaybe<HTMLElement>()
  const canvasSize = reMaybe<Size>()
  const { findById } = useDom()
  onMounted(() => {
    const canvasElement = findById(CANVAS_DOM_ID)
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
