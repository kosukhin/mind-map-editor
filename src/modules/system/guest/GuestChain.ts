import { Guest } from '@/modules/system/guest/Guest';
import { RuntimeError } from '@/modules/system/error/RuntimeError';

export class GuestChain<T> implements Guest<T> {
  private chainResult: unknown[] = [];

  private guestsPool: Guest<unknown>[] = [];

  public constructor(private chainLength: number) {}

  public result(guest: Guest<unknown[]>) {
    this.guestsPool.push(guest);
    this.notify();
  }

  public introduction() {
    return 'guest' as const;
  }

  public receive(value: T): this {
    if (this.chainLength <= this.chainResult.length) {
      throw new RuntimeError('Guest chain is full! check your logic!', {});
    }
    this.chainResult.push(value);
    this.notify();
    return this;
  }

  private notify() {
    if (this.chainLength === this.chainResult.length) {
      this.guestsPool.forEach((guest) => {
        guest.receive(this.chainResult);
      });
    }
  }
}
