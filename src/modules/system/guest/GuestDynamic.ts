import { Guest } from '@/modules/system/guest/Guest';

export class GuestDynamic<T> implements Guest<T> {
  public constructor(private receiver: (value: T) => void, private label?: string) {}

  public receive(value: T) {
    this.receiver(value);
    return this;
  }

  public introduction() {
    return 'guest' as const;
  }
}
