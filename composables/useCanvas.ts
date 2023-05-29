import { onMounted, watch } from '@vue/runtime-core'
import flow from 'lodash/flow'
import { Size } from '~/entities'
import { canvasCreateSize } from '~/application'
import { setValue, reMaybe, map, ifElse, isTruthy } from '~/utils'
import { useDom } from '~/composables'
import { CANVAS_DOM_ID } from '~/constants'

export function useCanvas() {
  const canvas = reMaybe<HTMLElement>()
  const canvasSize = reMaybe<Size>()
  const { findById } = useDom()

  onMounted(() => {
    const canvasElement = findById(CANVAS_DOM_ID)
    ifElse(isTruthy, setValue(canvas))(canvasElement)
  })

  watch(canvas, () => {
    map(flow(canvasCreateSize, setValue(canvasSize)))(canvas)
  })

  return {
    canvas,
    canvasSize,
  }
}
