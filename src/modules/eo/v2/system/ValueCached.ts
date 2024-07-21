import { Valueable } from '@/modules/eo/targets/system/Valueable';

export class ValueCached<T> implements Valueable<T> {
  private cachedValue: T | null = null;

  constructor(private targetValue: Valueable<T>) {}

  value(): T {
    if (!this.cachedValue) {
      this.cachedValue = this.targetValue.value();
    }
    return this.cachedValue;
  }
}
