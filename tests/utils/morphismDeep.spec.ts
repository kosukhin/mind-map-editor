import { describe, it, expect } from 'vitest'
import { morphismDeep, toPool } from '~/utils/fp'

describe('Морфизм вглубину', () => {
  it('проверка с ливтом', () => {
    const m = morphismDeep(3, toPool, 10, 20, 30)
    expect(m(5)(2)(6)).to.toStrictEqual([[5, 2, 6], 10, 20, 30])
  })
})
