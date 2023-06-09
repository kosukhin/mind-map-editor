import { describe, it } from 'vitest'
import set from 'lodash/set'
import {
  canvasCreateSize,
  canvasCreateSize2,
} from '~/application/canvasCreateSize'

describe('Построение размера канвы', () => {
  it('тест группировки', () => {
    const size = canvasCreateSize({
      clientWidth: 100,
      clientHeight: 200,
    })
    expect(size).toStrictEqual({
      w: 100,
      h: 200,
    })
  })
})
