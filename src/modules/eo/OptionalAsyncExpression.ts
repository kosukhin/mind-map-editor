import { TruthyAsyncOptional } from '@/modules/eo/TruthyAsyncOptional';
import { ref, Ref } from 'vue';

export class OptionalAsyncExpression<T> {
  private ref: Ref<T | null>

  constructor(private optionalAsync: TruthyAsyncOptional<T>) {
    this.ref = ref(null);
  }

  private handleOptional(optional: TruthyAsyncOptional<T>) {
    optional.filled((value) => {
      if (value instanceof TruthyAsyncOptional) {
        this.handleOptional(value);
      } else {
        this.ref.value = value;
      }
    });
  }

  // Умеет разворачивать вложенные друг в друга Optional
  waitFullfillment() {
    this.handleOptional(this.optionalAsync);
    return this;
  }

  value() {
    return this.ref.value;
  }

  valueRef() {
    return this.ref;
  }
}
