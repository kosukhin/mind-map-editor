import { FactoryType } from '@/modules/system/guest/FactoryType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { debug } from 'debug';

const localDebug = debug('Keyboard');

export class Keyboard {
  private pressedPool: PoolType;

  public constructor(
    factories: {
      pool: FactoryType<PoolType>,
    },
  ) {
    localDebug('keyboard created');
    this.pressedPool = factories.pool.create(this);
    window.addEventListener('keyup', (e) => {
      localDebug('keyboard pressed', e.key);
      this.pressedPool.receive(e.key);
    });
  }

  public pressed(guest: GuestType<string>) {
    localDebug('keyboard receive pressed subscriber');
    this.pressedPool.add(guest);
    return this;
  }
}
