import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export class GuestAwareFirst<T> implements GuestAwareType<T> {
  public constructor(private guestAwares: GuestAwareType[]) { }

  public value(guest: GuestType<T>): this {
    let connectedWithGuestAware: GuestAwareType | null = null;
    this.guestAwares.forEach(guestAware => {
      guestAware.value(
        new GuestCast(<GuestType>guest, (value) => {
          if (!connectedWithGuestAware || connectedWithGuestAware === guestAware) {
            give(value as T, guest);
            connectedWithGuestAware = guestAware
          }
        })
      )
    });

    return this;
  }
}
