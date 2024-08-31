import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPoolWithGuests } from '@/modules/system/guest/PatronPoolWithGuests';
import { ChainType } from '@/modules/system/guest/ChainType';
import { GuestType } from './GuestType';

export class Chain<T> implements ChainType<T> {
  private theChain: Cache<Record<string, any>>

  private keysKnown = new Set();

  private keysFilled = new Set();

  private filledChainPool = new PatronPoolWithGuests(this);

  public constructor() {
    this.theChain = new Cache<Record<string, any>>(this);
  }

  public result(guest: GuestType<T>) {
    if (this.isChainFilled()) {
      this.filledChainPool.add(guest);
      this.theChain.receiving(new Guest((chain) => {
        this.filledChainPool.receive(chain);
      }));
    } else {
      this.filledChainPool.add(guest);
    }
    return this;
  }

  public receiveKey<R>(key: string): GuestType<R> {
    this.keysKnown.add(key);
    return new Guest((value) => {
      console.log('new receive chain', key, value);
      // Обернул в очередь чтобы можно было синхронно наполнить очередь известных ключей
      queueMicrotask(() => {
        this.theChain.cache(new Guest((chain) => {
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
