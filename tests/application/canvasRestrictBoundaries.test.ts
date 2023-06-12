import { describe, it } from 'vitest'
import {
  calculateMaximums,
  canvasRestrictBoundaries,
} from '~/application/canvasRestrictBoundaries'
import { CANVAS_WIDTH } from '~/constants'

describe('Ограничение прокрутки', () => {
  it('calc maximums', () => {
    const r = calculateMaximums({ w: 100 }, 'w', CANVAS_WIDTH)
    expect(r).to.equals(2900)
  })

  it('Улетели вверх', () => {
    const size = canvasRestrictBoundaries({
      x: 100,
      y: 100,
    })({ w: 500, h: 500 })
    expect(size).toStrictEqual({
      x: 0,
      y: 0,
    })
  })

  it('Нормальная прокрутка', () => {
    const size = canvasRestrictBoundaries({
      x: -500,
      y: -500,
    })({ w: 500, h: 500 })
    expect(size).toStrictEqual({
      x: -500,
      y: -500,
    })
  })

  it('Кариррованная версия', () => {
    const size = canvasRestrictBoundaries({
      x: -5500,
      y: -5500,
    })({ w: 500, h: 500 })
    expect(size).toStrictEqual({
      x: -2500,
      y: -2500,
    })
  })
})
