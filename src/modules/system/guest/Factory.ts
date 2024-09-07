import { FactoryType } from '@/modules/system/guest/FactoryType';

export class Factory<T, V> implements FactoryType<T> {
  public constructor(
    private factoryFn: (value: V) => T,
  ) {}

  public create(value: V) {
    return this.factoryFn(value);
  }
}
