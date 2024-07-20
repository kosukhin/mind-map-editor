import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export interface Optional<T, Truthy = Exclude<T, null>> {
  filled(cb: UnaryFn<Truthy>): Optional<T>;
  empty(cb: Procedure): Optional<T>;
}
