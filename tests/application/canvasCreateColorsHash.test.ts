import { describe, it } from 'vitest'
import map from '~/maps/demo.json'
import {
  canvasCreateColorsHash,
  canvasCreateColorsHash2,
} from '~/application/canvasCreateColorsHash'
import { clone } from '~/utils/fp'

describe('Создания хэша раскраски', () => {
  it('тест группировки', () => {
    const vMap = clone(map)
    vMap.structure.settings.colored = true
    const colors = canvasCreateColorsHash(vMap.structure)
    const colors2 = canvasCreateColorsHash2(vMap.structure)
    // console.log(colors2)
    expect({
      '1676308867689': 'darkred',
      '1676308874549': 'darkred',
      '1676308899194': 'darkred',
      '1676308962925': 'darkred',
      '1676308987067': 'darkorange',
      '1676309009665': 'darkorange',
      '1676309024250': 'darkorange',
      '1677690860711': 'darkorange',
      '1678121363077': 'darkgreen',
      '1678698312380': 'darkgreen',
      '1681045834245': 'darkgreen',
    }).toStrictEqual(colors)
  })
})
