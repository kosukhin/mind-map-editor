import { describe, it } from 'vitest'
import { findRelationsToRemove } from '~/application/findRelationsToRemove'

describe('Поиск связей на удаление', () => {
  it('Улетели вверх', () => {
    const relations = findRelationsToRemove(
      { id: 16718902152075 },
      {
        objects: {
          ddsdsdsd: {
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
                id: '16718902152075',
              },
            ],
            lastClick: 1676308899194,
            id: '232323234',
          },
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
          '2121212': {
            type: 'Прямоугольник',
            position: [99, 79],
            name: 'DomainDrivenDesign',
            linked: true,
            description: null,
            zindex: 0,
            outlink: null,
            targetBlank: false,
            arrows: [],
            lastClick: 1676308899194,
            id: '2121212',
          },
        },
      }
    )
    expect(relations.value).toStrictEqual([
      {
        objectId: '232323234',
        indexes: [0],
      },
    ])
  })
})
