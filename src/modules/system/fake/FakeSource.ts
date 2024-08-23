import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class FakeSource implements Guest<any> {
  private pool = new PatronPool<any>(this)

  public constructor(private value: any) {}

  public data(guest: Guest<any>): this {
    this.pool.distributeReceiving(this.value, guest);
    return this;
  }

  public receive(value: any): this {
    this.value = value;
    this.pool.receive(value);
    return this;
  }
}
