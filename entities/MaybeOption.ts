import { isNone, isSome, map, match, none, Option, some } from 'fp-ts/Option'
import { Nullable } from '~/entities'

export function Maybe<T>() {
  return new MaybeInst<T>()
}

export function MaybeError<T>() {
  return new MaybeErrorInst<T>()
}

export class MaybeInst<T> {
  option: Option<T>

  get value() {
    return isSome(this.option) ? this.option.value : null
  }

  set value(value: T | null) {
    if (value === null) {
      this.option = none
    }

    this.option = some(value as T)
  }

  get isNothing(): boolean {
    return isNone(this.option)
  }

  match(): T | null {
    return match(
      () => null,
      () => {
        return this.value
      }
    )(this.option)
  }

  map<U>(fn: (value: T) => U): MaybeInst<U> {
    if (this.isNothing) {
      return this
    }

    const result = Maybe<U>()
    result.option = map(fn)(this.option)

    return result
  }
}

export class MaybeErrorInst<T> extends MaybeInst<T> {
  error: string = ''

  get isNothing(): boolean {
    return super.isNothing || this.error !== ''
  }
}

type ExtractGenerics<T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [MaybeInst<infer V>, ...infer Next]
  ? [V, ...ExtractGenerics<Next>]
  : never

export function allSet<C extends readonly MaybeInst<unknown>[]>(containers: C) {
  if (containers.some((container) => container.isNothing)) {
    return Maybe<ExtractGenerics<C>>()
  }

  const values = containers.map((container) => container.value)
  const result = Maybe<ExtractGenerics<C>>()
  result.value = values as ExtractGenerics<C>

  return result
}

export function anySet<C extends readonly MaybeInst<unknown>[]>(containers: C) {
  const firstMaybe = (containers.find((container) => !container.isNothing) ??
    null) as Nullable<MaybeInst<ExtractGenerics<C>>>
  const result = Maybe<ExtractGenerics<C>>()
  result.value = firstMaybe ? firstMaybe.value : null

  return result as (typeof containers)[number]
}
