import { Ref } from 'vue';

export interface ComputedExpression<T> {
  init(): this;
  value(): T | null;
  valueRef(): Ref<T | null>;
}
