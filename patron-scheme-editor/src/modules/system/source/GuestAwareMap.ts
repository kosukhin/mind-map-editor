import { FactoryType, give, GuestAware, GuestAwareAll, GuestAwareObjectType, GuestCast, GuestType } from "patron-oop";

export class GuestAwareMap<T = unknown, TG = unknown> implements GuestAwareObjectType<TG[]> {
  public constructor(
    private baseSource: GuestAwareObjectType<T[]>,
    private targetSourceFactory: FactoryType<GuestAwareObjectType<TG>>
  ) { }

  value(guest: GuestType<TG[]>) {
    const chain = new GuestAwareAll();
    this.baseSource.value(
      new GuestCast(<GuestType>guest, (value) => {
        value.forEach((val, index) => {
          const targetSource = this.targetSourceFactory.create(
            new GuestAware((innerGuest) => {
              give(val, innerGuest);
            })
          )
          targetSource.value(chain.guestKey('' + index));
        });
      })
    );
    chain.valueArray(<GuestType>guest);
    return this;
  }
}
