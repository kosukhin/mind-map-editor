import { Guest } from '@/modules/system/guest/Guest';

export interface GuestAware<T> {
  receiving(guest: Guest<T>): unknown;
}
