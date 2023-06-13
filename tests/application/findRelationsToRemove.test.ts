import { describe, it } from 'vitest'
import map from '~/maps/demo.json'
import { clone } from '~/utils/fp'
import { findRelationsToRemove2 } from '~/application/findRelationsToRemove'

describe('Поиск связей на удаление', () => {
  it('Улетели вверх', () => {
    const vMap = clone(map)
    const relations = findRelationsToRemove2(
      { id: 1671909766349 },
      vMap.structure
    )
    expect(relations).toStrictEqual([])
  })
})
