import { GuestAwareType, GuestType, Patron, PatronPool, SourceEmpty, SourceType } from 'patron-oop';

export class SourceDynamic<T = unknown> implements SourceType<T> {
  private sourceEmpty = new SourceEmpty();

  public constructor(baseGuest: GuestType<T>, baseGuestAware: GuestAwareType<T>) {
    this.sourceEmpty.value(new Patron(baseGuest));
    baseGuestAware.value(new Patron(this.sourceEmpty));
  }

  public value(guest: GuestType<T>) {
    this.sourceEmpty.value(<GuestType>guest);
    return this;
  }

  public give(value: T) {
    this.sourceEmpty.give(value);
    return this;
  }

  public pool(): PatronPool<T> {
    return this.sourceEmpty.pool();
  }
}
