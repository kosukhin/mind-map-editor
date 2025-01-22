import { give, GuestAwareObjectType, GuestCast, GuestType } from "patron-oop";

export type DeviceDocument = {
  isMobile: boolean,
  isDesktop: boolean,
}

export class Device implements GuestAwareObjectType<DeviceDocument> {
  public constructor(
    private windowWidth: GuestAwareObjectType<number>,
    private mobileLimit = 768
  ) { }

  public value(guest: GuestType<DeviceDocument>) {
    this.windowWidth.value(
      new GuestCast(guest, (windowWidth) => {
        give({
          isMobile: windowWidth <= this.mobileLimit,
          isDesktop: windowWidth > this.mobileLimit
        }, guest);
      })
    )
    return this;
  }
}
