import { Nullable } from '~/entities'

export function Maybe<T>() {
  return new MaybeInst<T>()
}

export function MaybeError<T>() {
  return new MaybeErrorInst<T>()
}

export function Identity<U>(input: U) {
  return input as U
}

export class MaybeInst<T> {
  value: Nullable<T> = null

  get isNothing(): boolean {
    return this.value === null
  }

  map(fn: (value: T) => unknown): unknown {
    if (!this.value) return null
    return fn(this.value)
  }
}

export class MaybeErrorInst<T> extends MaybeInst<T> {
  error: string = ''

  get isNothing(): boolean {
    return super.isNothing || this.error !== ''
  }

  map(fn: (value: T) => unknown): unknown {
    if (this.error !== '') return null
    return super.map(fn)
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
