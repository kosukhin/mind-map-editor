import { MapObjectDocument } from "@/modules/application/l1/l2/l3/map/documents/MapStructures";
import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export type ArrowTypeType = 'twoBreaks' | 'threeBreaks';

export interface ArrowDepsDocument {
  fromObject: MapObjectDocument,
  toObject: MapObjectDocument,
  pointsCount: number
}

export interface ArrowDepsDocumentWithType extends ArrowDepsDocument {
  type: ArrowTypeType,
}

export class ArrowType implements GuestAwareType<ArrowDepsDocumentWithType> {
  public constructor(
    private arrowDepsSource: GuestAwareType<ArrowDepsDocument>,
    private centerGap = 10
  ) { }

  public value(guest: GuestType<ArrowDepsDocumentWithType>) {
    this.arrowDepsSource.value(
      new GuestCast(<GuestType>guest, ({ fromObject, toObject, pointsCount }) => {
        const shapeGeometry = {
          width: fromObject.width,
          height: fromObject.height,
        };
        const shapePosition = {
          x: fromObject.position[0],
          y: fromObject.position[1],
        };
        const lookToGeometry = {
          width: toObject.width,
          height: toObject.height,
        };
        const lookToPosition = {
          x: toObject.position[0],
          y: toObject.position[1],
        };

        const lookToMiddle = {
          x: +lookToPosition.x + Math.round(lookToGeometry.width / 2),
          y: +lookToPosition.y + Math.round(lookToGeometry.height / 2),
        };
        const shapeMiddle = {
          x: +shapePosition.x + Math.round(shapeGeometry.width / 2),
          y: +shapePosition.y + Math.round(shapeGeometry.height / 2),
        };

        const isXFar = Math.abs(lookToMiddle.x - shapeMiddle.x) - (lookToGeometry.width + this.centerGap);
        const isYFar = Math.abs(lookToMiddle.y - shapeMiddle.y) - (lookToGeometry.height + this.centerGap);

        give({
          fromObject,
          toObject,
          pointsCount,
          type: (isXFar < 0 || isYFar < 0) ? 'threeBreaks' : 'twoBreaks'
        }, guest)
      })
    )
    return this;
  }
}
