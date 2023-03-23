import {Nullable} from '~/entities';

export function Maybe<T>() {
  return new MaybeInst<T>();
}

export class MaybeInst<T> {
  value: Nullable<T> = null;

  get isNothing(): boolean {
    return this.value === null;
  }

  map(fn: (value: T) => unknown): unknown {
    if (!this.value) return null;
    return fn(this.value);
  }
}

type ExtractGenerics<T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [MaybeInst<infer V>, ...infer Next]
    ? [V, ...ExtractGenerics<Next>]
    : never;

export function allSet<C extends readonly MaybeInst<unknown>[]>(containers: C) {
  if (containers.some(container => container.isNothing)) {
    return Maybe<ExtractGenerics<C>>();
  }

  const values = containers.map(container => container.value);
  const result = Maybe<ExtractGenerics<C>>();
  result.value = values as ExtractGenerics<C>;

  return result;
}
