import {
  Guest,
  ReceiveOptions,
} from '@/modules/system/guest/Guest';

export class GuestInTheMiddle<T> implements Guest<T> {
  public constructor(
    private baseGuest: Guest<unknown>,
    private middleFn: (value: T, options?: ReceiveOptions) => void,
  ) {}

  introduction() {
    if (!this.baseGuest.introduction) {
      return 'guest';
    }
    return this.baseGuest.introduction();
  }

  receive(value: T, options?: ReceiveOptions): this {
    this.middleFn(value, options);
    return this;
  }
}
