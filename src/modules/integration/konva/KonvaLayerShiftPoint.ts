import { StagePositionType } from '@/modules/application/l1/l2/l3/l4/types/stage/StagePositionType';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';

/**
 * Точка сдвига стейджа, подходит для
 * рассчетов позиций внутри объектов внутри стейджа
 */
export class KonvaLayerShiftPoint implements StagePositionType {
  public constructor(
    private konvaLayer: KonvaLayer,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>
    },
  ) {}

  public position(guest: GuestObjectType<PointDocument>): GuestObjectType {
    this.konvaLayer.position(
      this.factories.guestInTheMiddle.create(guest, (position: PointDocument) => {
        guest.give({
          x: position.x * -1,
          y: position.y * -1,
        });
      }),
    );
    return guest;
  }
}
