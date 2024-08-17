import { Target } from '@/modules/system/target/Target';

export class TargetDynamic<T> implements Target<T> {
  constructor(private cb: (value: T) => void) {}

  receive(value: T): this {
    this.cb(value);
    return this;
  }
}
