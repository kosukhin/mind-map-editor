import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { PoolType } from '@/modules/system/guest/PoolType';
import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

export class PatronPool<T> implements PoolType<T> {
  private patrons = new Set<GuestType<T>>();

  public constructor(private initiator: unknown) {}

  public add(shouldBePatron: GuestType<T>) {
    try {
      if (shouldBePatron.introduction && shouldBePatron.introduction() === 'patron') {
        this.patrons.add(shouldBePatron);
      }
      return this;
    } catch (e) {
      throw new RuntimeError('Cant add patron to pool', { cause: e });
    }
  }

  public remove(patron: GuestType<T>) {
    this.patrons.delete(patron);
    return this;
  }

  public receive(value: T, options?: ReceiveOptions) {
    try {
      this.patrons.forEach((target) => {
        target.receive(value, {
          ...options,
          specificData: {
            ...(options?.specificData ?? {}),
            initiator: this.initiator,
            pool: this,
          },
        });
      });
      return this;
    } catch (e) {
      throw new RuntimeError('Cant receive value in patrons pool', { cause: e });
    }
  }

  public distribute(receiving: T, possiblePatron: GuestType<T>): this {
    this.add(possiblePatron);
    possiblePatron.receive(receiving);
    return this;
  }
}
