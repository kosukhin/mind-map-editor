import { Guest } from '@/modules/system/guest/Guest';

export class GuestDynamic<T> implements Guest<T> {
  constructor(private receiver: (value: T) => void, private label?: string) {}

  receive(value: T) {
    this.receiver(value);
    return this;
  }

  introduction() {
    return 'guest' as const;
  }
}
