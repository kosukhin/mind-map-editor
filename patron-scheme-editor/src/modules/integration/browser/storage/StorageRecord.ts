import { GuestType, PatronPool, Source, SourceEmpty, SourceType } from "patron-oop";

export class StorageRecord<T> implements SourceType<T> {
  private source = new Source<T | null>(null);

  public constructor(private name: string) {
    const value = JSON.parse(localStorage.getItem(name) || 'null');
    this.source.give(value);
    document.addEventListener(
      "localDataStorage",
      (e: any) => {
        if (e.detail.key === name) {
          this.source.give(JSON.parse(e.detail.newval))
        }
      },
      false
    );
  }

  public give(value: T | null): this {
    localStorage.setItem(this.name, JSON.stringify(value));
    this.source.give(value)
    return this;
  }

  public pool(): PatronPool<T> {
    return this.source.pool();
  }

  public value(guest: GuestType<T>) {
    this.source.value(guest as any);
    return this;
  }
}
