import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export interface Optional<T, Truthy = Exclude<T, null>> {
  filled(cb: UnaryFn<Truthy>): this;
  empty(cb: Procedure): this;
}
