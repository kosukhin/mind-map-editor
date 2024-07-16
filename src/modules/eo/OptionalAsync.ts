import { Optional } from '@/modules/eo/Optional';
import { OptionalSync } from '@/modules/eo/OptionalSync';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class OptionalAsync<T> implements Optional<T> {
  public constructor(private asyncValue: Promise<T>) {}

  public chainFilled<R>(cb: (value: Exclude<T, null>) => R): Optional<R> {
    return new OptionalAsync<ReturnType<typeof cb>>(new Promise((resolve) => {
      this.filled((value) => {
        resolve(cb(value) as ReturnType<typeof cb>);
      });
    }));
  }

  public filled(cb: UnaryFn<Exclude<T, null>>): this {
    this.asyncValue.then((value) => {
      new OptionalSync<T>(value).filled(cb as UnaryFn<Exclude<T, null>>);
    });
    return this;
  }

  public empty(cb: Procedure): this {
    this.asyncValue.then((value) => {
      new OptionalSync<T>(value).empty(cb);
    });
    return this;
  }
}
