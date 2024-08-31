import { PatronPool } from '@/modules/system/guest/PatronPool';
import { CacheType } from '@/modules/system/guest/CacheType';
import { GuestType, ReceiveOptions } from './GuestType';

export class Cache<T> implements CacheType<T> {
  public constructor(
    private defaultValue: T,
    initiator: unknown,
    private theCache: T | null = null,
    private pool = new PatronPool<T>(initiator),
  ) {}

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
}
