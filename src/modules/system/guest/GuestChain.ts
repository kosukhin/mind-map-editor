import { Guest } from '@/modules/system/guest/Guest';
import { Value } from '@/modules/system/guest/Value';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';
import { PatronPoolWithGuests } from '@/modules/system/guest/PatronPoolWithGuests';

export class GuestChain<T> {
  private theChain: Value<Record<string, any>>

  private keysKnown: string[] = [];

  private keysFilled: string[] = [];

  private filledChainPool = new PatronPoolWithGuests(this);

  public constructor() {
    this.theChain = new Value<Record<string, any>>({}, this);
  }

  public result(guest: Guest<T>) {
    if (this.isChainFilled()) {
      this.filledChainPool.add(guest);
      this.theChain.receiving(new GuestDynamic((chain) => {
        this.filledChainPool.receive(chain);
      }));
    } else {
      this.filledChainPool.add(guest);
    }
    return this;
  }

  public receiveKey(key: string): Guest<T> {
    this.keysKnown.push(key);
    return new GuestDynamic((value) => {
      // Обернул в очередь чтобы можно было синхронно наполнить очередь известных ключей
      queueMicrotask(() => {
        this.theChain.receiving(new GuestDynamic((chain) => {
          this.keysFilled.push(key);
          const lastChain = {
            ...chain,
            [key]: value,
          };
          this.theChain.receive(lastChain as any);
          if (this.isChainFilled()) {
            this.filledChainPool.receive(lastChain);
          }
        }));
      });
    });
  }

  private isChainFilled() {
    return this.keysFilled.length > 0 && this.keysFilled.length === this.keysKnown.length;
  }
}
