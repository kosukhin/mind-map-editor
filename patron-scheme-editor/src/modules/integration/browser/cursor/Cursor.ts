import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { debug } from 'debug';
import { FactoryType, GuestAwareType, GuestObjectType, PoolType } from 'patron-oop';

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
      pool: FactoryType<PoolType>;
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
    },
  ) {
    this.cursorPool = factories.pool.create(this);
    const stagePosition = {
      x: 0,
      y: 0,
    };

    window?.addEventListener('mousemove', (e) => {
      const cursorPoint = {
        x: e.offsetX + -stagePosition.x,
        y: e.offsetY + -stagePosition.y,
      };
      localDebug('move cursor fired', cursorPoint);
      this.cursorPool.give(cursorPoint);
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

  public value(guest: GuestObjectType<PointDocument>) {
    this.cursorPool.add(guest);
    return this;
  }
}
