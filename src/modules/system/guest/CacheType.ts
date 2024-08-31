import { GuestType } from './GuestType';

export interface CacheType<T> {
  cache(guest: GuestType<T>, defaultValue: T): this;
}
