import {
  GuestAwareType,
  GuestCast,
  GuestObjectType,
} from 'patron-oop';

export class Deadline<T, DT> implements GuestAwareType<T | DT>, GuestObjectType<T> {
  public constructor(private baseSource: GuestAwareType<T>, private defaultValue: DT, private timeout = 1000) { }

  public give(value: T) {
    const mbGuest = this.baseSource as unknown as GuestObjectType<T | DT>;
    if ('give' in mbGuest) {
      mbGuest.give(value);
    }
    return this;
  }

  public value(guest: GuestObjectType<T | DT>) {
    const timerHead = setTimeout(() => {
      guest.give(this.defaultValue);
    }, this.timeout);
    this.baseSource.value(new GuestCast(guest, (value) => {
      clearTimeout(timerHead);
      guest.give(value);
    }));
    return this;
  }
}
