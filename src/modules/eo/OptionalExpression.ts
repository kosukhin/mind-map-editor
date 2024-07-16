import { Optional } from '@/modules/eo/Optional';
import { OptionalAsync } from '@/modules/eo/OptionalAsync';
import { OptionalSync } from '@/modules/eo/OptionalSync';
import { ref, Ref } from 'vue';

export class OptionalExpression<T> {
  private readonly ref: Ref<T | null>

  public constructor(private optionalAsync: Optional<T>) {
    this.ref = ref(null);
  }

  private handleOptional(optional: Optional<T>) {
    optional.filled((value) => {
      if (value instanceof OptionalAsync || value instanceof OptionalSync) {
        this.handleOptional(value);
      } else {
        this.ref.value = value;
      }
    });
  }

  // Умеет разворачивать вложенные друг в друга Optional
  public subscribeToSettled() {
    this.handleOptional(this.optionalAsync);
    return this;
  }

  public value() {
    return this.ref.value;
  }

  public valueRef() {
    return this.ref;
  }
}
