import { GuestType } from '@/modules/system/guest/GuestType';

export interface CheckType<T> {
  check(value: T, guest: GuestType<boolean>): this;
}
