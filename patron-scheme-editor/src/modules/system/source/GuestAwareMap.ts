import { FactoryType, give, GuestAware, GuestAwareType, GuestCast, GuestChain, GuestType } from "patron-oop";

export class GuestAwareMap<T = unknown, TG = unknown> implements GuestAwareType<TG[]> {
  public constructor(
    private baseSource: GuestAwareType<T[]>,
    private targetSourceFactory: FactoryType<GuestAwareType<TG>>
  ) { }

  value(guest: GuestType<TG[]>) {
    const chain = new GuestChain();
    this.baseSource.value(
      new GuestCast(<GuestType>guest, (value) => {
        value.forEach((val, index) => {
          const targetSource = this.targetSourceFactory.create(
            new GuestAware((innerGuest) => {
              give(val, innerGuest);
            })
          )
          targetSource.value(chain.receiveKey('' + index));
        });
      })
    );
    chain.resultArray(<GuestType>guest);
    return this;
  }
}
