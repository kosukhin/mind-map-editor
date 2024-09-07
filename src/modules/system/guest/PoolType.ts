import { GuestType } from './GuestType';

export interface PoolType<T> extends GuestType<T>{
  add(guest: GuestType<T>): this;
  distribute(receiving: T, possiblePatron: GuestType<T>): this;
}
