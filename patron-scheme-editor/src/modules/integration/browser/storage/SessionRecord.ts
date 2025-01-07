import { GiveOptions, GuestType, PatronPool, Source, SourceEmpty, SourceType } from "patron-oop";

export class SessionRecord<T> implements SourceType<T> {
  private source = new SourceEmpty<T>();

  public constructor(private name: string) {
    if (sessionStorage[name]) {
      try {
        this.source.give(JSON.parse(sessionStorage[name]));
      } catch {
        console.warn(`SessionRecord cant parse value ${name}`);
      }
    }
  }

  public value(guest: GuestType<T>) {
    this.source.value(guest);
    return this;
  }

  public give(value: T) {
    this.source.give(value);
    try {
      sessionStorage[this.name] = JSON.stringify(value);
    } catch {
      console.warn(`SessionRecord cant stringify value ${this.name}`);
    }
    return this;
  }

  public pool(): PatronPool<T> {
    return this.pool();
  }
}
