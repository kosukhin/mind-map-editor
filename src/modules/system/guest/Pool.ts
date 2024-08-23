import { Guest } from '@/modules/system/guest/Guest';

export interface Pool<T> {
  add(guest: Guest<T>): this;
  distributeReceiving(receiving: T, ...guests: Guest<T>[]): this;
}
