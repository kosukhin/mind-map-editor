type GuestIntroduction = 'guest' | 'patron';

export interface Guest<T> {
  receive(value: T): this;
  introduction(): GuestIntroduction;
}
