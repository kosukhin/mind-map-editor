import { ref, Ref, watch } from 'vue';

export class WatchedExpression<T> {
  private ref: Ref<T | null>

  constructor(private watchableDeps: any, private expression: (val: any) => T, private watchOptions: any = {}) {
    this.ref = ref(null);
  }

  beginWatch() {
    watch(this.watchableDeps, (newValue: any) => {
      this.ref.value = this.expression(newValue);
    }, this.watchOptions);
    return this;
  }

  value() {
    return this.ref.value;
  }

  valueRef() {
    return this.ref;
  }
}
