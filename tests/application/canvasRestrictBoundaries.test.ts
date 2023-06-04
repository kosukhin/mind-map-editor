import { describe, it } from 'vitest'
import { canvasRestrictBoundaries } from '~/application/canvasRestrictBoundaries'

describe('Ограничение прокрутки', () => {
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
