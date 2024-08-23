import {
  Guest,
  ReceiveOptions,
} from '@/modules/system/guest/Guest';
import { GuestAware } from '@/modules/system/guest/GuestAware';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class Value<T> implements Guest<T>, GuestAware<T> {
  private pool: PatronPool<T>;

  public constructor(private theValue: T, initiator: unknown) {
    this.pool = new PatronPool<T>(initiator);
  }

  receive(value: T, options?: ReceiveOptions): this {
    this.theValue = value;
    this.pool.receive(value, options);
    return this;
  }

  receiving(guest: Guest<T>): this {
    guest.receive(this.theValue);
    this.pool.add(guest);
    return this;
  }
}
