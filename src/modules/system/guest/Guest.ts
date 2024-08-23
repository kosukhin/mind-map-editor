type GuestIntroduction = 'guest' | 'patron';

export interface ReceiveOptions {
  interceptAt?: any,
  specificData?: any,
}

export interface Guest<T> {
  receive(value: T, options?: ReceiveOptions): this;
  introduction?(): GuestIntroduction;
}
