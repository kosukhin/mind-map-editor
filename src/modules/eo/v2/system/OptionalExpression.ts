import { ComputedExpression } from '@/modules/eo/targets/system/ComputedExpression';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { ref, Ref } from 'vue';

export class OptionalExpression<T> implements ComputedExpression<T> {
  private readonly ref: Ref<T | null>

  public constructor(private optional: Optional<T>) {
    this.ref = ref(null);
  }

  init(): this {
    this.optional.filled((realValue) => {
      console.log('filled in optional expression', realValue);
      this.ref.value = realValue;
    });
    return this;
  }

  public value() {
    return this.ref.value;
  }

  public valueRef() {
    return this.ref;
  }
}
