import { Optional } from '@/modules/eo/targets/system/Optional';
import { Procedure, UnaryFn } from '@/modules/eo/TypesFunctions';

export class OptionalSync<T> implements Optional<T> {
  public constructor(private value: T | null) {}

  filled(cb: UnaryFn<Exclude<T, null>>): this {
    this.unwrapOptionalChain((value) => {
      if (value) {
        const newValue = cb(value as Exclude<T, null>);
        if (newValue !== undefined && newValue !== null) {
          this.value = newValue;
        }
      }
    }, 'filled');
    return this;
  }

  empty(cb: Procedure): this {
    this.unwrapOptionalChain((value) => {
      if (!value) {
        const newValue = cb();
        if (newValue !== undefined && newValue !== null) {
          this.value = newValue as T | null;
        }
      }
    }, 'empty');
    return this;
  }

  protected unwrapOptionalChain(cb: UnaryFn<T | null>, operationType: 'filled' | 'empty') {
    if (this.value instanceof OptionalSync) {
      this.value[operationType](cb as any);
    } else {
      cb(this.value);
    }
  }
}
