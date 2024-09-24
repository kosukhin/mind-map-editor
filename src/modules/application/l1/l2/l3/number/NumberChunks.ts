import { GuestType } from '@/modules/system/guest/GuestType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class NumberChunks {
  public constructor(
    private chunksCount: number,
    private baseNumber: GuestAwareType<number>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {}

  public chunks<R extends GuestType<number[]>>(guest: R) {
    this.baseNumber.receiving(
      this.factories.guestInTheMiddle.create(guest, (value: number) => {
        const incrementor = Math.round(value / this.chunksCount);
        const result: number[] = [];
        for (let i = 1; i <= this.chunksCount; i += 1) {
          result.push(i * incrementor);
        }
        guest.receive(result);
      }),
    );
    return guest;
  }
}
