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