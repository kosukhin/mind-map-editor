import { ObjectPositionType } from '@/modules/application/l1/l2/l3/l4/types/object/ObjectPositionType';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

const gridSize = 15;

/**
 * Правило привязки позиции объекта к сетке
 */
export class ObjectPositionGridStick implements ObjectPositionType {
  public constructor(
    private baseRestriction: ObjectPositionType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) {}

  public position<R extends GuestObjectType<PointDocument>>(
    object: MapObjectDocument,
    point: PointDocument,
    guest: R,
  ): R {
    this.baseRestriction.position(
      object,
      point,
      this.factories.guestInTheMiddle.create(guest, (thePoint: PointDocument) => {
        guest.give({
          x: Math.round(thePoint.x / gridSize) * gridSize,
          y: Math.round(thePoint.y / gridSize) * gridSize,
        });
      }),
    );
    return guest;
  }
}
