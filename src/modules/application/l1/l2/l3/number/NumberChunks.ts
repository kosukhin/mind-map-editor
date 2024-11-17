import { GuestObjectType, GuestAwareType, FactoryType } from 'patron-oop';

export class NumberChunks {
  public constructor(
    private chunksCount: number,
    private baseNumber: GuestAwareType<number>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>,
    },
  ) {}

  public chunks<R extends GuestObjectType<number[]>>(guest: R) {
    this.baseNumber.value(
      this.factories.guestInTheMiddle.create(guest, (value: number) => {
        const incrementor = Math.round(value / this.chunksCount);
        const result: number[] = [];
        for (let i = 1; i <= this.chunksCount; i += 1) {
          result.push(i * incrementor);
        }
        guest.give(result);
      }),
    );
    return guest;
  }
}
