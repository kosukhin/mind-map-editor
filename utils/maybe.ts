import { reactive, shallowReactive } from '@vue/reactivity'
import { MaybeErrorInst, MaybeInst, Nullable } from '~/entities'

export function reMaybe<T>() {
  return reactive(Maybe<T>()) as MaybeInst<T>
}

export function shallowReMaybe<T>() {
  return shallowReactive(Maybe<T>()) as MaybeInst<T>
}

export function Maybe<T>() {
  return new MaybeInst<T>()
}

export function MaybeError<T>() {
  return new MaybeErrorInst<T>()
}

type ExtractGenerics<T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [MaybeInst<infer V>, ...infer Next]
  ? [V, ...ExtractGenerics<Next>]
  : T extends readonly MaybeInst<infer V>[]
  ? V[]
  : never

export function all<C extends readonly MaybeInst<unknown>[]>(containers: C) {
  if (containers.some((container) => container.isNothing)) {
    return Maybe<ExtractGenerics<C>>()
  }
  const values = containers.map((container) => container.value)
  const result = Maybe<ExtractGenerics<C>>()
  result.value = values as ExtractGenerics<C>
  return result
}

export function any<C extends readonly MaybeInst<unknown>[]>(containers: C) {
  const firstMaybe = (containers.find((container) => !container.isNothing) ??
    null) as Nullable<MaybeInst<ExtractGenerics<C>>>
  const result = Maybe<ExtractGenerics<C>>()
  result.value = firstMaybe ? firstMaybe.value : null
  return result as (typeof containers)[number]
}
