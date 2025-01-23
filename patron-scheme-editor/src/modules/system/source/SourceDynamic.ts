import { give, GuestAwareObjectType, GuestType, PatronPool, SourceType } from 'patron-oop';

export class SourceDynamic<T = unknown> implements SourceType<T> {
  public constructor(
    private baseGuest: GuestType<T>,
    private baseGuestAware: GuestAwareObjectType<T>,
  ) { }

  public value(guest: GuestType<T>) {
    this.baseGuestAware.value(guest);
    return this;
  }

  public give(value: T) {
    give(value, this.baseGuest);
    return this;
  }

  public pool(): PatronPool<T> {
    throw Error('No pool in SourceDynamic');
  }
}
