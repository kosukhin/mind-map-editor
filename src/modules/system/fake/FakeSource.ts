import { PatronPool } from '@/modules/system/guest/PatronPool';
import { PoolType } from '@/modules/system/guest/PoolType';
import { GuestType } from '../guest/GuestType';

export class FakeSource implements GuestType<any> {
  private pool: PoolType<any> = new PatronPool<any>(this);

  public constructor(
    private value: any,
  ) {}

  public data(guest: GuestType<any>): this {
    this.pool.distribute(this.value, guest);
    return this;
  }

  public receive(value: any): this {
    this.value = value;
    this.pool.receive(value);
    return this;
  }
}
