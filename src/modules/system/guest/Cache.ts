import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { CacheType } from '@/modules/system/guest/CacheType';
import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

export class Cache<T> implements GuestType<T>, GuestAwareType<T>, CacheType<T> {
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

  public receiving(guest: GuestType<T>): this {
    if (this.theCache !== null) {
      guest.receive(this.theCache);
    }
    this.pool.add(guest);
    return this;
  }

  public cache(guest: GuestType<T>, defaultValue: T): this {
    if (this.theCache === null) {
      guest.receive(defaultValue);
    }
    this.receiving(guest);

    return this;
  }
}
