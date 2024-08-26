import {
  Guest,
  ReceiveOptions,
} from '@/modules/system/guest/Guest';
import { GuestAware } from '@/modules/system/guest/GuestAware';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class Cache<T> implements Guest<T>, GuestAware<T> {
  private pool: PatronPool<T>;

  private theCache: T | null = null;

  public constructor(initiator: unknown) {
    this.pool = new PatronPool<T>(initiator);
  }

  public receive(value: T, options?: ReceiveOptions): this {
    this.theCache = value;
    this.pool.receive(value, options);
    return this;
  }

  public receiving(guest: Guest<T>): this {
    if (this.theCache !== null) {
      guest.receive(this.theCache);
    }
    this.pool.add(guest);
    return this;
  }

  public cache(guest: Guest<T>, defaultValue: T): this {
    if (this.theCache === null) {
      guest.receive(defaultValue);
    }
    this.receiving(guest);

    return this;
  }
}
