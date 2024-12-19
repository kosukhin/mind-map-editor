import { FactoryType, give, GuestAwareType, GuestCast, GuestChain, GuestType, SourceEmpty } from "patron-oop";

export class GuestAwareSequence<T, TG> implements GuestAwareType<TG[]> {
  public constructor(
    private baseSource: GuestAwareType<T[]>,
    private targetSourceFactory: FactoryType<GuestAwareType<TG>>
  ) { }

  public value(guest: GuestType<TG[]>) {
    const chain = new GuestChain<TG[]>();
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
            chain.resultArray(guest);
          }
        }

        function handle() {
          sequenceSource.give(value[index]);
          targetSource.value(chain.receiveKey('' + index));
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
