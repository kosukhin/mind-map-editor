import { map, fromNullable, isSome } from 'fp-ts/Option'
import { Maybe } from '~/utils'

export class MaybeInst<T> {
  value: T | null = null

  get isNothing(): boolean {
    return this.value === null
  }

  map<U>(fn: (value: T) => U): MaybeInst<U> {
    if (this.isNothing) {
      return this
    }

    const result = Maybe<U>()
    const option = map(fn)(fromNullable(this.value))
    result.value = isSome(option) ? option.value : null

    return result
  }
}

export class MaybeErrorInst<T> extends MaybeInst<T> {
  error: string = ''

  get isNothing(): boolean {
    return super.isNothing || this.error !== ''
  }
}
