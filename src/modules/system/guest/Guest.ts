import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

export class Guest<T> implements GuestType<T> {
  constructor(private receiver: (value: T, options?: ReceiveOptions) => void) {}

  receive(value: T, options?: ReceiveOptions) {
    this.receiver(value, options);
    return this;
  }
}
