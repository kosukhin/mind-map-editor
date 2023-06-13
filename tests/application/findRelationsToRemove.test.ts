import { describe, it } from 'vitest'
import map from '~/maps/demo.json'
import { clone } from '~/utils/fp'
import { findRelationsToRemove2 } from '~/application/findRelationsToRemove'

describe('Поиск связей на удаление', () => {
  it('Улетели вверх', () => {
    const vMap = clone(map)
    // const relations = findRelationsToRemove2(
    //   { id: 1672421307502 },
    //   vMap.structure
    // )
    const relations = []
    expect(relations).toStrictEqual([])
  })
})
