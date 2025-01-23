import {
  give,
  GuestAwareObjectType,
  GuestCast,
  GuestObjectType,
  GuestType,
} from 'patron-oop';

export class Deadline<T, DT> implements GuestAwareObjectType<T | DT>, GuestObjectType<T> {
  public constructor(private baseSource: GuestAwareObjectType<T>, private defaultValue: DT, private timeout = 1000) { }

  public give(value: T) {
    const mbGuest = this.baseSource as unknown as GuestObjectType<T | DT>;
    if ('give' in mbGuest) {
      mbGuest.give(value);
    }
    return this;
  }

  public value(guest: GuestType<T | DT>) {
    const timerHead = setTimeout(() => {
      give(this.defaultValue, guest);
    }, this.timeout);
    this.baseSource.value(new GuestCast(guest, (value) => {
      clearTimeout(timerHead);
      give(value, guest);
    }));
    return this;
  }
}
