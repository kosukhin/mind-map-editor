import { TruthyOptional } from '@/modules/eo/TruthyOptional';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class TruthyAsyncOptional<T, Truthy = Exclude<T, null>> {
  constructor(private asyncValue: Promise<T>) {}

  chainFilled<R>(cb: (value: Truthy) => R): TruthyAsyncOptional<R> {
    return new TruthyAsyncOptional<ReturnType<typeof cb>>(new Promise((resolve) => {
      this.filled((value) => {
        resolve(cb(value) as ReturnType<typeof cb>);
      });
    }));
  }

  filled(cb: UnaryFn<Truthy>) {
    this.asyncValue.then((value) => {
      new TruthyOptional<T>(value).filled(cb as UnaryFn<Exclude<T, null>>);
    });
    return this;
  }

  empty(cb: Procedure) {
    this.asyncValue.then((value) => {
      new TruthyOptional<T>(value).empty(cb);
    });
    return this;
  }
}
