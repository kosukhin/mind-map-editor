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

export type TMaybe = InstanceType<typeof MaybeInst<any>>;

export function allSet(containers: TMaybe[]) {
  const values = containers.map(container => {
    return container.isNothing ? null : container.value
  });
  const result = Maybe<typeof values>();
  result.value = values.some(value => value === null) ? null : values;

  return result;
}
