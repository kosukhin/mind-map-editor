import {
  Guest,
  ReceiveOptions,
} from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { Pool } from '@/modules/system/guest/Pool';

export class PatronPoolWithGuests<T> implements Guest<T>, Pool<T> {
  private guests = new Set<Guest<T>>();

  private patronPool: PatronPool<T>;

  public constructor(initiator: unknown) {
    this.patronPool = new PatronPool(initiator);
  }

  public introduction() {
    return 'guest' as const;
  }

  public receive(value: T, options?: ReceiveOptions): this {
    this.deliverToGuests(value, options);
    this.patronPool.receive(value, options);
    return this;
  }

  public add(guest: Guest<T>): this {
    if (guest.introduction() === 'guest') {
      this.guests.add(guest);
    }
    this.patronPool.add(guest);
    return this;
  }

  public distributeReceiving(receiving: T, ...guests: Guest<T>[]): this {
    guests.forEach((guest) => {
      this.guests.add(guest);
    });
    this.deliverToGuests(receiving);
    this.patronPool.distributeReceiving(receiving, ...guests);
    return this;
  }

  private deliverToGuests(value: T, options?: ReceiveOptions) {
    this.guests.forEach((target) => {
      target.receive(value, options);
    });
    this.guests.clear();
  }
}
