import { GuestAwareType, GuestType, SourceEmpty, SourceType } from "patron-oop";

export interface GuestAwareAcitveType<R = unknown, T = unknown> extends GuestAwareType<T> {
  do(config: R): this;
}

export class GuestAwareActive<R, T> implements GuestAwareAcitveType<R, T> {
  private source = new SourceEmpty<T>();

  public constructor(private configExecutor: (config: R, source: SourceType<T>) => void) { }

  public do(config: R): this {
    this.configExecutor(config, this.source);
    return this;
  }

  public value(guest: GuestType<T>): this {
    this.source.value(guest);
    return this;
  }
}
