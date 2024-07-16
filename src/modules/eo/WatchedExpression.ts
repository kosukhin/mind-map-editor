import { ref, Ref, watch } from 'vue';

export class WatchedExpression<T> {
  private readonly ref: Ref<T | null>

  public constructor(
    private watchableDeps: any,
    private expression: (val: any) => T,
    private watchOptions: any = {},
    private defaultValue: any = null,
  ) {
    this.ref = ref(null);
  }

  public beginWatch() {
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
