import { GuestType } from '@/modules/system/guest/GuestType';

export interface ChainType<T = unknown> {
  result(guest: GuestType<T>): this;
  receiveKey<R>(key: string): GuestType<R>;
}
