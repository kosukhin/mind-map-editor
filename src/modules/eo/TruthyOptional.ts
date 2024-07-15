import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class TruthyOptional<T, Truthy = Exclude<T, null>> {
  constructor(private value: T) {}

  filled(cb: UnaryFn<Truthy>) {
    if (this.value) {
      cb(this.value as Truthy);
    }
    return this;
  }

  empty(cb: Procedure) {
    if (!this.value) {
      cb();
    }
    return this;
  }
}
