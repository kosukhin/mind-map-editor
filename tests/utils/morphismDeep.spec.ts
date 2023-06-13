import { describe, it, expect } from 'vitest'
import { morphismDeep, pass, toPool } from '~/utils/fp'

describe('Морфизм вглубину', () => {
  it('проверка с ливтом', () => {
    const m = morphismDeep(3, toPool, pass, 10, 20, 30)
    expect(m(5)(2)(6)).to.toStrictEqual([[6, 2, 5], 10, 20, 30])
  })
})
