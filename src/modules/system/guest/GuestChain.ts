import { Guest } from '@/modules/system/guest/Guest';
import { Cache } from '@/modules/system/guest/Cache';
import { Visitant } from '@/modules/system/guest/Visitant';
import { PatronPoolWithGuests } from '@/modules/system/guest/PatronPoolWithGuests';

export class GuestChain<T> {
  private theChain: Cache<Record<string, any>>

  private keysKnown = new Set();

  private keysFilled = new Set();

  private filledChainPool = new PatronPoolWithGuests(this);

  public constructor() {
    this.theChain = new Cache<Record<string, any>>(this);
  }

  public result(guest: Guest<T>) {
    if (this.isChainFilled()) {
      this.filledChainPool.add(guest);
      this.theChain.receiving(new Visitant((chain) => {
        this.filledChainPool.receive(chain);
      }));
    } else {
      this.filledChainPool.add(guest);
    }
    return this;
  }

  public receiveKey<R>(key: string): Guest<R> {
    this.keysKnown.add(key);
    return new Visitant((value) => {
      console.log('new receive chain', key, value);
      // Обернул в очередь чтобы можно было синхронно наполнить очередь известных ключей
      queueMicrotask(() => {
        this.theChain.cache(new Visitant((chain) => {
          this.keysFilled.add(key);
          const lastChain = {
            ...chain,
            [key]: value,
          };
          this.theChain.receive(lastChain as any);
          if (this.isChainFilled()) {
            this.filledChainPool.receive(lastChain);
          }
        }), {});
      });
    });
  }

  private isChainFilled() {
    return this.keysFilled.size > 0 && this.keysFilled.size === this.keysKnown.size;
  }
}
