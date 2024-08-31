import { GuestType } from './GuestType';

export interface PoolType<T> extends GuestType<T>{
  add(guest: GuestType<T>): this;
  distributeReceiving(receiving: T, ...guests: GuestType<T>[]): this;
  distributeReceivingOnce(receiving: T, possiblePatron: GuestType<T>): this;
}
