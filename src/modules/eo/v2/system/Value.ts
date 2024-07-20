import { Valueable } from '@/modules/eo/targets/system/Valueable';

export class Value<T> implements Valueable<T> {
  constructor(private realValue: T) {}

  value(): T {
    return this.realValue;
  }
}
