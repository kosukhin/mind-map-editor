import { describe, it, expect } from 'vitest'
import { layerDragHandler } from '~/application/layerDragHandler'

describe('Проверяем что форма изменена', () => {
  it('изменена', () => {
    const result = layerDragHandler([
      {
        target: {
          attrs: {
            x: 0,
            y: 1,
            objectId: '222',
          },
        },
      },
      {
        objects: {
          '222': { test: 1 },
        },
      },
    ])
    expect(result).toStrictEqual([{ test: 1 }, { x: +0, y: 1 }])
  })
})
