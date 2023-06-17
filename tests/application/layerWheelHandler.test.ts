import { describe, it, expect } from 'vitest'
import { layerWheelHandler } from '~/application/layerWheelHandler'

describe('Хэндлер прокрутки колеса', () => {
  it('базовый вызов', () => {
    const handlerResult = layerWheelHandler([
      {
        x: () => 1,
        y: () => 2,
      },
      {
        evt: {
          preventDefault: () => null,
          deltaX: 10,
          deltaY: 20,
        },
      },
    ])
    expect(handlerResult[1]).toStrictEqual({ x: -9, y: -18 })
  })
})
