import { GuestType } from './GuestType';

export interface PoolType<T> {
  add(guest: GuestType<T>): this;
  distributeReceiving(receiving: T, ...guests: GuestType<T>[]): this;
}
