import { FactoryType } from "patron-oop";

export class Module<T> implements FactoryType<T> {
  public constructor(private buildingFn: (...args: any[]) => T) { }

  create<R extends unknown[], CT = null>(...args: R): CT extends null ? T : CT {
    return this.buildingFn(...args) as CT extends null ? T : CT;
  }
}
