import { ActionType, GuestType, PatronPool, SourceEmpty, SourceType } from "patron-oop";

type ActionsType = 'empty';

export class StorageRecord<T> implements SourceType<T>, ActionType<ActionsType> {
  private source = new SourceEmpty<T>();

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

  public do(action: ActionsType): this {
    if (action === 'empty') {
      localStorage.removeItem(this.name);
    }
    return this;
  }

  public give(value: T): this {
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
