import { FactoryType, PoolType, GuestObjectType } from 'patron-oop';
import { debug } from 'debug';
import { useMagicKeys } from '@vueuse/core';

const localDebug = debug('Keyboard');

export class Keyboard {
  private pressedPool: PoolType;

  private combinationsPool: PoolType;

  public constructor(
    factories: {
      pool: FactoryType<PoolType>,
    },
  ) {
    localDebug('keyboard created');
    this.pressedPool = factories.pool.create(this);
    this.combinationsPool = factories.pool.create(this);
    window.addEventListener('keyup', (e) => {
      localDebug('keyboard pressed', e.key);
      this.pressedPool.give(e.key);
    });
    useMagicKeys({
      passive: false,
      onEventFired: (e) => {
        localDebug('magic combination happens 11', e.ctrlKey, e.key);
        this.combinationsPool.give(e);
      },
    });
  }

  public pressed(guest: GuestObjectType<string>) {
    localDebug('keyboard receive pressed subscriber');
    this.pressedPool.add(guest);
    return this;
  }

  public event(guest: GuestObjectType<KeyboardEvent>) {
    localDebug('keyboard receive combination subscriber');
    this.combinationsPool.add(guest);
    return this;
  }
}
