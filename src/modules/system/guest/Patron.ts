import { Guest } from '@/modules/system/guest/Guest';

/**
 * Патрон - это постоянный посетитель
 */
export class Patron<T> implements Guest<T> {
  public constructor(private willBePatron: Guest<T>) {}

  public introduction() {
    return 'patron' as const;
  }

  public receive(value: T): this {
    this.willBePatron.receive((value));
    return this;
  }
}
