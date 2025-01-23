import { ActionType } from "@/modules/system/source/ActionType";
import { GuestAwareObjectType, GuestType, SourceEmpty, SourceType } from "patron-oop";

export interface GuestAwareAcitveType<R = unknown, T = unknown> extends GuestAwareObjectType<T>, ActionType<R> {
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
