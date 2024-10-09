import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { debug } from 'debug';

const localDebug = debug('Cursor');

export class Cursor implements GuestAwareType<PointDocument> {
  private cursorPool: PoolType<PointDocument>;

  public constructor(
    factories: {
      pool: FactoryType<GuestType>
    },
  ) {
    this.cursorPool = factories.pool.create(this);
    window.addEventListener('mousemove', (e) => {
      const cursorPoint = {
        x: e.offsetX,
        y: e.offsetY,
      };
      localDebug('move cursor fired', cursorPoint);
      this.cursorPool.receive(cursorPoint);
    });
  }

  public receiving(guest: GuestType<PointDocument>) {
    this.cursorPool.add(guest);
    return this;
  }
}
