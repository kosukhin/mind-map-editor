import { BrowserCanvasType } from '@/modules/integration/browser/canvas/BrowserCanvasType';
import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';
import { StageMoveRestrictionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';

const localDebug = debug('StageMoveRestriction');

export class StageMoveRestriction implements StageMoveRestrictionType {
  public constructor(
    private canvasDep: BrowserCanvasType,
    private stageSize: GuestAwareType<SizeDocument>,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  public position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType {
    this.canvasDep.canvas(
      this.factories.guest.create((canvas: HTMLElement) => {
        this.stageSize.value(
          this.factories.guest.create((stageSize: SizeDocument) => {
            localDebug('income position', pos);
            const maxRight = stageSize.width - canvas.clientWidth;
            const maxBottom = stageSize.height - canvas.clientHeight;
            const right = pos.x * -1;
            const bottom = pos.y * -1;
            if (maxBottom < 0 || maxRight < 0) {
              return { x: 0, y: 0 };
            }
            localDebug('boundings', maxBottom, maxRight, bottom, right);

            guest.give({
              x: pos.x > 0 ? 0 : right > maxRight ? maxRight * -1 : pos.x,

              y: pos.y > 0 ? 0 : bottom > maxBottom ? maxBottom * -1 : pos.y,
            });
          }),
        );
      }),
    );

    return guest;
  }
}
