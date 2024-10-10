import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { debug } from 'debug';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';

const localDebug = debug('Cursor');

/**
 * Позиция курсора внутри стейджа, будто курсор это
 * часть стеджа. Для упрощения расчетов
 */
export class Cursor implements GuestAwareType<PointDocument> {
  private cursorPool: PoolType<PointDocument>;

  public constructor(
    konvaLayer: LayerBase,
    factories: {
      pool: FactoryType<PoolType>,
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
    },
  ) {
    this.cursorPool = factories.pool.create(this);
    const stagePosition = {
      x: 0,
      y: 0,
    };

    window.addEventListener('mousemove', (e) => {
      const cursorPoint = {
        x: e.offsetX + -stagePosition.x,
        y: e.offsetY + -stagePosition.y,
      };
      localDebug('move cursor fired', cursorPoint);
      this.cursorPool.receive(cursorPoint);
    });

    konvaLayer.position(
      factories.patron.create(
        factories.guest.create((latestStagePosition: PointDocument) => {
          stagePosition.x = latestStagePosition.x;
          stagePosition.y = latestStagePosition.y;
        }),
      ),
    );
  }

  public receiving(guest: GuestType<PointDocument>) {
    this.cursorPool.add(guest);
    return this;
  }
}
