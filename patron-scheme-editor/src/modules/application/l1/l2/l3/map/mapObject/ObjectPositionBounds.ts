import { ObjectPositionType } from '@/modules/application/l1/l2/l3/l4/types/object/ObjectPositionType';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { debug } from 'debug';
import { FactoryType, GuestAwareObjectType, GuestObjectType } from 'patron-oop';

const localDebug = debug('ObjectPositionBounds');

/**
 * Позиция объекта ограниченная границами лейера
 */
export class ObjectPositionBounds implements ObjectPositionType {
  public constructor(
    private stageSize: GuestAwareObjectType<SizeDocument>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) { }

  public position<R extends GuestObjectType<PointDocument>>(
    object: MapObjectDocument,
    point: PointDocument,
    guest: R,
  ): R {
    this.stageSize.value(
      this.factories.guestInTheMiddle.create(guest, (size: SizeDocument) => {
        let { x, y } = point;
        if (x < 30) {
          x = 30;
        }
        if (y < 30) {
          y = 30;
        }
        const maxX = size.width - object.width;
        if (x > maxX) {
          x = maxX;
        }
        const maxY = size.height - object.height;
        if (y > maxY) {
          y = maxY;
        }

        localDebug('position', x, y);

        guest.give({ x, y });
      }),
    );
    return guest;
  }
}
