import { GuestType } from './GuestType';

export interface GuestAwareType<T> {
  receiving(guest: GuestType<T>): unknown;
}
