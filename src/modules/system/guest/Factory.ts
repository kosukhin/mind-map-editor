import { FactoryType } from '@/modules/system/guest/FactoryType';

export class Factory<T> implements FactoryType<T> {
  public constructor(
    private factoryFn: (value: unknown) => T,
  ) {}

  public create(value: unknown) {
    return this.factoryFn(value);
  }
}
