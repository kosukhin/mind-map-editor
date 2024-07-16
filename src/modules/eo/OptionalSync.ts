import { Optional } from '@/modules/eo/Optional';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class OptionalSync<T> implements Optional<T> {
  public constructor(private value: T) {}

  public chainFilled<R>(cb: (value: Exclude<T, null>) => R): Optional<R> {
    if (this.value) {
      return new OptionalSync<ReturnType<typeof cb>>(cb(this.value as Exclude<T, null>));
    }
    return new OptionalSync(null);
  }

  public filled(cb: UnaryFn<Exclude<T, null>>): this {
    if (this.value) {
      cb(this.value as Exclude<T, null>);
    }
    return this;
  }

  public empty(cb: Procedure) {
    if (!this.value) {
      cb();
    }
    return this;
  }
}
