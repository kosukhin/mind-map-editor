import { FactoryType, give, GuestAwareAll, GuestAwareObjectType, GuestCast, GuestType, SourceEmpty } from "patron-oop";

export class GuestAwareSequence<T, TG> implements GuestAwareObjectType<TG[]> {
  public constructor(
    private baseSource: GuestAwareObjectType<T[]>,
    private targetSourceFactory: FactoryType<GuestAwareObjectType<TG>>
  ) { }

  public value(guest: GuestType<TG[]>) {
    const chain = new GuestAwareAll<TG[]>();
    const sequenceSource = new SourceEmpty();
    const targetSource = this.targetSourceFactory.create(
      sequenceSource
    )

    this.baseSource.value(
      new GuestCast(guest, (value) => {
        let index = 0;

        const nextItemHandle = () => {
          if (value[index + 1] !== undefined) {
            index = index + 1;
            handle();
          } else {
            chain.valueArray(guest);
          }
        }

        function handle() {
          sequenceSource.give(value[index]);
          targetSource.value(chain.guestKey('' + index));
          targetSource.value(nextItemHandle);
        }

        if (value[index] !== undefined) {
          handle();
        } else {
          give([], guest);
        }
      })
    );

    return this;
  }
}
