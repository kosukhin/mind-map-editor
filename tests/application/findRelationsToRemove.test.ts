import { describe, it } from 'vitest'
import { findRelationsToRemove } from '~/application/findRelationsToRemove'

describe('Поиск связей на удаление', () => {
  it('Улетели вверх', () => {
    const relations = findRelationsToRemove(
      { id: 1671890215075 },
      {
        objects: {
          '1670071804513': {
            type: 'Прямоугольник',
            position: [99, 79],
            name: 'DomainDrivenDesign',
            linked: true,
            description: null,
            zindex: 0,
            outlink: null,
            targetBlank: false,
            arrows: [
              {
                id: '1671890215075',
              },
              {
                id: '1671890215075',
              },
            ],
            lastClick: 1676308899194,
            id: '1670071804513',
          },
        },
      }
    )
    expect(relations.value).toStrictEqual([
      { objectId: '1670071804513', indexes: [0] },
      { objectId: '1670071804513', indexes: [1] },
    ])
  })
})
