import { onMounted, watch } from '@vue/runtime-core'
import flow from 'lodash/flow'
import { Size } from '~/entities'
import { canvasCreateSize } from '~/application'
import {
  setValue,
  reMaybe,
  map,
  ifElse,
  isTruthy,
  findById,
  apply,
} from '~/utils'
import { CANVAS_DOM_ID } from '~/constants'

export function useCanvas() {
  const canvas = reMaybe<HTMLElement>()
  const canvasSize = reMaybe<Size>()

  onMounted(() => {
    apply(findById(CANVAS_DOM_ID), ifElse(isTruthy, setValue(canvas)))
  })

  watch(canvas, () => {
    apply(canvas, map(flow(canvasCreateSize, setValue(canvasSize))))
  })

  return {
    canvas,
    canvasSize,
  }
}
