import { PoolType } from '@/modules/system/guest/PoolType';
import { GuestType, ReceiveOptions } from './GuestType';

export class PatronPool<T> implements PoolType<T> {
  private patrons = new Set<GuestType<T>>();

  public constructor(private initiator: unknown) {}

  public add(shouldBePatron: GuestType<T>) {
    if (shouldBePatron.introduction && shouldBePatron.introduction() === 'patron') {
      this.patrons.add(shouldBePatron);
    }
    return this;
  }

  public remove(patron: GuestType<T>) {
    this.patrons.delete(patron);
    return this;
  }

  public receive(value: T, options?: ReceiveOptions) {
    this.patrons.forEach((target) => {
      this.sendValueToGuest(value, target, options);
    });
    return this;
  }

  public distribute(receiving: T, possiblePatron: GuestType<T>): this {
    this.add(possiblePatron);
    this.sendValueToGuest(receiving, possiblePatron, {});
    return this;
  }

  private sendValueToGuest(value: T, guest: GuestType<T>, options?: ReceiveOptions) {
    guest.receive(value, {
      ...options,
      data: {
        ...((options?.data as Record<string, unknown>) ?? {}),
        initiator: this.initiator,
        pool: this,
      },
    });
  }
}
