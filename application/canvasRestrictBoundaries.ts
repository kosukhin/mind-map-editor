import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import curry from 'lodash/curry'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import { and, gt, ifElse, mathMultiply, mathSub, pass } from '~/utils/fp'
import { aliases } from '~/libraries/stepper/v2'

const { $, $s, $r, $v, $prev } = aliases

const args = ['_pos', '_canvasSize']
export const canvasRestrictBoundaries = curry(
  flow(
    $s(args),
    calculateMaximums('w', CANVAS_WIDTH, '$maxRight', '$nMaxRight'),
    calculateMaximums('h', CANVAS_HEIGHT, '$maxBottom', '$nMaxBottom'),
    extractKey('_pos', 'x', '$posX'),
    extractKey('_pos', 'y', '$posY'),
    negate('$posX', '$right'),
    negate('$posY', '$bottom'),
    transferKey('_pos', '$size'),
    setKey('$size', 'x', 0),
    setKey('$size', 'y', 0),
    and(value(gt, ['$maxBottom', 0]), value(gt, ['$maxRight', 0])),
    ifElse(
      value(pass, [$prev]),
      flow(
        restrictSide('$posX', '$nMaxRight', 'x', '$right', '$maxRight'),
        restrictSide('$posY', '$nMaxBottom', 'y', '$bottom', '$maxBottom')
      )
    ),
    $r('$size')
  ),
  args.length
)

function restrictSide(
  side: string,
  maxSide: string,
  sideParam: string,
  sideName: string,
  maxSideName: string
) {
  return ifElse(
    value(gt, [side, 0]),
    setKey('$size', sideParam, 0),
    ifElse(
      value(gt, [sideName, maxSideName]),
      setKey('$size', sideParam, maxSide),
      setKey('$size', sideParam, side)
    )
  )
}

function calculateMaximums(
  canvasMetric: 'w' | 'h',
  canvasMetricSize: number,
  maxSizeKey: string,
  negatedMaxSizeKey: string
) {
  return flow(
    $(get, ['_canvasSize', canvasMetric]),
    $(mathSub, [canvasMetricSize, $prev], maxSizeKey),
    $(mathMultiply, [maxSizeKey, -1], negatedMaxSizeKey)
  )
}

function value(fn: Function, args?: any[], saveTo?: string) {
  return $v($(fn, args, saveTo))
}

function negate(key: string, saveTo: string) {
  return $(mathMultiply, [key, -1], saveTo)
}

function extractKey(object: string, key: string, saveTo: string) {
  return $(get, [object, key], saveTo)
}

function setKey(object: string, key: string, value: any) {
  return $(set, [object, key, value])
}

function transferKey(from: string, to: string) {
  return $(pass, [from], to)
}
