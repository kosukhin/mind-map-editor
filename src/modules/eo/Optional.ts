import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export interface Optional<T, Truthy = Exclude<T, null>> {
  chainFilled<R>(cb: (value: Truthy) => R): Optional<R>;
  filled(cb: UnaryFn<Truthy>): this;
  empty(cb: Procedure): this;
}
