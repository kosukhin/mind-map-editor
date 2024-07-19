import { ComputedExpression } from '@/modules/eo/targets/system/ComputedExpression';
import { ref, Ref, watch } from 'vue';

export class WatchedExpression<T> implements ComputedExpression<T> {
  private readonly ref: Ref<T | null>

  public constructor(
    private watchableDeps: any,
    private expression: (val: any) => T,
    private watchOptions: any = {},
    private defaultValue: any = null,
  ) {
    this.ref = ref(null);
  }

  public init() {
    watch(this.watchableDeps, (newValue: any) => {
      this.ref.value = newValue === null ? this.defaultValue : this.expression(newValue);
    }, this.watchOptions);
    return this;
  }

  public value() {
    return this.ref.value;
  }

  public valueRef() {
    return this.ref;
  }
}
