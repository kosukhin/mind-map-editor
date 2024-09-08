import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

export class Guest<T> implements GuestType<T> {
  public constructor(private receiver: (value: T, options?: ReceiveOptions) => void) {}

  public receive(value: T, options?: ReceiveOptions) {
    this.receiver(value, options);
    return this;
  }
}
