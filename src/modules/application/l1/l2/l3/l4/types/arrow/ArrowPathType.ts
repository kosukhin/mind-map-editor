import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

export type ArrowPointDocument = {
  shapeGeometry: SizeDocument,
  shapePosition: PointDocument,
  lookToGeometry: SizeDocument,
  lookToPosition: PointDocument,
}

export interface ArrowPathType {
  breakPoints(
    fromPoint: ArrowPointDocument,
    toPoint: ArrowPointDocument,
    pointsGuest: GuestType<number[]>
  ): this;

  clear(): void;
}
