import { PatronPool, PoolType, GuestObjectType } from 'patron-oop';

export class FakeSource implements GuestObjectType<any> {
  private pool: PoolType<any> = new PatronPool<any>(this);

  public constructor(
    private value: any,
  ) {}

  public data(guest: GuestObjectType<any>): this {
    this.pool.distribute(this.value, guest);
    return this;
  }

  public give(value: any): this {
    this.value = value;
    this.pool.give(value);
    return this;
  }
}
