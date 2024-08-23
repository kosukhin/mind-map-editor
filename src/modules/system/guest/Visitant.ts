import {
  Guest,
  ReceiveOptions,
} from '@/modules/system/guest/Guest';

export class Visitant<T> implements Guest<T> {
  constructor(private receiver: (value: T, options?: ReceiveOptions) => void) {}

  receive(value: T, options?: ReceiveOptions) {
    this.receiver(value, options);
    return this;
  }
}
