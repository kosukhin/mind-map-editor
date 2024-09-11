import { InstanceType } from '@/modules/system/guest/InstanceType';

export class Instance<T, V extends unknown[]> implements InstanceType<T> {
  public constructor(
    private factoryFn: (...args: V) => T,
  ) {}

  public create(...args: V) {
    return this.factoryFn(...args);
  }
}
