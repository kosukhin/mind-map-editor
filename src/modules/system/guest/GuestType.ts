type GuestIntroduction = 'guest' | 'patron';

export interface ReceiveOptions {
  interceptAt?: any,
  specificData?: any,
}

export interface GuestType<T> {
  receive(value: T, options?: ReceiveOptions): this;
  introduction?(): GuestIntroduction;
}
