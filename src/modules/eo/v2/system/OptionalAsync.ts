import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';
import { Optional } from '@/modules/eo/targets/system/Optional';

export class OptionalAsync<T> extends OptionalSync<T> implements Optional<T> {
  public constructor(private asyncValue: Promise<T | null>) {
    super(null);
  }

  public filled(cb: UnaryFn<Exclude<T, null>>): this {
    this.asyncValue = this.asyncValue.then((value) => new OptionalSync<T>(value).filled(cb as UnaryFn<Exclude<T, null>>)) as Promise<T | null>;
    return this;
  }

  public empty(cb: Procedure): this {
    this.asyncValue = this.asyncValue.then((value) => new OptionalSync<T>(value).empty(cb)) as Promise<T | null>;
    return this;
  }
}
